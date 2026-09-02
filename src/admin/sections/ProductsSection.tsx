import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { adminApi, AdminApiError, mediaUrl, IMAGE_CAPS, type AdminCategory, type AdminProduct, type ImportProductInput } from "../adminApi";

type FormState = {
  name: string;
  category: string;
  price: string;
  mrp: string;
  rating: string;
  stock: string;
  description: string;
  images: string[];
  videos: string[];
  colors: string[];
  isBestseller: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
  isSpotlight: boolean;
  active: boolean;
};

const emptyForm: FormState = {
  name: "",
  category: "",
  price: "",
  mrp: "",
  rating: "4.5",
  stock: "100",
  description: "",
  images: [],
  videos: [],
  colors: [],
  isBestseller: false,
  isNewArrival: false,
  isFeatured: false,
  isSpotlight: false,
  active: true,
};

function productToForm(p: AdminProduct): FormState {
  return {
    name: p.name,
    category: p.category,
    price: String(p.price),
    mrp: String(p.mrp),
    rating: String(p.rating),
    stock: String(p.stock),
    description: p.description,
    images: p.images,
    videos: p.videos,
    colors: p.colors || [],
    isBestseller: p.isBestseller,
    isNewArrival: p.isNewArrival,
    isFeatured: p.isFeatured,
    isSpotlight: p.isSpotlight,
    active: p.active,
  };
}

