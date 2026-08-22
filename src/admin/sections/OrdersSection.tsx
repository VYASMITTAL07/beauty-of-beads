import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminApi, AdminApiError, type AdminOrder, type AdminOrderDetail } from "../adminApi";

const STAGES = ["placed", "confirmed", "packed", "shipped", "out_for_delivery", "delivered"];
const STATUS_LABEL: Record<string, string> = {
  awaiting_payment: "Awaiting customer confirmation",
  placed: "Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

type View = "all" | "pending" | "completed";

export default function OrdersSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [view, setView] = useState<View>("all");
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const load = () => {
    adminApi.orders
      .list(statusFilter || undefined)
      .then((r) => setOrders(r.orders))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load orders"));
  };

  useEffect(load, [statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const visible = orders?.filter((o) => {
    if (view === "pending") return !["delivered", "cancelled"].includes(o.status);
    if (view === "completed") return o.status === "delivered";
    return true;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl text-olive-600">Orders</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-sm border border-border bg-background p-0.5 text-sm">
            {(["all", "pending", "completed"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded-sm px-3 py-1.5 capitalize transition-colors ${
                  view === v ? "bg-olive-100 font-medium text-olive-600" : "text-foreground/60 hover:bg-olive-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            {["awaiting_payment", ...STAGES, "cancelled"].map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-md border border-border bg-background">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Placed</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {visible?.map((o) => (
              <tr key={o.id} className="border-b border-border/60 last:border-none hover:bg-olive-50/50">
                <td className="p-3 font-mono text-xs">{o.order_number}</td>
                <td className="p-3">
                  <div>{o.customer_name}</div>
                  <div className="text-xs text-foreground/50">{o.customer_email}</div>
                </td>
                <td className="p-3">{STATUS_LABEL[o.status] || o.status}</td>
                <td className="p-3">₹{o.total_amount.toLocaleString("en-IN")}</td>
                <td className="p-3 text-foreground/50">{new Date(o.created_at).toLocaleDateString("en-IN")}</td>
                <td className="p-3">
                  <button type="button" onClick={() => setOpenOrderId(o.id)} className="text-xs font-medium text-olive-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {visible && visible.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-foreground/50">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openOrderId != null && (
        <OrderDetailModal
          orderId={openOrderId}
          onClose={() => setOpenOrderId(null)}
          onChanged={() => {
            load();
          }}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}

function OrderDetailModal({
  orderId,
  onClose,
  onChanged,
  onError,
  onSuccess,
}: {
  orderId: number;
  onClose: () => void;
  onChanged: () => void;
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [detail, setDetail] = useState<AdminOrderDetail | null>(null);
  const [updating, setUpdating] = useState(false);

  const load = () => {
    adminApi.orders
      .get(orderId)
      .then(setDetail)
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load order"));
  };

  useEffect(load, [orderId]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = async () => {
    if (!detail) return;
    const idx = STAGES.indexOf(detail.order.status);
    const next = STAGES[idx + 1];
    if (!next) return;
    setUpdating(true);
    try {
      await adminApi.orders.setStatus(orderId, next);
      onSuccess(`Order marked ${STATUS_LABEL[next]}${next === "delivered" ? " — delivery + review-request emails sent" : ""}`);
      load();
      onChanged();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update status");
    } finally {
      setUpdating(false);
    }
  };

  const cancel = async () => {
    setUpdating(true);
    try {
      await adminApi.orders.setStatus(orderId, "cancelled");
      onSuccess("Order cancelled");
      load();
      onChanged();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't cancel order");
    } finally {
      setUpdating(false);
    }
  };

  const resendDeliveryEmail = async () => {
    setUpdating(true);
    try {
      await adminApi.orders.resendDeliveryEmail(orderId);
      onSuccess("Emails resent");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't resend emails");
    } finally {
      setUpdating(false);
    }
  };

  const showInvoicePlaceholder = () => {
    alert("Invoice PDF download will be available once the payment gateway is set up.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-md bg-background p-6" onClick={(e) => e.stopPropagation()}>
        {!detail ? (
          <p className="text-sm text-foreground/50">Loading…</p>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm">{detail.order.order_number}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-olive-600">{STATUS_LABEL[detail.order.status] || detail.order.status}</p>
              </div>
              <button type="button" onClick={onClose} className="text-sm text-foreground/50 hover:text-foreground">
                Close
              </button>
            </div>

            <div className="mt-4 rounded-sm bg-olive-50 p-3 text-sm">
              <div className="flex items-center gap-2">
                <p className="font-medium">{detail.order.customer_name}</p>
                {detail.order.created_by_admin ? (
                  <span className="rounded-full bg-olive-600 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">Custom order</span>
                ) : null}
              </div>
              <p className="text-foreground/60">{detail.order.customer_email}</p>
              <p className="text-foreground/60">{detail.order.shipping_phone || "—"}</p>
              <p className="mt-2 text-foreground/70">
                {detail.order.shipping_line1}
                {detail.order.shipping_line2 ? `, ${detail.order.shipping_line2}` : ""}, {detail.order.shipping_city}
                {detail.order.shipping_state ? `, ${detail.order.shipping_state}` : ""} {detail.order.shipping_postal_code || ""},{" "}
                {detail.order.shipping_country}
              </p>
              {detail.order.custom_note && (
                <p className="mt-2 rounded-sm border border-olive-200 bg-background p-2 text-xs text-foreground/70">
                  <span className="font-medium">Note to customer: </span>
                  {detail.order.custom_note}
                </p>
              )}
            </div>

            <div className="mt-4 space-y-2">
              {detail.items.map((it) => (
                <div key={it.product_name} className="flex justify-between text-sm">
                  <span>
                    {it.product_name} × {it.quantity}
                  </span>
                  <span>₹{(it.product_price * it.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-medium">
              <span>Total</span>
              <div className="flex items-center gap-3">
                <span>₹{detail.order.total_amount.toLocaleString("en-IN")}</span>
                <button type="button" onClick={showInvoicePlaceholder} className="text-xs font-medium text-olive-600 hover:underline">
                  Invoice
                </button>
              </div>
            </div>
            {detail.order.promo_code && (
              <p className="mt-1 text-xs text-foreground/50">
                Promo {detail.order.promo_code} applied — ₹{detail.order.discount_amount.toLocaleString("en-IN")} off
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {STAGES.indexOf(detail.order.status) >= 0 && STAGES.indexOf(detail.order.status) < STAGES.length - 1 && (
                <Button size="sm" disabled={updating} onClick={advance} className="bg-olive-600 hover:bg-black">
                  Mark as {STATUS_LABEL[STAGES[STAGES.indexOf(detail.order.status) + 1]]}
                </Button>
              )}
              {["awaiting_payment", "placed", "confirmed", "packed"].includes(detail.order.status) && (
                <Button size="sm" variant="outline" disabled={updating} onClick={cancel}>
                  Cancel order
                </Button>
              )}
              {detail.order.status === "delivered" && (
                <Button size="sm" variant="outline" disabled={updating} onClick={resendDeliveryEmail}>
                  Resend delivery + review email
                </Button>
              )}
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">History</p>
              <div className="mt-2 space-y-1.5">
                {detail.history.map((h, i) => (
                  <div key={i} className="flex justify-between text-xs text-foreground/60">
                    <span>{STATUS_LABEL[h.status] || h.status}</span>
                    <span>{new Date(h.created_at).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
