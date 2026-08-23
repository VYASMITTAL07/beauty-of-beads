import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, X, LogOut } from "lucide-react";
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

// Fallback if the server doesn't report its own window (it does, via
// /api/admin/auth/me). The client logs out slightly BEFORE the server would,
// so the admin gets a clean "signed out" screen rather than a failed request.
const DEFAULT_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const CLIENT_LOGOUT_MARGIN_MS = 30 * 1000;

export default function AdminApp() {
  const [admin, setAdmin] = useState<AdminUser | null | undefined>(undefined); // undefined = checking
  const [section, setSection] = useState<SectionKey>("analytics");
  const [navOpen, setNavOpen] = useState(false);
  const [idleTimeoutMs, setIdleTimeoutMs] = useState(DEFAULT_IDLE_TIMEOUT_MS);
  const [idleLoggedOut, setIdleLoggedOut] = useState(false);

  useEffect(() => {
    adminApi.auth
      .me()
      .then((r) => {
        setAdmin(r.admin);
        if (r.idleTimeoutMs) setIdleTimeoutMs(r.idleTimeoutMs);
      })
      .catch(() => setAdmin(null));
  }, []);

  const signOut = useCallback(async (wasIdle: boolean) => {
    await adminApi.auth.logout().catch(() => {});
    setAdmin(null);
    setNavOpen(false);
    setIdleLoggedOut(wasIdle);
  }, []);

  // Auto sign-out after a period of no activity.
  //
  // The admin cookie is already a browser session cookie, but browsers restore
  // session cookies when they reopen ("continue where you left off", crash
  // recovery), so closing the browser was NOT logging the admin out. The
  // server now enforces the same idle window; this timer just makes the UI
  // agree with it instead of showing a stale panel until the next request
  // fails.
  const idleTimer = useRef<number | null>(null);
  useEffect(() => {
    if (!admin) return;

    const resetTimer = () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(
        () => void signOut(true),
        Math.max(60_000, idleTimeoutMs - CLIENT_LOGOUT_MARGIN_MS)
      );
    };

    const events: (keyof WindowEventMap)[] = ["mousedown", "keydown", "touchstart", "scroll", "focus"];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [admin, idleTimeoutMs, signOut]);

  // Close the mobile drawer whenever a section is picked.
  const chooseSection = (key: SectionKey) => {
    setSection(key);
    setNavOpen(false);
  };

  if (admin === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-olive-50 font-sans text-sm text-foreground/50">
        Loading admin panel…
      </div>
    );
  }

  if (!admin) {
    return <AdminLogin onLoggedIn={setAdmin} idleLoggedOut={idleLoggedOut} />;
  }

  const navButtons = SECTIONS.map((s) => (
    <button
      key={s.key}
      type="button"
      onClick={() => chooseSection(s.key)}
      className={`block w-full rounded-sm px-3 py-2.5 text-left text-sm transition-colors ${
        section === s.key ? "bg-olive-100 font-medium text-olive-600" : "text-foreground/70 hover:bg-olive-50"
      }`}
    >
      {s.label}
    </button>
  ));

  const accountFooter = (
    <div className="border-t border-border px-5 py-4">
      <p className="truncate text-xs text-foreground/50">{admin.email}</p>
      <button
        type="button"
        onClick={() => void signOut(false)}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-clay-500 hover:underline"
      >
        <LogOut className="h-3 w-3" />
        Log out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-olive-50 font-sans md:flex">
      <Toaster position="top-center" />

      {/* Mobile top bar. The sidebar was a fixed w-56 flex child with no
          breakpoints, so on a phone it ate ~60% of the viewport and squeezed
          the content into a narrow strip. */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-foreground/70"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <p className="truncate font-serif text-sm uppercase tracking-wide text-olive-600">Beauty of Beads</p>
          <p className="truncate text-[11px] text-foreground/50">{SECTIONS.find((s) => s.key === section)?.label}</p>
        </div>
      </header>

      {/* Mobile drawer */}
      {navOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" aria-label="Close menu" onClick={() => setNavOpen(false)} className="absolute inset-0 bg-black/40" />
          <aside className="absolute inset-y-0 left-0 flex w-64 max-w-[80%] flex-col bg-background shadow-xl">
            <div className="flex items-start justify-between border-b border-border px-5 py-5">
              <div>
                <p className="font-serif text-lg uppercase tracking-wide text-olive-600">Beauty of Beads</p>
                <p className="text-xs text-foreground/50">Admin panel</p>
              </div>
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-sm text-foreground/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">{navButtons}</nav>
            {accountFooter}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-border bg-background md:flex">
        <div className="border-b border-border px-5 py-5">
          <p className="font-serif text-lg uppercase tracking-wide text-olive-600">Beauty of Beads</p>
          <p className="text-xs text-foreground/50">Admin panel</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">{navButtons}</nav>
        {accountFooter}
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">
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

function AdminLogin({ onLoggedIn, idleLoggedOut }: { onLoggedIn: (a: AdminUser) => void; idleLoggedOut?: boolean }) {
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
    <div className="flex min-h-screen items-center justify-center bg-olive-50 px-4 py-8 font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-md border border-border bg-background p-6 shadow-sm sm:p-8">
        <p className="text-center font-serif text-2xl uppercase tracking-wide text-olive-600">Beauty of Beads</p>
        <p className="mb-6 mt-1 text-center text-xs uppercase tracking-wide text-foreground/50">Admin panel</p>

        {idleLoggedOut && (
          <p className="mb-5 rounded-sm bg-olive-50 px-3 py-2.5 text-center text-xs text-foreground/70">
            You were signed out after a period of inactivity.
          </p>
        )}

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
