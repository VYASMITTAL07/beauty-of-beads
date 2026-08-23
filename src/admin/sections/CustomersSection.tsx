import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, AdminApiError, type AdminCustomer } from "../adminApi";

export default function CustomersSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [customers, setCustomers] = useState<AdminCustomer[] | null>(null);
  const [search, setSearch] = useState("");
  const [orderingFor, setOrderingFor] = useState<AdminCustomer | null>(null);

  useEffect(() => {
    adminApi.customers
      .list()
      .then((r) => setCustomers(r.customers))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load customers"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = customers?.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Customers</h1>
        <input
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm sm:w-auto"
        />
      </div>

      {/* Mobile: card list */}
      <div className="mt-5 flex flex-col gap-2 md:hidden">
        {filtered?.map((c) => (
          <div key={c.id} className="rounded-md border border-border bg-background p-3">
            <p className="truncate text-sm font-medium">{c.name}</p>
            <p className="truncate text-xs text-foreground/60">{c.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60">
              <span>{c.order_count} orders</span>
              <span className="font-serif text-sm text-foreground">₹{c.lifetime_value.toLocaleString("en-IN")}</span>
              <span className="text-foreground/45">Joined {new Date(c.created_at).toLocaleDateString("en-IN")}</span>
            </div>
            <button
              type="button"
              onClick={() => setOrderingFor(c)}
              className="mt-2.5 rounded-sm border border-olive-400 px-3 py-1.5 text-xs font-medium text-olive-600 transition-colors hover:bg-olive-50"
            >
              Create custom order
            </button>
          </div>
        ))}
        {filtered && filtered.length === 0 && (
          <p className="rounded-md border border-border bg-background p-6 text-center text-sm text-foreground/50">No customers found.</p>
        )}
      </div>

      <div className="mt-5 hidden overflow-x-auto rounded-md border border-border bg-background md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Lifetime value</th>
              <th className="p-3">Joined</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {filtered?.map((c) => (
              <tr key={c.id} className="border-b border-border/60 last:border-none hover:bg-olive-50/50">
                <td className="p-3">{c.name}</td>
                <td className="p-3 text-foreground/70">{c.email}</td>
                <td className="p-3">{c.order_count}</td>
                <td className="p-3">₹{c.lifetime_value.toLocaleString("en-IN")}</td>
                <td className="p-3 text-foreground/50">{new Date(c.created_at).toLocaleDateString("en-IN")}</td>
                <td className="p-3">
                  <button type="button" onClick={() => setOrderingFor(c)} className="text-xs font-medium text-olive-600 hover:underline">
                    Create custom order
                  </button>
                </td>
              </tr>
            ))}
            {filtered && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-foreground/50">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {orderingFor && (
        <CustomOrderModal customer={orderingFor} onClose={() => setOrderingFor(null)} onError={onError} onSuccess={onSuccess} />
      )}
    </div>
  );
}

type LineItem = { productName: string; productPrice: string; quantity: string };

const emptyItem: LineItem = { productName: "", productPrice: "", quantity: "1" };

function CustomOrderModal({
  customer,
  onClose,
  onError,
  onSuccess,
}: {
  customer: AdminCustomer;
  onClose: () => void;
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [items, setItems] = useState<LineItem[]>([{ ...emptyItem }]);
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  const total = items.reduce((sum, it) => sum + (Number(it.productPrice) || 0) * (Number(it.quantity) || 0), 0);

  const updateItem = (i: number, patch: Partial<LineItem>) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = items
      .map((it) => ({ productName: it.productName.trim(), productPrice: Number(it.productPrice), quantity: Number(it.quantity) || 1 }))
      .filter((it) => it.productName && it.productPrice > 0);
    if (cleaned.length === 0) {
      onError("Add at least one item with a name and price.");
      return;
    }
    setSending(true);
    try {
      const result = await adminApi.customers.createCustomOrder(customer.id, { items: cleaned, note: note.trim() || undefined });
      onSuccess(`Custom order ${result.orderNumber} sent to ${customer.email}`);
      onClose();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't create custom order");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-6 sm:p-4 sm:py-8" onClick={onClose}>
      <form onSubmit={send} className="w-full max-w-lg rounded-md bg-background p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl text-olive-600">Create custom order</h2>
            <p className="text-xs text-foreground/50">
              For {customer.name} · {customer.email}
            </p>
          </div>
          <button type="button" onClick={onClose} className="text-sm text-foreground/50 hover:text-foreground">
            Close
          </button>
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
          <Label className="text-xs">Note to customer (optional)</Label>
          <Textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Shown in the customer's confirmation email" />
        </div>

        <div className="mt-4 flex justify-between border-t border-border pt-3 text-sm font-medium">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={sending} className="bg-olive-600 hover:bg-black">
            {sending ? "Sending…" : "Send to customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
