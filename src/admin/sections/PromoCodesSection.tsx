import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminApi, AdminApiError, type AdminPromoCode } from "../adminApi";

const empty = {
  code: "",
  type: "percent" as "percent" | "flat",
  value: "",
  minOrderAmount: "",
  maxDiscountAmount: "",
  usageLimit: "",
  expiresAt: "",
};

export default function PromoCodesSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [codes, setCodes] = useState<AdminPromoCode[] | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminApi.promoCodes
      .list()
      .then((r) => setCodes(r.promoCodes))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load promo codes"));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.value) {
      onError("Code and value are required.");
      return;
    }
    setSaving(true);
    try {
      await adminApi.promoCodes.create({
        code: form.code.trim(),
        type: form.type,
        value: Number(form.value),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
        maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : null,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
        expiresAt: form.expiresAt || null,
      });
      onSuccess("Promo code created");
      setForm(empty);
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't create promo code");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (code: AdminPromoCode) => {
    try {
      await adminApi.promoCodes.update(code.id, { active: !code.active });
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update promo code");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this promo code?")) return;
    try {
      await adminApi.promoCodes.remove(id);
      onSuccess("Promo code deleted");
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't delete promo code");
    }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-600">Promo Codes</h1>

      <form onSubmit={create} className="mt-5 grid grid-cols-2 gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-4">
        <div className="space-y-1">
          <Label className="text-xs">Code</Label>
          <Input placeholder="WELCOME10" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Type</Label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "percent" | "flat" })}
            className="h-9 w-full rounded-sm border border-border bg-background px-2 text-sm"
          >
            <option value="percent">% off</option>
            <option value="flat">₹ flat off</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Value</Label>
          <Input type="number" placeholder="10" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Min order ₹</Label>
          <Input type="number" placeholder="0" value={form.minOrderAmount} onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Max discount ₹ (optional)</Label>
          <Input type="number" value={form.maxDiscountAmount} onChange={(e) => setForm({ ...form, maxDiscountAmount: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Usage limit (optional)</Label>
          <Input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Expires (optional)</Label>
          <Input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={saving} className="w-full bg-olive-600 hover:bg-black">
            Add code
          </Button>
        </div>
      </form>

      <div className="mt-5 overflow-x-auto rounded-md border border-border bg-background">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
              <th className="p-3">Code</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Min order</th>
              <th className="p-3">Used</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {codes?.map((c) => (
              <tr key={c.id} className="border-b border-border/60 last:border-none">
                <td className="p-3 font-mono">{c.code}</td>
                <td className="p-3">{c.type === "percent" ? `${c.value}%` : `₹${c.value}`}</td>
                <td className="p-3">₹{c.min_order_amount}</td>
                <td className="p-3">
                  {c.used_count}
                  {c.usage_limit ? ` / ${c.usage_limit}` : ""}
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => toggleActive(c)}
                    className={`rounded-full px-2 py-0.5 text-xs ${c.active ? "bg-olive-100 text-olive-600" : "bg-foreground/10 text-foreground/50"}`}
                  >
                    {c.active ? "Active" : "Paused"}
                  </button>
                </td>
                <td className="p-3">
                  <button type="button" onClick={() => remove(c.id)} className="text-xs font-medium text-clay-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {codes && codes.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-foreground/50">
                  No promo codes yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
