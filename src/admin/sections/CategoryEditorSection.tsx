import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminApi, AdminApiError, type AdminCategory, type AdminProduct } from "../adminApi";

// The order products appear in inside a category, set by typing positions
// rather than nudging rows one step at a time — a category here holds up to
// sixty pieces, and moving the last one to the front with arrows is sixty
// clicks and sixty round trips.
//
// Categories are read live from the same table the storefront reads, so one
// created or deleted elsewhere in the admin shows up here without anything
// having to be kept in step by hand.

export default function CategoryEditorSection({
  onError,
  onSuccess,
}: {
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);

  const load = () => {
    Promise.all([adminApi.categories.list(), adminApi.products.list()])
      .then(([c, p]) => {
        setCategories(c.categories);
        setProducts(p.products);
        setSelected((s) => s ?? c.categories[0]?.name ?? null);
      })
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load categories"));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  // products.category is the category's name, so an empty list here usually
  // means a product was filed under a name no category carries any more.
  const inCategory = useMemo(() => {
    if (!products || !selected) return [];
    const want = selected.trim().toLowerCase();
    return products
      .filter((p) => (p.category || "").trim().toLowerCase() === want)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || b.id - a.id);
  }, [products, selected]);

  const countFor = (name: string) => {
    const want = name.trim().toLowerCase();
    return (products || []).filter((p) => (p.category || "").trim().toLowerCase() === want).length;
  };

  useEffect(() => {
    const next: Record<number, string> = {};
    inCategory.forEach((p, i) => {
      next[p.id] = String(i + 1);
    });
    setPositions(next);
  }, [selected, products]); // eslint-disable-line react-hooks/exhaustive-deps

  const orphaned = useMemo(() => {
    if (!products || !categories) return [];
    const known = new Set(categories.map((c) => c.name.trim().toLowerCase()));
    return products.filter((p) => p.category && !known.has(p.category.trim().toLowerCase()));
  }, [products, categories]);

  const save = async () => {
    if (!inCategory.length) return;
    // Whatever numbers were typed decide the running order; they are then
    // rewritten as 1..n so the next edit starts from something tidy and two
    // products can never share a position.
    const ranked = [...inCategory].sort((a, b) => {
      const pa = Number(positions[a.id]);
      const pb = Number(positions[b.id]);
      return (Number.isFinite(pa) ? pa : 1e9) - (Number.isFinite(pb) ? pb : 1e9);
    });
    setSaving(true);
    try {
      await adminApi.products.reorder(ranked.map((p, i) => ({ id: p.id, sortOrder: i + 1 })));
      onSuccess(`Order saved for ${selected}`);
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save the order");
    } finally {
      setSaving(false);
    }
  };

  if (!categories || !products) return <p className="text-sm text-foreground/50">Loading…</p>;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div>
        <h2 className="font-serif text-lg text-olive-600">Categories</h2>
        <p className="mt-1 text-xs text-foreground/50">{categories.length} live on the site</p>
        <div className="mt-3 flex flex-col gap-1">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.name)}
              className={`flex items-center justify-between gap-3 rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                selected === c.name ? "bg-olive-600 text-olive-50" : "hover:bg-olive-50"
              }`}
            >
              <span className="min-w-0 truncate">{c.name}</span>
              <span className={`shrink-0 text-xs ${selected === c.name ? "text-olive-50/70" : "text-foreground/40"}`}>
                {countFor(c.name)}
              </span>
            </button>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-foreground/50">No categories yet — add them in Website Editor.</p>
          )}
        </div>

        {orphaned.length > 0 && (
          <div className="mt-5 rounded-sm border border-dashed border-destructive/40 p-3">
            <p className="text-xs font-semibold text-destructive">{orphaned.length} product(s) with no category</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/55">
              Filed under a name no category carries any more, so they never appear under any collection. Fix each
              one&rsquo;s category in Products.
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg text-olive-600">{selected || "—"}</h2>
            <p className="mt-1 text-xs text-foreground/50">
              {inCategory.length} product(s) &middot; 1 shows first on the category page
            </p>
          </div>
          <Button onClick={save} disabled={saving || inCategory.length === 0}>
            {saving ? "Saving…" : "Save order"}
          </Button>
        </div>

        <div className="mt-4 divide-y divide-border rounded-sm border border-border">
          {inCategory.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-2.5">
              <input
                type="number"
                min={1}
                value={positions[p.id] ?? ""}
                onChange={(e) => setPositions((prev) => ({ ...prev, [p.id]: e.target.value }))}
                className="w-16 shrink-0 rounded-sm border border-border bg-card px-2 py-1.5 text-center text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-olive-500/60"
              />
              {p.images?.[0] ? (
                <img src={p.images[0]} alt="" className="h-12 w-10 shrink-0 rounded-sm object-contain" />
              ) : (
                <div className="h-12 w-10 shrink-0 rounded-sm bg-olive-50" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{p.name}</p>
                <p className="text-xs text-foreground/45">
                  ₹{p.price.toLocaleString("en-IN")}
                  {!p.active && " · hidden"}
                </p>
              </div>
            </div>
          ))}
          {inCategory.length === 0 && (
            <p className="p-4 text-sm text-foreground/50">Nothing filed under this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
