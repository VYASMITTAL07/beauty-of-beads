import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, AdminApiError } from "../adminApi";

// A custom order built from an email address alone.
//
// Customers → Create custom order can only reach somebody who has already
// signed in, so quoting a bespoke piece meant first talking the customer
// through making an account — a lot to ask of someone who has just sent a
// photo on Instagram. Here the address is enough: the order is created and
// emailed, and the account catches up on its own when they sign in to pay.

type LineItem = { productName: string; productPrice: string; quantity: string };
const emptyItem: LineItem = { productName: "", productPrice: "", quantity: "1" };

type Sent = { orderNumber: string; email: string; total: number; delivered: boolean; reason?: string; isNew: boolean };

export default function CustomOrderSection({
  onError,
  onSuccess,
}: {
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState<LineItem[]>([{ ...emptyItem }]);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);

  const total = items.reduce((sum, it) => sum + (Number(it.productPrice) || 0) * (Number(it.quantity) || 0), 0);

  const updateItem = (i: number, patch: Partial<LineItem>) =>
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setEmail("");
    setName("");
    setItems([{ ...emptyItem }]);
    setNote("");
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = items
      .map((it) => ({
        productName: it.productName.trim(),
        productPrice: Number(it.productPrice),
        quantity: Number(it.quantity) || 1,
      }))
      .filter((it) => it.productName && it.productPrice > 0);
    if (cleaned.length === 0) {
      onError("Add at least one item with a name and a price.");
      return;
    }
    setSending(true);
    try {
      const r = await adminApi.customOrders.create({
        email: email.trim(),
        name: name.trim() || undefined,
        items: cleaned,
        note: note.trim() || undefined,
      });
      setSent({
        orderNumber: r.orderNumber,
        email: r.customer.email,
        total: r.totalAmount,
        delivered: r.email?.sent !== false,
        reason: r.email?.reason,
        isNew: r.customer.isNew,
      });
      // Said plainly rather than as a success either way: an order that was
      // created but whose email never left is worth knowing about immediately.
      if (r.email?.sent === false) onError(`Order ${r.orderNumber} created, but the email didn't send.`);
      else onSuccess(`Order ${r.orderNumber} sent to ${r.customer.email}`);
      reset();
    } catch (err) {
      onError(err instanceof AdminApiError ? err.message : "Couldn't create that custom order");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Custom order</h1>
      <p className="mt-1 text-sm leading-relaxed text-foreground/60">
        Price a bespoke piece and email it to anyone. They don&rsquo;t need an account — the link in the email takes
        them straight to checkout, where they sign in and pay.
      </p>

      {sent && (
        <div
          className={`mt-5 rounded-sm border p-4 ${
            sent.delivered ? "border-olive-400 bg-olive-50/60" : "border-destructive/50 bg-destructive/5"
          }`}
        >
          <p className="text-sm font-semibold text-foreground">
            {sent.delivered ? `Sent to ${sent.email}` : `Created, but the email didn't reach ${sent.email}`}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/60">
            Order <span className="font-mono">{sent.orderNumber}</span> &middot; ₹{sent.total.toLocaleString("en-IN")}
            {sent.isNew && " · first time this address has been used"}
            {!sent.delivered && sent.reason ? ` · ${sent.reason}` : ""}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground/55">
            It shows in Orders as <strong>Awaiting payment</strong> until they pay. Delivery and GST are added at
            checkout, once they&rsquo;ve given an address — so the total above is for the items alone.
          </p>
        </div>
      )}

      <form onSubmit={send} className="mt-5 rounded-sm border border-border p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">Customer email</Label>
            <Input
              className="mt-1"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <Label className="text-xs">Their name (optional)</Label>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Khushi" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label className="text-xs">Items</Label>
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                placeholder="Item name"
                value={it.productName}
                onChange={(e) => updateItem(i, { productName: e.target.value })}
                className="flex-[3]"
              />
              <Input
                type="number"
                min="0"
                placeholder="₹"
                value={it.productPrice}
                onChange={(e) => updateItem(i, { productPrice: e.target.value })}
                className="flex-1"
              />
              <Input
                type="number"
                min="1"
                placeholder="Qty"
                value={it.quantity}
                onChange={(e) => updateItem(i, { quantity: e.target.value })}
                className="w-16 flex-shrink-0"
              />
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
                disabled={items.length === 1}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm text-foreground/50 hover:bg-olive-50 disabled:opacity-30"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setItems((prev) => [...prev, { ...emptyItem }])}
            className="rounded-sm border border-dashed border-border px-3 py-1.5 text-xs text-foreground/50 hover:bg-olive-50"
          >
            + Add item
          </button>
        </div>

        <div className="mt-4 space-y-1">
          <Label className="text-xs">Note to the customer (optional)</Label>
          <Textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Shown in their email — e.g. what you agreed on WhatsApp"
          />
        </div>

        <div className="mt-4 flex justify-between border-t border-border pt-3 text-sm font-medium">
          <span>Items total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
        <p className="mt-1 text-xs text-foreground/45">Delivery and GST are added at checkout, once they give an address.</p>

        <div className="mt-5 flex justify-end">
          <Button type="submit" disabled={sending || !email.trim()} className="bg-olive-600 hover:bg-black">
            {sending ? "Sending…" : "Create & email the order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
