import { useEffect, useState } from "react";
import { Check, ChevronLeft, Package, MapPin, CreditCard, FileText } from "lucide-react";
import { api, ApiError, type OrderDto, type OrderItemDto } from "@/lib/api";
import { Invoice } from "@/components/store/Invoice";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

// Where a paid order lands. Before this it dropped straight into the orders
// list, which shows a status line and nothing a customer would want to check
// the moment they have parted with money: what they bought, where it is going,
// and what they were charged for what.

function inr(n: number) {
  return `₹${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function OrderConfirmed({
  orderNumber,
  onClose,
  onTrack,
}: {
  orderNumber: string;
  onClose: () => void;
  onTrack: (orderNumber: string) => void;
}) {
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [items, setItems] = useState<OrderItemDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useBodyScrollLock(true);

  useEffect(() => {
    let cancelled = false;
    api.orders
      .get(orderNumber)
      .then((r) => {
        if (cancelled) return;
        setOrder(r.order);
        setItems(r.items);
      })
      .catch((e) => !cancelled && setError(e instanceof ApiError ? e.message : "Couldn't load your order."));
    return () => {
      cancelled = true;
    };
  }, [orderNumber]);

  const subtotal = items.reduce((sum, i) => sum + i.product_price * i.quantity, 0);
  const discount = Number(order?.discount_amount || 0);
  const shipping = Number(order?.shipping_amount || 0);
  const tax = Number(order?.tax_amount || 0);
  const intraState = order?.tax_type === "cgst_sgst";

  const shipLabel =
    order?.shipping_method === "urgent"
      ? "Urgent delivery (2-3 days)"
      : order?.shipping_method === "international"
        ? "International delivery"
        : "Normal delivery (about 7 days)";

  const cardClass = "rounded-sm border border-border bg-card p-5 md:p-6";
  const headingClass = "flex items-center gap-2 font-serif text-base uppercase tracking-wide text-olive-600";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-background font-sans [contain:paint]">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to shop"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="min-w-0 truncate font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">
          Order confirmed
        </h1>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive-600">
            <Check className="h-7 w-7 text-olive-50" />
          </span>
          <h2 className="mt-4 font-serif text-2xl text-foreground">Thank you{order?.shipping_name ? `, ${order.shipping_name.split(" ")[0]}` : ""}!</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/70">
            Your order is confirmed and we&rsquo;ve emailed you these details. Every piece is made by hand, so we&rsquo;ll
            keep you posted at each step.
          </p>
          <p className="mt-4 font-mono text-sm text-foreground">{orderNumber}</p>
          {order?.invoice_number && (
            <p className="mt-1 text-xs text-foreground/50">Invoice {order.invoice_number}</p>
          )}
        </div>

        {error && <p className="mt-6 text-center text-sm text-destructive">{error}</p>}

        {order && (
          <div className="mt-8 flex flex-col gap-5">
            <section className={cardClass}>
              <h3 className={headingClass}>
                <Package className="h-4 w-4" /> What you ordered
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {items.map((it, i) => (
                  <li key={`${it.product_name}-${i}`} className="flex items-start justify-between gap-3 text-sm">
                    <span className="min-w-0">
                      <span className="block leading-snug text-foreground/85">{it.product_name}</span>
                      <span className="text-xs text-foreground/50">Qty {it.quantity}</span>
                    </span>
                    <span className="shrink-0 font-serif">{inr(it.product_price * it.quantity)}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-foreground/65">Subtotal</dt>
                  <dd>{inr(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-olive-600">
                    <dt>Discount{order.promo_code ? ` (${order.promo_code})` : ""}</dt>
                    <dd>-{inr(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-foreground/65">{shipLabel}</dt>
                  <dd>{inr(shipping)}</dd>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-foreground/65">{intraState ? "CGST 1.5% + SGST 1.5%" : "IGST 3%"}</dt>
                    <dd>{inr(tax)}</dd>
                  </div>
                )}
                <div className="mt-1 flex items-baseline justify-between border-t border-border pt-3">
                  <dt className="font-semibold text-foreground">Total paid</dt>
                  <dd className="font-serif text-xl">{inr(order.total_amount)}</dd>
                </div>
              </dl>
            </section>

            <div className="grid gap-5 sm:grid-cols-2">
              <section className={cardClass}>
                <h3 className={headingClass}>
                  <MapPin className="h-4 w-4" /> Shipping to
                </h3>
                <address className="mt-3 text-sm not-italic leading-relaxed text-foreground/75">
                  <span className="block font-medium text-foreground">{order.shipping_name}</span>
                  {order.shipping_line1}
                  {order.shipping_line2 ? <>, {order.shipping_line2}</> : null}
                  <br />
                  {order.shipping_city}
                  {order.shipping_postal_code ? ` ${order.shipping_postal_code}` : ""}
                  <br />
                  {[order.shipping_state, order.shipping_country].filter(Boolean).join(", ")}
                  {order.shipping_phone && (
                    <>
                      <br />
                      {order.shipping_phone}
                    </>
                  )}
                </address>
              </section>

              <section className={cardClass}>
                <h3 className={headingClass}>
                  <CreditCard className="h-4 w-4" /> Payment
                </h3>
                <dl className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/75">
                  <div className="flex justify-between gap-3">
                    <dt className="text-foreground/55">Method</dt>
                    <dd className="uppercase">{order.payment_method || "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-foreground/55">Status</dt>
                    <dd>{order.payment_status === "paid" ? "Paid" : "Pending"}</dd>
                  </div>
                  {order.payment_id && (
                    <div className="flex justify-between gap-3">
                      <dt className="shrink-0 text-foreground/55">Reference</dt>
                      <dd className="min-w-0 truncate font-mono text-xs">{order.payment_id}</dd>
                    </div>
                  )}
                </dl>
              </section>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowInvoice(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-olive-600 bg-white py-3 text-xs font-semibold uppercase tracking-[0.14em] text-olive-600 transition-colors hover:bg-olive-600 hover:text-olive-50"
              >
                <FileText className="h-4 w-4" /> View invoice
              </button>
              <button
                type="button"
                onClick={() => onTrack(orderNumber)}
                className="flex-1 rounded-sm border border-border py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:border-olive-300"
              >
                Track this order
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-sm border border-border py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:border-olive-300"
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {showInvoice && order && <Invoice order={order} items={items} onClose={() => setShowInvoice(false)} />}
    </div>
  );
}
