import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, AdminApiError, type AdminCategory, type AdminProduct } from "../adminApi";

type SiteContentForm = {
  hero_image: string;
  materials_care: string;
  shipping_returns: string;
  homepage_banner_image: string;
  store_visit_banner_image: string;
};

const emptySiteContent: SiteContentForm = {
  hero_image: "",
  materials_care: "",
  shipping_returns: "",
  homepage_banner_image: "",
  store_visit_banner_image: "",
};

function looksLikeUrl(v: string) {
  return /^https?:\/\//i.test(v.trim());
}

export default function WebsiteEditorSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-600">Website Editor</h1>
      <p className="mt-1 text-sm text-foreground/60">Manage the copy, images and categories shown across the storefront.</p>

      <SiteContentCard onError={onError} onSuccess={onSuccess} />
      <CategoriesCard onError={onError} onSuccess={onSuccess} />
      <HomepageSectionsCard onError={onError} onSuccess={onSuccess} />
    </div>
  );
}

function SiteContentCard({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [form, setForm] = useState<SiteContentForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<keyof SiteContentForm | null>(null);

  useEffect(() => {
    adminApi.siteSettings
      .get()
      .then((r) =>
        setForm({
          hero_image: r.settings.hero_image || "",
          materials_care: r.settings.materials_care || "",
          shipping_returns: r.settings.shipping_returns || "",
          homepage_banner_image: r.settings.homepage_banner_image || "",
          store_visit_banner_image: r.settings.store_visit_banner_image || "",
        })
      )
      .catch((e) => {
        onError(e instanceof AdminApiError ? e.message : "Couldn't load site settings");
        setForm(emptySiteContent);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      await adminApi.siteSettings.update({ ...form });
      onSuccess("Site content updated");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save site content");
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (field: keyof SiteContentForm, file: File) => {
    setUploadingField(field);
    try {
      const { url } = await adminApi.products.upload(file);
      setForm((f) => (f ? { ...f, [field]: url } : f));
      onSuccess("Image uploaded — click Save changes to publish it");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Upload failed");
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="mt-5 rounded-md border border-border bg-background p-5">
      <h2 className="font-serif text-lg text-olive-600">Site content</h2>
      <p className="mt-1 text-xs text-foreground/50">
        Materials & care and shipping & returns text shown once here now applies to every product page.
      </p>

      {!form ? (
        <p className="mt-4 text-sm text-foreground/50">Loading…</p>
      ) : (
        <form onSubmit={save} className="mt-4 space-y-4">
          <ImageUploadField
            label="Hero image"
            help="Shown at the top of the homepage."
            value={form.hero_image}
            uploading={uploadingField === "hero_image"}
            onUpload={(file) => uploadImage("hero_image", file)}
            onClear={() => setForm({ ...form, hero_image: "" })}
          />

          <ImageUploadField
            label="Heritage banner image"
            help="Full-bleed banner shown right after Top Picks on the homepage."
            value={form.homepage_banner_image}
            uploading={uploadingField === "homepage_banner_image"}
            onUpload={(file) => uploadImage("homepage_banner_image", file)}
            onClear={() => setForm({ ...form, homepage_banner_image: "" })}
          />

          <ImageUploadField
            label="Store visit banner image"
            help='Full-bleed banner behind the "Visit Our Store" section.'
            value={form.store_visit_banner_image}
            uploading={uploadingField === "store_visit_banner_image"}
            onUpload={(file) => uploadImage("store_visit_banner_image", file)}
            onClear={() => setForm({ ...form, store_visit_banner_image: "" })}
          />

          <Field label="Materials & care (shown on every product)">
            <Textarea rows={3} value={form.materials_care} onChange={(e) => setForm({ ...form, materials_care: e.target.value })} />
          </Field>

          <Field label="Shipping & returns (shown on every product)">
            <Textarea rows={3} value={form.shipping_returns} onChange={(e) => setForm({ ...form, shipping_returns: e.target.value })} />
          </Field>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving} className="bg-olive-600 hover:bg-black">
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function ImageUploadField({
  label,
  help,
  value,
  uploading,
  onUpload,
  onClear,
}: {
  label: string;
  help?: string;
  value: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {help && <p className="text-[11px] text-foreground/50">{help}</p>}
      <div className="mt-1 flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </Button>
        {value && (
          <button type="button" onClick={onClear} className="text-xs font-medium text-clay-500 hover:underline">
            Remove
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = "";
          }}
        />
      </div>
      {looksLikeUrl(value) && <img src={value} alt="" className="mt-2 h-24 w-full rounded-sm border border-border object-cover" />}
    </div>
  );
}

function CategoriesCard({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminApi.categories
      .list()
      .then((r) => setCategories(r.categories))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load categories"));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onError("Category name is required.");
      return;
    }
    setSaving(true);
    try {
      await adminApi.categories.create({ name: name.trim(), imageUrl: imageUrl.trim() || undefined });
      onSuccess("Category added");
      setName("");
      setImageUrl("");
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't add category");
    } finally {
      setSaving(false);
    }
  };

  const updateField = async (c: AdminCategory, data: Partial<{ name: string; imageUrl: string; sortOrder: number }>) => {
    try {
      await adminApi.categories.update(c.id, data);
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update category");
    }
  };

  const remove = async (c: AdminCategory) => {
    if (!confirm(`Delete category "${c.name}"?`)) return;
    try {
      await adminApi.categories.remove(c.id);
      onSuccess("Category deleted");
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't delete category");
    }
  };

  return (
    <div className="mt-6 rounded-md border border-border bg-background p-5">
      <h2 className="font-serif text-lg text-olive-600">Categories</h2>
      <p className="mt-1 text-xs text-foreground/50">
        These are the same categories customers see in "Shop by category", and what you'll choose from when adding a product.
      </p>

      <div className="mt-4 space-y-2">
        {categories?.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center gap-3 rounded-sm border border-border/60 p-2">
            <div
              className="h-10 w-10 flex-shrink-0 rounded-sm bg-cover bg-center bg-olive-100"
              style={c.imageUrl ? { backgroundImage: `url(${c.imageUrl})` } : undefined}
            />
            <input
              defaultValue={c.name}
              onBlur={(e) => e.target.value.trim() && e.target.value !== c.name && updateField(c, { name: e.target.value.trim() })}
              className="min-w-[8rem] flex-1 rounded-sm border border-border bg-background px-2 py-1.5 text-sm"
            />
            <input
              defaultValue={c.imageUrl}
              onBlur={(e) => e.target.value.trim() !== c.imageUrl && updateField(c, { imageUrl: e.target.value.trim() })}
              placeholder="Image URL"
              className="min-w-[10rem] flex-[2] rounded-sm border border-border bg-background px-2 py-1.5 text-sm"
            />
            <input
              type="number"
              defaultValue={c.sortOrder}
              onBlur={(e) => Number(e.target.value) !== c.sortOrder && updateField(c, { sortOrder: Number(e.target.value) || 0 })}
              title="Sort order"
              className="w-16 flex-shrink-0 rounded-sm border border-border bg-background px-2 py-1.5 text-sm"
            />
            <button type="button" onClick={() => remove(c)} className="flex-shrink-0 text-xs font-medium text-clay-500 hover:underline">
              Delete
            </button>
          </div>
        ))}
        {categories && categories.length === 0 && <p className="text-sm text-foreground/50">No categories yet.</p>}
      </div>

      <form onSubmit={create} className="mt-4 flex flex-wrap items-end gap-3 border-t border-border pt-4">
        <div className="min-w-[10rem] flex-1 space-y-1">
          <Label className="text-xs">Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Necklaces" />
        </div>
        <div className="min-w-[10rem] flex-[2] space-y-1">
          <Label className="text-xs">Image URL</Label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
        </div>
        <Button type="submit" disabled={saving} className="bg-olive-600 hover:bg-black">
          + Add category
        </Button>
      </form>
    </div>
  );
}

type HomepageFlag = "isBestseller" | "isFeatured" | "isNewArrival" | "isSpotlight";

const HOMEPAGE_SECTIONS: { flag: HomepageFlag; title: string; help: string }[] = [
  { flag: "isBestseller", title: "Top Picks", help: "Products flagged as Bestseller — shown in the Top Picks row." },
  { flag: "isFeatured", title: "Shop by Trend", help: "Products flagged as Featured — shown in Shop by Trend." },
  { flag: "isNewArrival", title: "New Arrivals", help: "Products flagged as New Arrival." },
  { flag: "isSpotlight", title: "Spotlight", help: "Products flagged as Spotlight — shown in the Spotlight carousel." },
];

function HomepageSectionsCard({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [openSection, setOpenSection] = useState<HomepageFlag | null>("isBestseller");

  const load = () => {
    adminApi.products
      .list()
      .then((r) => setProducts(r.products))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load products"));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFlag = async (product: AdminProduct, flag: HomepageFlag, value: boolean) => {
    // Optimistic update so the checkbox responds immediately.
    setProducts((prev) => (prev ? prev.map((p) => (p.id === product.id ? { ...p, [flag]: value } : p)) : prev));
    try {
      await adminApi.products.update(product.id, { [flag]: value });
      onSuccess(`${product.name} ${value ? "added to" : "removed from"} ${HOMEPAGE_SECTIONS.find((s) => s.flag === flag)?.title}`);
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update product");
      // Roll back on failure.
      setProducts((prev) => (prev ? prev.map((p) => (p.id === product.id ? { ...p, [flag]: !value } : p)) : prev));
    }
  };

  return (
    <div className="mt-6 rounded-md border border-border bg-background p-5">
      <h2 className="font-serif text-lg text-olive-600">Homepage sections</h2>
      <p className="mt-1 text-xs text-foreground/50">
        The storefront homepage shows these sections, in this order: Hero → Shop by Category → Top Picks → Heritage banner → Shop by
        Trend → New Arrivals → Spotlight → Store visit banner → FAQs. Toggle which products appear in each product-based section below.
      </p>

      {!products ? (
        <p className="mt-4 text-sm text-foreground/50">Loading…</p>
      ) : (
        <div className="mt-4 space-y-2">
          {HOMEPAGE_SECTIONS.map((section) => {
            const included = products.filter((p) => p[section.flag]);
            const isOpen = openSection === section.flag;
            return (
              <div key={section.flag} className="rounded-sm border border-border/60">
                <button
                  type="button"
                  onClick={() => setOpenSection(isOpen ? null : section.flag)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left hover:bg-olive-50/50"
                >
                  <div>
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-foreground/50">{section.help}</p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <span className="rounded-full bg-olive-100 px-2 py-0.5 text-xs text-olive-600">{included.length} product{included.length === 1 ? "" : "s"}</span>
                    <span className="text-foreground/40">{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-border/60 p-3">
                    <ProductChecklist products={products} flag={section.flag} onToggle={toggleFlag} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ProductChecklist({
  products,
  flag,
  onToggle,
}: {
  products: AdminProduct[];
  flag: HomepageFlag;
  onToggle: (product: AdminProduct, flag: HomepageFlag, value: boolean) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => Number(b[flag]) - Number(a[flag]) || a.name.localeCompare(b.name)),
    [products, search, flag]
  );

  return (
    <div>
      <input
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2 w-full max-w-xs rounded-sm border border-border bg-background px-2 py-1.5 text-sm"
      />
      <div className="max-h-72 overflow-y-auto rounded-sm border border-border/60">
        {filtered.map((p) => (
          <label
            key={p.id}
            className="flex cursor-pointer items-center gap-3 border-b border-border/40 px-3 py-2 text-sm last:border-none hover:bg-olive-50/50"
          >
            <input type="checkbox" checked={p[flag]} onChange={(e) => onToggle(p, flag, e.target.checked)} className="h-4 w-4 accent-olive-600" />
            <div
              className="h-8 w-8 flex-shrink-0 rounded-sm bg-cover bg-center"
              style={p.images[0] ? { backgroundImage: `url(${p.images[0]})` } : { background: p.bg || "#E4E6D9" }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.name}</p>
              <p className="truncate text-xs text-foreground/50">{p.category}</p>
            </div>
            {!p.active && <span className="flex-shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] text-foreground/50">Hidden</span>}
          </label>
        ))}
        {filtered.length === 0 && <p className="p-3 text-center text-sm text-foreground/50">No products found.</p>}
      </div>
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
