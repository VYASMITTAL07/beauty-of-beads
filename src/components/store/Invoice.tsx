import logoMarkPng from "@/assets/logo-mark-2x.png";

// A GST tax invoice, rendered as a page and handed to the browser's own
// print-to-PDF. No PDF library: jsPDF and friends are 200-400KB of bundle for
// something the overwhelming majority of visitors never open, and the browser
// already writes better PDFs than either.
//
// The figures come from the order as it was charged, never recomputed from
// today's rates — the invoice has to say what the customer actually paid.

export const SUPPLIER = {
  trade: "Beauty Of Beads",
  legal: "KHUSHI ACHAR DEMBRA",
  gstin: "27GTNPD1584G1ZF",
  address: ["HIG 1/6, Dayanand Nagar, Galli No-6", "Near Dayanand Park, Jaripatka", "Nagpur, Maharashtra 440014"],
  phone: "9545856028",
};

const HSN_CODE = "7117";

export type InvoiceOrder = {
  order_number: string;
  invoice_number?: string | null;
  created_at: string;
  paid_at?: string | null;
  payment_method?: string | null;
  payment_id?: string | null;
  payment_status?: string | null;
  total_amount: number;
  discount_amount?: number | null;
  promo_code?: string | null;
  shipping_amount?: number | null;
  shipping_method?: string | null;
  tax_amount?: number | null;
  tax_type?: string | null;
  tax_rate?: number | null;
  shipping_name: string;
  shipping_phone?: string | null;
  shipping_line1: string;
  shipping_line2?: string | null;
  shipping_city: string;
  shipping_state?: string | null;
  shipping_postal_code?: string | null;
  shipping_country: string;
  customer_email?: string | null;
};

export type InvoiceItem = { product_name: string; product_price: number; quantity: number };