export default function ProductsSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminProduct | "new" | null>(null);
  const [importing, setImporting] = useState(false);
  const [migrating, setMigrating] = useState<{ done: number; total: number } | null>(null);
  const [hotlinked, setHotlinked] = useState(0);
  const [hidden, setHidden] = useState(0);
  const [deduping, setDeduping] = useState<{ done: number; total: number } | null>(null);
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [showingAll, setShowingAll] = useState(false);

  useEffect(() => {
    if (!products) return;
    setHotlinked(products.filter((p) => p.images.some((u) => u.includes("beautyofbeadsbykhushi.com"))).length);
    setHidden(products.filter((p) => !p.active).length);
  }, [products]);

  // Products that exist twice under the same name, from an import that ran a
  // second time. Both copies show in their category, in search and on the
  // homepage, so a category of 36 pieces reads as 47.
  //
  // The one to keep is the one that was there first — the lower id. The later
  // copy is the accident, and it is the later copy that carries the odd
  // category spelling ("Hair Pins" against the real "HAIR PINS"), which is how
  // a few of them ended up in no category at all.
  const duplicates = useMemo(() => {
    if (!products) return [];
    const byName = new Map<string, AdminProduct[]>();
    for (const p of products) {
      const key = p.name.trim().toLowerCase();
      const list = byName.get(key);
      if (list) list.push(p);
      else byName.set(key, [p]);
    }
    const extras: { keep: AdminProduct; remove: AdminProduct }[] = [];
    for (const list of byName.values()) {
      if (list.length < 2) continue;
      const sorted = [...list].sort((a, b) => a.id - b.id);
      const keep = sorted[0];
      for (const remove of sorted.slice(1)) extras.push({ keep, remove });
    }
    return extras;
  }, [products]);

  // Deleting is not undoable from here, so it goes one at a time with the count
  // reported from what actually succeeded rather than what was attempted.
  const removeDuplicates = async () => {
    if (duplicates.length === 0) return;
    if (
      !confirm(
        `Delete ${duplicates.length} duplicate product(s)?\n\n` +
          `Each one is a second copy of a product that stays. The original is kept in every case. ` +
          `This cannot be undone from here.`
      )
    )
      return;

    setDeduping({ done: 0, total: duplicates.length });
    let deleted = 0;
    const failures: string[] = [];
    try {
      for (let i = 0; i < duplicates.length; i++) {
        setDeduping({ done: i, total: duplicates.length });
        try {
          await adminApi.products.remove(duplicates[i].remove.id, true);
          deleted += 1;
        } catch (e) {
          failures.push(`${duplicates[i].remove.name}: ${e instanceof AdminApiError ? e.message : "failed"}`);
        }
      }
      onSuccess(
        deleted === 0
          ? "Nothing was deleted."
          : `${deleted} duplicate(s) removed. Every original was kept.`
      );
      if (failures.length) onError(`${failures.length} couldn't be deleted: ${failures.slice(0, 3).join("; ")}`);
      load();
    } finally {
      setDeduping(null);
    }
  };

  // A hidden product is invisible to the storefront, so a catalogue that is
  // mostly hidden looks like one that is mostly missing.
  const showAll = async () => {
    if (!confirm(`Make ${hidden} hidden product(s) visible on the storefront?`)) return;
    setShowingAll(true);
    try {
      const r = await adminApi.products.showAll();
      onSuccess(r.shown === 0 ? "Nothing was hidden." : `${r.shown} product(s) are now visible on the storefront.`);
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update the products");
    } finally {
      setShowingAll(false);
    }
  };

  // The old host takes ~6s per image and drops most of them under load, so a
  // catalogue that points at it renders mostly empty. The worker copies them
  // into our own bucket a batch at a time; this keeps calling until it reports
  // nothing left. Counts come from the server response throughout, so the
  // progress and the banner can never disagree.
  const migrateImages = async () => {
    if (!confirm("Copy all product images from your old site into this site's own storage? Existing images are left alone, and this can take a few minutes.")) return;
    setMigrating({ done: 0, total: 0 });
    const failures: string[] = [];
    let guard = 0;
    try {
      for (;;) {
        const r = await adminApi.products.migrateImages();
        // `total` counts what still needed copying when the batch began, so
        // done = total - remaining is progress within this run.
        setMigrating({ done: Math.max(0, r.total - r.remaining), total: r.total });
        if (r.failures?.length) failures.push(...r.failures);
        if (r.remaining === 0 || r.migrated === 0) break;
        if (++guard > 200) break; // never spin forever on a stuck batch
      }
      onSuccess("Product images now load from this site instead of the old one.");
      // Reported once at the end rather than after every batch. These are
      // images the old site no longer has (HTTP 404); those products keep
      // their original URL and simply need a new photo uploaded.
      if (failures.length) {
        onError(`${failures.length} image(s) couldn't be copied — they're missing from the old site. Those products need a new photo.`);
      }
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't migrate the images");
    } finally {
      setMigrating(null);
    }
  };

  // One-time catalogue migration. The real products scraped from the old
  // WooCommerce site ship as a hardcoded array in the storefront bundle, which
  // is why they render on the site while the database stays empty and nothing
  // in the admin — Website Editor sections, search, analytics — can see them.
  // This pushes them into the database once. The data file is ~170KB, so it is
  // pulled in only when the button is actually used.
  const importCatalogue = async () => {
    if (!confirm("Import the products from your old site into this catalogue? Products that already exist are skipped, so this is safe to run more than once.")) return;
    setImporting(true);
    try {
      const { SCRAPED_PRODUCTS } = await import("@/data/scrapedProducts");
      const payload = (SCRAPED_PRODUCTS as ImportProductInput[]).map((p) => ({
        name: p.name,
        category: p.category,
        price: p.price,
        mrp: p.mrp,
        rating: p.rating,
        description: p.description,
        images: p.images,
        colors: p.colors,
        bg: p.bg,
        slug: p.slug,
      }));
      const r = await adminApi.products.importCatalogue(payload);
      onSuccess(`Imported ${r.imported} product${r.imported === 1 ? "" : "s"}${r.skipped ? `, skipped ${r.skipped} already present` : ""}. Catalogue now has ${r.total}.`);
      if (r.failed) onError(`${r.failed} product${r.failed === 1 ? "" : "s"} couldn't be imported.`);
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't import the catalogue");
    } finally {
      setImporting(false);
    }
  };

  const load = () => {
    adminApi.products
      .list()
      .then((r) => setProducts(r.products))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load products"));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = products?.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const remove = async (p: AdminProduct) => {
    if (!confirm(`Hide "${p.name}" from the storefront? (You can restore it any time — this doesn't delete it permanently.)`)) return;
    try {
      await adminApi.products.remove(p.id);
      onSuccess("Product hidden from storefront");
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't remove product");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Products</h1>
        <div className="flex w-full gap-2 sm:w-auto">
          <input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 rounded-sm border border-border bg-background px-3 py-2 text-sm sm:flex-none"
          />
          <Button onClick={() => setEditing("new")} className="bg-olive-600 hover:bg-black">
            + Add product
          </Button>
        </div>
      </div>

      {hidden > 0 && (
        <div className="mt-5 rounded-md border border-clay-300 bg-clay-50/60 p-4 sm:p-5">
          <p className="font-serif text-base text-clay-600">{hidden} product(s) are hidden from the storefront</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">
            Hidden products don't appear anywhere on the site — not in their category, not in search, not in the homepage
            sections. Everything else about them is kept.
          </p>
          <Button onClick={showAll} disabled={showingAll} className="mt-3 bg-olive-600 hover:bg-black">
            {showingAll ? "Updating…" : "Make them all visible"}
          </Button>
        </div>
      )}

      {duplicates.length > 0 && (
        <div className="mt-5 rounded-md border border-clay-300 bg-clay-50/60 p-4 sm:p-5">
          <p className="font-serif text-base text-clay-600">
            {duplicates.length} product(s) are in the catalogue twice
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">
            An import appears to have run twice. Both copies show up in their category, in search and on the homepage —
            which is why a category of 36 pieces reads as 47. Removing the second copy of each leaves every original
            untouched.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button onClick={removeDuplicates} disabled={!!deduping} className="bg-olive-600 hover:bg-black">
              {deduping ? `Removing ${deduping.done + 1} of ${deduping.total}…` : `Remove ${duplicates.length} duplicate(s)`}
            </Button>
            <button
              type="button"
              onClick={() => setShowDuplicates((v) => !v)}
              className="text-xs font-semibold uppercase tracking-wide text-olive-600 underline underline-offset-2"
            >
              {showDuplicates ? "Hide the list" : "Show me which ones"}
            </button>
          </div>

          {showDuplicates && (
            <div className="mt-4 max-h-72 overflow-y-auto rounded-sm border border-border bg-card">
              {duplicates.map(({ keep, remove }) => (
                <div
                  key={remove.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/60 px-3 py-2 text-xs last:border-b-0"
                >
                  <span className="font-medium text-foreground">{remove.name}</span>
                  <span className="text-foreground/55">
                    keeping #{keep.id} ({keep.category || "no category"}) · deleting #{remove.id} (
                    {remove.category || "no category"})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {hotlinked > 0 && (
        <div className="mt-5 rounded-md border border-olive-300 bg-olive-50/60 p-4 sm:p-5">
          <p className="font-serif text-base text-olive-600">{hotlinked} product images still load from your old site</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">
            That host takes several seconds per image and drops most of them, which is why product grids show blank tiles.
            Copying them here fixes that and means the storefront no longer depends on the old site at all.
          </p>
          <Button onClick={migrateImages} disabled={!!migrating} className="mt-3 bg-olive-600 hover:bg-black">
            {migrating
              ? migrating.total
                ? `Copying ${migrating.done} of ${migrating.total}…`
                : "Starting…"
              : "Copy images to this site"}
          </Button>
        </div>
      )}

      {products && products.length === 0 && (
        <div className="mt-5 rounded-md border border-olive-300 bg-olive-50/60 p-4 sm:p-5">
          <p className="font-serif text-base text-olive-600">Your catalogue is empty</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">
            The storefront is currently showing built-in sample products. Import the real products from your old site to
            manage them here — and to make them selectable in the Website Editor.
          </p>
          <Button onClick={importCatalogue} disabled={importing} className="mt-3 bg-olive-600 hover:bg-black">
            {importing ? "Importing…" : "Import products from old site"}
          </Button>
        </div>
      )}

      {/* Mobile: card list */}
      <div className="mt-5 flex flex-col gap-2 md:hidden">
        {filtered?.map((p) => (
          <div key={p.id} className="flex gap-3 rounded-md border border-border bg-background p-3">
            <div
              className="h-14 w-14 shrink-0 rounded-sm bg-cover bg-center"
              style={p.images[0] ? { backgroundImage: `url(${mediaUrl(p.images[0])})` } : { background: p.bg || "#E4E6D9" }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 truncate text-sm font-medium">{p.name}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${
                    p.active ? "bg-olive-100 text-olive-600" : "bg-foreground/10 text-foreground/50"
                  }`}
                >
                  {p.active ? "Live" : "Hidden"}
                </span>
              </div>
              <p className="truncate text-xs text-foreground/50">{p.category}</p>
              <p className="mt-1 text-xs">
                ₹{p.price} <span className="text-foreground/40 line-through">₹{p.mrp}</span>
                <span className="ml-2 text-foreground/50">Stock {p.stock}</span>
              </p>
              <div className="mt-2 flex gap-3">
                <button type="button" onClick={() => setEditing(p)} className="text-xs font-medium text-olive-600 hover:underline">
                  Edit
                </button>
                <button type="button" onClick={() => remove(p)} className="text-xs font-medium text-clay-500 hover:underline">
                  {p.active ? "Hide" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered && filtered.length === 0 && (
          <p className="rounded-md border border-border bg-background p-6 text-center text-sm text-foreground/50">No products found.</p>
        )}
      </div>

      <div className="mt-5 hidden overflow-x-auto rounded-md border border-border bg-background md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {filtered?.map((p) => (
              <tr key={p.id} className="border-b border-border/60 last:border-none hover:bg-olive-50/50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 flex-shrink-0 rounded-sm bg-cover bg-center"
                      style={p.images[0] ? { backgroundImage: `url(${mediaUrl(p.images[0])})` } : { background: p.bg || "#E4E6D9" }}
                    />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-foreground/50">
                        {p.isBestseller ? "Bestseller " : ""}
                        {p.isNewArrival ? "New Arrival " : ""}
                        {p.isFeatured ? "Featured " : ""}
                        {p.isSpotlight ? "Spotlight" : ""}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">
                  ₹{p.price} <span className="text-xs text-foreground/40 line-through">₹{p.mrp}</span>
                </td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.active ? "bg-olive-100 text-olive-600" : "bg-foreground/10 text-foreground/50"}`}>
                    {p.active ? "Live" : "Hidden"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditing(p)} className="text-xs font-medium text-olive-600 hover:underline">
                      Edit
                    </button>
                    <button type="button" onClick={() => remove(p)} className="text-xs font-medium text-clay-500 hover:underline">
                      {p.active ? "Hide" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-foreground/50">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing != null && (
        <ProductFormModal
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}

function ProductFormModal({
  product,
  onClose,
  onSaved,
  onError,
  onSuccess,
}: {
  product: AdminProduct | null;
  onClose: () => void;
  onSaved: () => void;
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [form, setForm] = useState<FormState>(product ? productToForm(product) : emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [hasColors, setHasColors] = useState((product?.colors.length ?? 0) > 0);
  const [newColor, setNewColor] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    adminApi.categories
      .list()
      .then((r) => setCategories(r.categories))
      .catch(() => setCategories([])); // fall back to free-text entry below if this fails
  }, []);

  const uploadFile = async (file: File, kind: "images" | "videos") => {
    setUploading(true);
    try {
      // Videos pass through compressImage untouched; product stills only ever
      // render at card or gallery size, so they don't need banner resolution.
      const { url } = await adminApi.products.upload(file, kind === "images" ? IMAGE_CAPS.product : undefined);
      setForm((f) => ({ ...f, [kind]: [...f[kind], url] }));
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.price || !form.mrp) {
      onError("Name, category, price and MRP are required.");
      return;
    }
    setSaving(true);
    // materialsCare/shippingReturns are intentionally omitted — that copy is
    // now managed once for the whole site in Website Editor, not per-product.
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      mrp: Number(form.mrp),
      rating: Number(form.rating) || 4.5,
      stock: Number(form.stock) || 0,
      description: form.description,
      images: form.images,
      videos: form.videos,
      colors: form.colors,
      isBestseller: form.isBestseller,
      isNewArrival: form.isNewArrival,
      isFeatured: form.isFeatured,
      isSpotlight: form.isSpotlight,
      active: form.active,
    };
    try {
      if (product) {
        await adminApi.products.update(product.id, payload);
        onSuccess("Product updated");
      } else {
        await adminApi.products.create(payload);
        onSuccess("Product added");
      }
      onSaved();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-6 sm:p-4 sm:py-8" onClick={onClose}>
      <form onSubmit={save} className="w-full max-w-2xl rounded-md bg-background p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-olive-600">{product ? "Edit product" : "Add product"}</h2>
          <button type="button" onClick={onClose} className="text-sm text-foreground/50 hover:text-foreground">
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </Field>
          <Field label="Category">
            {categories && categories.length > 0 ? (
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="h-9 w-full rounded-sm border border-border bg-background px-2 text-sm"
              >
                <option value="" disabled>
                  Select a category…
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="No categories yet — add one in Website Editor"
                required
              />
            )}
          </Field>
          <Field label="Price ₹">
            <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          </Field>
          <Field label="MRP ₹">
            <Input type="number" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} required />
          </Field>
          <Field label="Rating (1-5)">
            <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
          </Field>
          <Field label="Stock">
            <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </Field>
        </div>

        <div className="mt-3 space-y-3">
          <Field label="Description">
            <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <p className="text-xs text-foreground/50">
            Materials & care and shipping & returns info is now managed once for the whole site — see Website Editor.
          </p>
        </div>

        <div className="mt-4">
          <Label className="text-xs">Images</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.images.map((url, i) => (
              <div key={url} className="relative h-16 w-16 overflow-hidden rounded-sm border border-border">
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))}
                  className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center bg-black/60 text-[10px] text-white"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              disabled={uploading}
              onClick={() => imageInputRef.current?.click()}
              className="flex h-16 w-16 items-center justify-center rounded-sm border border-dashed border-border text-xs text-foreground/50 hover:bg-olive-50"
            >
              {uploading ? "…" : "+ Add"}
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file, "images");
                e.target.value = "";
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <Label className="text-xs">Videos</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.videos.map((url, i) => (
              <div key={url} className="relative flex h-16 w-24 items-center justify-center overflow-hidden rounded-sm border border-border bg-black/5 text-xs">
                🎬 video {i + 1}
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, videos: f.videos.filter((_, idx) => idx !== i) }))}
                  className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center bg-black/60 text-[10px] text-white"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              disabled={uploading}
              onClick={() => videoInputRef.current?.click()}
              className="flex h-16 w-24 items-center justify-center rounded-sm border border-dashed border-border text-xs text-foreground/50 hover:bg-olive-50"
            >
              {uploading ? "…" : "+ Add"}
            </button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file, "videos");
                e.target.value = "";
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <ToggleField
            label="This product has color options"
            checked={hasColors}
            onChange={(v) => {
              setHasColors(v);
              if (!v) setForm((f) => ({ ...f, colors: [] }));
            }}
          />
          {hasColors && (
            <div className="mt-2 flex flex-wrap gap-2">
              {form.colors.map((color, i) => (
                <div key={i} className="flex items-center gap-1 rounded-sm border border-border bg-olive-50 py-1 pl-2 pr-1 text-xs">
                  {color}
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, colors: f.colors.filter((_, idx) => idx !== i) }))}
                    className="flex h-4 w-4 items-center justify-center text-foreground/50 hover:text-clay-500"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-1">
                <input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newColor.trim()) {
                      e.preventDefault();
                      setForm((f) => ({ ...f, colors: [...f.colors, newColor.trim()] }));
                      setNewColor("");
                    }
                  }}
                  placeholder="e.g. Rose Gold"
                  className="h-8 w-32 rounded-sm border border-border bg-background px-2 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newColor.trim()) return;
                    setForm((f) => ({ ...f, colors: [...f.colors, newColor.trim()] }));
                    setNewColor("");
                  }}
                  className="rounded-sm border border-dashed border-border px-2 py-1.5 text-xs text-foreground/50 hover:bg-olive-50"
                >
                  + Add color
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-6">
          <ToggleField label="Bestseller" checked={form.isBestseller} onChange={(v) => setForm({ ...form, isBestseller: v })} />
          <ToggleField label="New Arrival" checked={form.isNewArrival} onChange={(v) => setForm({ ...form, isNewArrival: v })} />
          <ToggleField label="Featured" checked={form.isFeatured} onChange={(v) => setForm({ ...form, isFeatured: v })} />
          <ToggleField label="Spotlight" checked={form.isSpotlight} onChange={(v) => setForm({ ...form, isSpotlight: v })} />
          <ToggleField label="Live on storefront" checked={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="bg-olive-600 hover:bg-black">
            {saving ? "Saving…" : product ? "Save changes" : "Add product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch checked={checked} onCheckedChange={onChange} />
      {label}
    </label>
  );
}
