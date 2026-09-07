import { useEffect, useMemo, useState } from "react";
import { adminApi, AdminApiError, type AdminProductStats } from "../adminApi";

// What is selling, what is trending this week, and what people put in a basket
// and then walked away from.
//
// That last one is not a guess: a cart row only survives while its order has
// NOT been paid for, because paying empties the basket. So a product sitting in
// a cart is exactly a product someone chose and did not buy.
//
// What is missing, and cannot be shown without new tracking, is how many people
// merely looked at a product. Nothing in this app records page views.

type SortKey = "orders" | "week" | "carts" | "wishlist" | "revenue";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "orders", label: "Most ordered" },
  { key: "week", label: "Trending this week" },
  { key: "carts", label: "Left in carts" },
  { key: "wishlist", label: "Most wishlisted" },
  { key: "revenue", label: "Most revenue" },
];

export default function BestProductsSection({ onError }: { onError: (m: string) => void }) {
  const [data, setData] = useState<AdminProductStats | null>(null);
  const [sort, setSort] = useState<SortKey>("orders");
  const [query, setQuery] = useState("");

  useEffect(() => {
    adminApi.analytics
      .products()
      .then(setData)
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load product stats"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const rows = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const filtered = q
      ? data.products.filter((p) => p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q))
      : data.products;
    const by: Record<SortKey, (p: AdminProductStats["products"][number]) => number> = {
      orders: (p) => p.orders,
      week: (p) => p.soldThisWeek,
      carts: (p) => p.inCarts,
      wishlist: (p) => p.inWishlists,
      revenue: (p) => p.revenue,
    };
    return [...filtered].sort((a, b) => by[sort](b) - by[sort](a) || b.unitsSold - a.unitsSold);
  }, [data, sort, query]);

  if (!data) return <p className="text-sm text-foreground/50">Loading…</p>;

  const trending = data.trending
    .map((n) => data.products.find((p) => p.name === n))
    .filter(Boolean) as AdminProductStats["products"];

  const abandoned = data.products.filter((p) => p.inCarts > 0 && p.orders === 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-lg text-olive-600">Trending this week</h2>
        <p className="mt-1 text-xs text-foreground/50">Most units sold in paid orders over the last seven days.</p>
        {trending.length === 0 ? (
          <p className="mt-3 text-sm text-foreground/50">Nothing has sold in the last seven days yet.</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-3">
            {trending.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 rounded-sm border border-border p-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-600 text-[11px] font-semibold text-olive-50">
                  {i + 1}
                </span>
                {p.image ? (
                  <img src={p.image} alt="" className="h-11 w-9 shrink-0 rounded-sm object-contain" />
                ) : null}
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-foreground/45">{p.soldThisWeek} sold this week</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {abandoned.length > 0 && (
        <div className="rounded-sm border border-dashed border-olive-400 bg-olive-50/50 p-4">
          <p className="text-sm font-semibold text-olive-700">
            {abandoned.length} product(s) sitting in carts that have never sold
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/60">
            Someone chose these and stopped before paying. Worth a look at the price, the photographs, or the delivery
            charge on them.
          </p>
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                  sort === s.key ? "bg-olive-600 text-olive-50" : "border border-border hover:bg-olive-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product or category"
            className="min-w-[12rem] flex-1 rounded-sm border border-border bg-card px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500/60"
          />
        </div>

        <div className="mt-3 overflow-x-auto rounded-sm border border-border">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-border bg-olive-50/50 text-xs uppercase tracking-wide text-foreground/55">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3 text-right">Orders</th>
                <th className="p-3 text-right">Units</th>
                <th className="p-3 text-right">This week</th>
                <th className="p-3 text-right">In carts</th>
                <th className="p-3 text-right">Wishlisted</th>
                <th className="p-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.name} className="border-b border-border/60 last:border-none hover:bg-olive-50/40">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      {p.image ? <img src={p.image} alt="" className="h-10 w-8 shrink-0 rounded-sm object-contain" /> : null}
                      <div className="min-w-0">
                        <div className="truncate">{p.name}</div>
                        <div className="text-xs text-foreground/45">
                          {p.category}
                          {!p.active && " · hidden"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right tabular-nums">{p.orders}</td>
                  <td className="p-3 text-right tabular-nums">{p.unitsSold}</td>
                  <td className="p-3 text-right tabular-nums">{p.soldThisWeek || "—"}</td>
                  <td className={`p-3 text-right tabular-nums ${p.inCarts > 0 ? "text-olive-700" : "text-foreground/35"}`}>
                    {p.inCarts || "—"}
                  </td>
                  <td className="p-3 text-right tabular-nums text-foreground/70">{p.inWishlists || "—"}</td>
                  <td className="p-3 text-right tabular-nums">₹{p.revenue.toLocaleString("en-IN")}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-4 text-sm text-foreground/50">
                    Nothing matches that search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-foreground/45">
          Orders and revenue count only orders Razorpay confirmed as paid. &ldquo;In carts&rdquo; is how many people
          have the piece in a basket right now and have not paid — paying empties the basket, so anything still there
          was chosen and not bought. How many people merely viewed a product is not recorded anywhere yet.
        </p>
      </div>
    </div>
  );
}
