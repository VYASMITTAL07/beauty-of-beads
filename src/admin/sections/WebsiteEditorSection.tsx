import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, AdminApiError, type AdminCategory } from "../adminApi";

type SiteContentForm = {
  hero_image: string;
  materials_care: string;
  shipping_returns: string;
  homepage_banner_image: string;
};

const emptySiteContent: SiteContentForm = {
  hero_image: "",
  materials_care: "",
  shipping_returns: "",
  homepage_banner_image: "",
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
    </div>
  );
}

function SiteContentCard({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [form, setForm] = useState<SiteContentForm | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.siteSettings
      .get()
      .then((r) =>
        setForm({
          hero_image: r.settings.hero_image || "",
          materials_care: r.settings.materials_care || "",
          shipping_returns: r.settings.shipping_returns || "",
          homepage_banner_image: r.settings.homepage_banner_image || "",
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
          <Field label="Hero image URL">
            <Input value={form.hero_image} onChange={(e) => setForm({ ...form, hero_image: e.target.value })} placeholder="https://…" />
            {looksLikeUrl(form.hero_image) && (
              <img src={form.hero_image} alt="" className="mt-2 h-24 w-full rounded-sm border border-border object-cover" />
            )}
          </Field>

          <Field label="Homepage banner image URL">
            <Input
              value={form.homepage_banner_image}
              onChange={(e) => setForm({ ...form, homepage_banner_image: e.target.value })}
              placeholder="https://…"
            />
            {looksLikeUrl(form.homepage_banner_image) && (
              <img src={form.homepage_banner_image} alt="" className="mt-2 h-24 w-full rounded-sm border border-border object-cover" />
            )}
          </Field>

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
