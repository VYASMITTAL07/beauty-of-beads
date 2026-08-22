import { useEffect, useState } from "react";
import { adminApi, AdminApiError, type AdminCustomer } from "../adminApi";

export default function CustomersSection({ onError }: { onError: (m: string) => void }) {
  const [customers, setCustomers] = useState<AdminCustomer[] | null>(null);
  const [search, setSearch] = useState("");

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
        <h1 className="font-serif text-2xl text-olive-600">Customers</h1>
        <input
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-5 overflow-x-auto rounded-md border border-border bg-background">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Lifetime value</th>
              <th className="p-3">Joined</th>
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
              </tr>
            ))}
            {filtered && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-foreground/50">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
