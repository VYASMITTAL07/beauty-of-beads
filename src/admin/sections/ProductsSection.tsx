import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { adminApi, AdminApiError, type AdminProduct } from "../adminApi";

type FormState = {
  name: string;
  category: string;
  price: string;
  mrp: string;
  rating: string;
  stock: string;
  description: string;
  materialsCare: string;
  shippingReturns: string;
  images: string[];
  videos: string[];
  isBestseller: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
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
  materialsCare: "",
  shippingReturns: "",
  images: [],
  videos: [],
  isBestseller: false,
  isNewArrival: false,
  isFeatured: false,
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
    materialsCare: p.materialsCare,
    shippingReturns: p.shippingReturns,
    images: p.images,
    videos: p.videos,
    isBestseller: p.isBestseller,
    isNewArrival: p.isNewArrival,
    isFeatured: p.isFeatured,
    active: p.active,
  };
}

export default function ProductsSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminProduct | "new" | null>(null);

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
        <h1 className="font-serif text-2xl text-olive-600">Products</h1>
        <div className="flex gap-2">
          <input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
          />
          <Button onClick={() => setEditing("new")} className="bg-olive-600 hover:bg-black">
            + Add product
          </Button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-md border border-border bg-background">
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
                      style={p.images[0] ? { backgroundImage: `url(${p.images[0]})` } : { background: p.bg || "#E4E6D9" }}
                    />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-foreground/50">
                        {p.isBestseller ? "Bestseller " : ""}
                        {p.isNewArrival ? "New Arrival " : ""}
                        {p.isFeatured ? "Featured" : ""}
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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File, kind: "images" | "videos") => {
    setUploading(true);
    try {
      const { url } = await adminApi.products.upload(file);
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
    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      mrp: Number(form.mrp),
      rating: Number(form.rating) || 4.5,
      stock: Number(form.stock) || 0,
      description: form.description,
      materialsCare: form.materialsCare,
      shippingReturns: form.shippingReturns,
      images: form.images,
      videos: form.videos,
      isBestseller: form.isBestseller,
      isNewArrival: form.isNewArrival,
      isFeatured: form.isFeatured,
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-8" onClick={onClose}>
      <form onSubmit={save} className="w-full max-w-2xl rounded-md bg-background p-6" onClick={(e) => e.stopPropagation()}>
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
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
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
          <Field label="Materials & care">
            <Textarea rows={2} value={form.materialsCare} onChange={(e) => setForm({ ...form, materialsCare: e.target.value })} />
          </Field>
          <Field label="Shipping & returns">
            <Textarea rows={2} value={form.shippingReturns} onChange={(e) => setForm({ ...form, shippingReturns: e.target.value })} />
          </Field>
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

        <div className="mt-5 flex flex-wrap gap-6">
          <ToggleField label="Bestseller" checked={form.isBestseller} onChange={(v) => setForm({ ...form, isBestseller: v })} />
          <ToggleField label="New Arrival" checked={form.isNewArrival} onChange={(v) => setForm({ ...form, isNewArrival: v })} />
          <ToggleField label="Featured" checked={form.isFeatured} onChange={(v) => setForm({ ...form, isFeatured: v })} />
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
