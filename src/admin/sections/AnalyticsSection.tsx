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

  useEffect(() => {
    adminApi.analytics
      .get()
      .then(setData)
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load analytics"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <p className="text-sm text-foreground/50">Loading…</p>;

  return (
    <div>
      <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Overview</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <StatCard label="Total revenue" value={`₹${data.revenue.toLocaleString("en-IN")}`} />
        <StatCard label="Orders" value={String(data.orderCount)} />
        <StatCard label="Customers" value={String(data.customerCount)} />
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background p-4 sm:p-5">
      <p className="text-[11px] uppercase leading-tight tracking-wide text-foreground/50">{label}</p>
      <p className="mt-1 break-words font-serif text-xl text-olive-600 sm:text-2xl">{value}</p>
    </div>
  );
}