function inr(n: number) {
  return `₹${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function dmy(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value.includes("T") ? value : value.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function Invoice({ order, items, onClose }: { order: InvoiceOrder; items: InvoiceItem[]; onClose: () => void }) {
  const subtotal = items.reduce((sum, i) => sum + i.product_price * i.quantity, 0);
  const discount = Number(order.discount_amount || 0);
  const shipping = Number(order.shipping_amount || 0);
  const tax = Number(order.tax_amount || 0);
  const taxable = Math.max(0, subtotal - discount) + shipping;
  const half = Math.round((tax / 2) * 100) / 100;
  const intraState = order.tax_type === "cgst_sgst";
  const ratePct = ((Number(order.tax_rate) || 0) * 100).toFixed(0);

  const shipLabel =
    order.shipping_method === "urgent"
      ? "Urgent delivery (2-3 days)"
      : order.shipping_method === "international"
        ? "International delivery"
        : "Normal delivery (about 7 days)";

  return (
    <div className="invoice-root fixed inset-0 z-[120] overflow-y-auto bg-foreground/40 p-0 font-sans sm:p-6">
      <div className="print-hide sticky top-0 z-10 flex items-center justify-end gap-2 bg-background/95 px-4 py-3 sm:mx-auto sm:max-w-[820px] sm:rounded-t-sm">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-sm border border-olive-600 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-olive-600 transition-colors hover:bg-olive-600 hover:text-olive-50"
        >
          Save as PDF
        </button>
        <button type="button" onClick={onClose} className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground">
          Close
        </button>
      </div>

      <div className="invoice-sheet mx-auto w-full max-w-[820px] bg-white p-7 text-[#1c1c1c] sm:p-10">
        <div className="flex items-start justify-between gap-6 border-b border-black/10 pb-6">
          <div>
            <h1 className="font-serif text-2xl uppercase tracking-[0.2em]">Tax Invoice</h1>
            <img src={logoMarkPng} alt="" width={110} height={118} className="mt-3 h-20 w-auto" />
          </div>
          <div className="text-right text-[11px] leading-relaxed">
            <p className="text-[13px] font-semibold">{SUPPLIER.trade}</p>
            <p className="text-black/60">{SUPPLIER.legal}</p>
            {SUPPLIER.address.map((line) => (
              <p key={line} className="text-black/60">
                {line}
              </p>
            ))}
            <p className="text-black/60">{SUPPLIER.phone}</p>
            <p className="mt-1 font-semibold">GSTIN: {SUPPLIER.gstin}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-6">
          <div className="text-[11px] leading-relaxed">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-black/45">Bill to</p>
            <p className="text-[13px] font-semibold">{order.shipping_name}</p>
            <p className="text-black/70">{order.shipping_line1}</p>
            {order.shipping_line2 && <p className="text-black/70">{order.shipping_line2}</p>}
            <p className="text-black/70">
              {order.shipping_city}
              {order.shipping_postal_code ? ` ${order.shipping_postal_code}` : ""}
            </p>
            <p className="text-black/70">
              {[order.shipping_state, order.shipping_country].filter(Boolean).join(", ")}
            </p>
            {order.shipping_phone && <p className="text-black/70">{order.shipping_phone}</p>}
            {order.customer_email && <p className="text-black/70">{order.customer_email}</p>}
          </div>

          <dl className="min-w-[220px] text-[11px] leading-relaxed">
            <div className="flex justify-between gap-6">
              <dt className="text-black/50">Invoice no.</dt>
              <dd className="font-semibold">{order.invoice_number || "—"}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-black/50">Invoice date</dt>
              <dd>{dmy(order.paid_at || order.created_at)}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-black/50">Order no.</dt>
              <dd>{order.order_number}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-black/50">Order date</dt>
              <dd>{dmy(order.created_at)}</dd>
            </div>
            {order.payment_method && (
              <div className="flex justify-between gap-6">
                <dt className="text-black/50">Payment</dt>
                <dd className="uppercase">{order.payment_method}</dd>
              </div>
            )}
            {/* Place of supply decides whether the tax splits into CGST + SGST
                or stands as IGST, so it has to be printed. */}
            <div className="flex justify-between gap-6">
              <dt className="text-black/50">Place of supply</dt>
              <dd>{order.shipping_state || order.shipping_country}</dd>
            </div>
          </dl>
        </div>

        <table className="mt-7 w-full border-collapse text-[11px]">
          <thead>
            <tr className="border-y border-black/15 text-left text-[10px] uppercase tracking-wider text-black/50">
              <th className="py-2 pr-2 font-semibold">#</th>
              <th className="py-2 pr-2 font-semibold">Product</th>
              <th className="py-2 pr-2 font-semibold">HSN</th>
              <th className="py-2 pr-2 text-right font-semibold">Qty</th>
              <th className="py-2 pr-2 text-right font-semibold">Unit price</th>
              <th className="py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={`${it.product_name}-${i}`} className="border-b border-black/8">
                <td className="py-2.5 pr-2 align-top text-black/50">{i + 1}</td>
                <td className="py-2.5 pr-2 align-top">{it.product_name}</td>
                <td className="py-2.5 pr-2 align-top text-black/60">{HSN_CODE}</td>
                <td className="py-2.5 pr-2 text-right align-top">{it.quantity}</td>
                <td className="py-2.5 pr-2 text-right align-top">{inr(it.product_price)}</td>
                <td className="py-2.5 text-right align-top">{inr(it.product_price * it.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 flex justify-end">
          <dl className="w-full max-w-[300px] text-[11px]">
            <div className="flex justify-between py-1">
              <dt className="text-black/60">Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between py-1">
                <dt className="text-black/60">Discount{order.promo_code ? ` (${order.promo_code})` : ""}</dt>
                <dd>-{inr(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between py-1">
              <dt className="text-black/60">{shipLabel}</dt>
              <dd>{inr(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-black/10 py-1.5">
              <dt className="text-black/60">Taxable value</dt>
              <dd>{inr(taxable)}</dd>
            </div>
            {tax > 0 && intraState && (
              <>
                <div className="flex justify-between py-1">
                  <dt className="text-black/60">CGST @ {(Number(order.tax_rate) * 50).toFixed(1)}%</dt>
                  <dd>{inr(half)}</dd>
                </div>
                <div className="flex justify-between py-1">
                  <dt className="text-black/60">SGST @ {(Number(order.tax_rate) * 50).toFixed(1)}%</dt>
                  <dd>{inr(half)}</dd>
                </div>
              </>
            )}
            {tax > 0 && !intraState && (
              <div className="flex justify-between py-1">
                <dt className="text-black/60">IGST @ {ratePct}%</dt>
                <dd>{inr(tax)}</dd>
              </div>
            )}
            {tax === 0 && (
              <div className="flex justify-between py-1">
                <dt className="text-black/60">GST</dt>
                <dd className="text-black/50">Nil — export</dd>
              </div>
            )}
            <div className="mt-1 flex items-baseline justify-between border-t-2 border-black/70 pt-2 text-[13px] font-semibold">
              <dt>Total</dt>
              <dd>{inr(order.total_amount)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 border-t border-black/10 pt-4 text-[10px] leading-relaxed text-black/45">
          <p>This is a computer generated invoice and does not require a signature.</p>
          {order.payment_id && <p className="mt-0.5">Payment reference: {order.payment_id}</p>}
          {order.payment_status !== "paid" && (
            <p className="mt-0.5 font-semibold text-black/70">Payment not yet received for this order.</p>
          )}
        </div>
      </div>
    </div>
  );
}
