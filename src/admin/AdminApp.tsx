import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminApi, AdminApiError, type AdminUser } from "./adminApi";
import ProductsSection from "./sections/ProductsSection";
import WebsiteEditorSection from "./sections/WebsiteEditorSection";
import OrdersSection from "./sections/OrdersSection";
import CustomersSection from "./sections/CustomersSection";
import ReviewsSection from "./sections/ReviewsSection";
import PromoCodesSection from "./sections/PromoCodesSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import ComplaintsSection from "./sections/ComplaintsSection";

const SECTIONS = [
  { key: "analytics", label: "Overview" },
  { key: "products", label: "Products" },
  { key: "website", label: "Website Editor" },
  { key: "orders", label: "Orders" },
  { key: "customers", label: "Customers" },
  { key: "reviews", label: "Reviews" },
  { key: "promo", label: "Promo Codes" },
  { key: "complaints", label: "Complaints" },
] as const;
type SectionKey = (typeof SECTIONS)[number]["key"];

export default function AdminApp() {
  const [admin, setAdmin] = useState<AdminUser | null | undefined>(undefined); // undefined = checking
  const [section, setSection] = useState<SectionKey>("analytics");

  useEffect(() => {
    adminApi.auth
      .me()
      .then((r) => setAdmin(r.admin))
      .catch(() => setAdmin(null));
  }, []);

  if (admin === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-olive-50 font-sans text-sm text-foreground/50">
        Loading admin panel…
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onLoggedIn={setAdmin} />;
  }

  return (
    <div className="flex min-h-screen bg-olive-50 font-sans">
      <Toaster position="top-center" />
      <aside className="flex w-56 flex-shrink-0 flex-col border-r border-border bg-background">
        <div className="border-b border-border px-5 py-5">
          <p className="font-serif text-lg uppercase tracking-wide text-olive-600">Beauty of Beads</p>
          <p className="text-xs text-foreground/50">Admin panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSection(s.key)}
              className={`block w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                section === s.key ? "bg-olive-100 font-medium text-olive-600" : "text-foreground/70 hover:bg-olive-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border px-5 py-4">
          <p className="truncate text-xs text-foreground/50">{admin.email}</p>
          <button
            type="button"
            onClick={async () => {
              await adminApi.auth.logout().catch(() => {});
              setAdmin(null);
            }}
            className="mt-2 text-xs font-medium text-clay-500 hover:underline"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {section === "analytics" && <AnalyticsSection onError={(m) => toast.error(m)} />}
        {section === "products" && <ProductsSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
        {section === "website" && <WebsiteEditorSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
        {section === "orders" && <OrdersSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
        {section === "customers" && <CustomersSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
        {section === "reviews" && <ReviewsSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
        {section === "promo" && <PromoCodesSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
        {section === "complaints" && <ComplaintsSection onError={(m) => toast.error(m)} onSuccess={(m) => toast.success(m)} />}
      </main>
    </div>
  );
}

function AdminLogin({ onLoggedIn }: { onLoggedIn: (a: AdminUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { admin } = await adminApi.auth.login(email, password);
      onLoggedIn(admin);
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Couldn't log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-olive-50 px-4 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-md border border-border bg-background p-8 shadow-sm">
        <p className="text-center font-serif text-2xl uppercase tracking-wide text-olive-600">Beauty of Beads</p>
        <p className="mb-6 mt-1 text-center text-xs uppercase tracking-wide text-foreground/50">Admin panel</p>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="mt-6 w-full bg-olive-600 hover:bg-black">
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>
    </div>
  );
}
