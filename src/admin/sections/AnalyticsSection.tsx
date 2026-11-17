import { useEffect, useState } from "react";
import { adminApi, AdminApiError, type AdminAnalytics } from "../adminApi";

const STATUS_LABEL: Record<string, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  awaiting_payment: "Awaiting payment",
};

export default function AnalyticsSection({ onError }: { onError: (m: string) => void }) {
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(() => currentIndiaMonth());
  const [loadingMonth, setLoadingMonth] = useState(true);

  useEffect(() => {
    let current = true;
    setLoadingMonth(true);
    adminApi.analytics
      .get(selectedMonth)
      .then((result) => {
        if (current) setData(result);
      })
      .catch((e) => {
        if (current) onError(e instanceof AdminApiError ? e.message : "Couldn't load analytics");
      })
      .finally(() => {
        if (current) setLoadingMonth(false);
      });
    return () => {
      current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  if (!data) return <p className="text-sm text-foreground/50">Loading…</p>;

  return (
    <div>
      <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard
          label="Revenue received"
          value={`₹${data.revenue.toLocaleString("en-IN")}`}
          hint="Fully paid amounts + Partial COD advances; cancelled orders excluded."
        />
        <StatCard
          label="Orders (fully paid / placed)"
          value={
            data.paidOrderCount === undefined
              ? String(data.orderCount)
              : `${data.paidOrderCount} / ${data.orderCount}`
          }
          hint="Placed count excludes cancelled and awaiting-payment orders."
        />
        <div className="rounded-md border border-border bg-background p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[11px] uppercase leading-tight tracking-wide text-foreground/50">Monthly revenue</p>
            <select
              aria-label="Choose revenue month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="max-w-[58%] rounded-sm border border-border bg-background px-2 py-1 text-xs text-foreground"
            >
              {[...new Set([selectedMonth, ...data.availableRevenueMonths])]
                .sort((a, b) => b.localeCompare(a))
                .map((month) => (
                  <option key={month} value={month}>{formatRevenueMonth(month)}</option>
                ))}
            </select>
          </div>
          <p className="mt-1 break-words font-serif text-xl text-olive-600 sm:text-2xl">
            {loadingMonth ? "Loading…" : `₹${data.monthlyRevenue.toLocaleString("en-IN")}`}
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-foreground/50">Payments received in the selected India calendar month.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-background p-5">
          <h2 className="font-serif text-lg text-olive-600">Orders by status</h2>
          <div className="mt-3 space-y-2">
            {data.byStatus.length === 0 && <p className="text-sm text-foreground/50">No orders yet.</p>}
            {data.byStatus.map((s) => (
              <div key={s.status} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-foreground/70">{STATUS_LABEL[s.status] || s.status}</span>
                <span className="shrink-0 font-medium">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border bg-background p-5">
          <h2 className="font-serif text-lg text-olive-600">Top products</h2>
          <div className="mt-3 space-y-2">
            {data.topProducts.length === 0 && <p className="text-sm text-foreground/50">No sales yet.</p>}
            {data.topProducts.map((p) => (
              <div key={p.productName} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-foreground/70">{p.productName}</span>
                <span className="flex-shrink-0 font-medium">{p.unitsSold} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-border bg-background p-4 sm:mt-8 sm:p-5">
        <h2 className="font-serif text-lg text-olive-600">Recent orders</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
                <th className="pb-2 pr-4">Order</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Amount</th>
                <th className="pb-2">Placed</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((o) => (
                <tr key={o.order_number} className="border-b border-border/60 last:border-none">
                  <td className="py-2 pr-4 font-mono text-xs">{o.order_number}</td>
                  <td className="py-2 pr-4">{STATUS_LABEL[o.status] || o.status}</td>
                  <td className="py-2 pr-4">₹{o.total_amount.toLocaleString("en-IN")}</td>
                  <td className="py-2 text-foreground/50">{new Date(o.created_at).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
              {data.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-foreground/50">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function currentIndiaMonth() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  return `${parts.find((part) => part.type === "year")?.value}-${parts.find((part) => part.type === "month")?.value}`;
}

function formatRevenueMonth(month: string) {
  return new Date(`${month}-01T00:00:00+05:30`).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4 sm:p-5">
      <p className="text-[11px] uppercase leading-tight tracking-wide text-foreground/50">{label}</p>
      <p className="mt-1 break-words font-serif text-xl text-olive-600 sm:text-2xl">{value}</p>
      {hint && <p className="mt-1 text-[10px] leading-relaxed text-foreground/50">{hint}</p>}
    </div>
  );
}
