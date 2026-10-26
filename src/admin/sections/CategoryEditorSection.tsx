import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminApi, AdminApiError, type AdminCategory, type AdminProduct } from "../adminApi";

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
  const [order, setOrder] = useState<number[]>([]);
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

  const orderedProducts = useMemo(() => {
    const ranks = new Map(order.map((id, index) => [id, index]));
    return [...inCategory].sort((a, b) => (ranks.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (ranks.get(b.id) ?? Number.MAX_SAFE_INTEGER));
  }, [inCategory, order]);

  const countFor = (name: string) => {
    const want = name.trim().toLowerCase();
    return (products || []).filter((p) => (p.category || "").trim().toLowerCase() === want).length;
  };

  useEffect(() => {
    setOrder(inCategory.map((p) => p.id));
  }, [selected, products]); // eslint-disable-line react-hooks/exhaustive-deps

  const moveProduct = (id: number, direction: -1 | 1) => {
    setOrder((current) => {
      const categoryIds = inCategory.map((p) => p.id);
      const categoryIdSet = new Set(categoryIds);
      const hasCurrentCategoryOrder = current.length === categoryIds.length && current.every((productId) => categoryIdSet.has(productId));
      const next = hasCurrentCategoryOrder ? [...current] : categoryIds;
      const index = next.indexOf(id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const orphaned = useMemo(() => {
    if (!products || !categories) return [];
    const known = new Set(categories.map((c) => c.name.trim().toLowerCase()));
    return products.filter((p) => p.category && !known.has(p.category.trim().toLowerCase()));
  }, [products, categories]);

  const save = async () => {
    if (!inCategory.length) return;
    setSaving(true);
    try {
      await adminApi.products.reorder(orderedProducts.map((p, i) => ({ id: p.id, sortOrder: i + 1 })));
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
          {orderedProducts.map((p, index) => (
            <div key={p.id} className="flex items-center gap-3 p-2.5">
              <div className="flex shrink-0 gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  aria-label={`Move ${p.name} up`}
                  title="Move up"
                  disabled={saving || index === 0}
                  onClick={() => moveProduct(p.id, -1)}
                >
                  <ArrowUp />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  aria-label={`Move ${p.name} down`}
                  title="Move down"
                  disabled={saving || index === orderedProducts.length - 1}
                  onClick={() => moveProduct(p.id, 1)}
                >
                  <ArrowDown />
                </Button>
              </div>
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
