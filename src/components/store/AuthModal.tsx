import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth, ApiError } from "@/context/AuthContext";
import { GOOGLE_CLIENT_ID } from "@/lib/api";

// Minimal shape of the bits of the Google Identity Services API this file touches —
// the real script (loaded from Google at runtime) attaches this to window.google.
type GoogleIdCredentialResponse = { credential: string };
type GoogleAccountsId = {
  initialize: (config: { client_id: string; callback: (res: GoogleIdCredentialResponse) => void }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
};
declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleAccountsId } };
  }
}

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

// Loaded once and cached — every AuthModal open reuses the same script tag/promise
// instead of re-injecting it.
let googleScriptPromise: Promise<void> | null = null;
function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;
  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Could not load Google Sign-In")));
      return;
    }
    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Google Sign-In"));
    document.head.appendChild(script);
  });
  return googleScriptPromise;
}

export function AuthModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const buttonHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setError(null);
      return;
    }
    if (!GOOGLE_CLIENT_ID) return;

    let cancelled = false;
    loadGoogleScript()
      .then(() => {
        if (cancelled) return;
        const accountsId = window.google?.accounts?.id;
        const host = buttonHostRef.current;
        if (!accountsId || !host) return;

        accountsId.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            setSigningIn(true);
            setError(null);
            loginWithGoogle(response.credential)
              .then(() => onOpenChange(false))
              .catch((err) => {
                setError(err instanceof ApiError ? err.message : "Couldn't sign you in. Please check your connection and try again.");
              })
              .finally(() => setSigningIn(false));
          },
        });

        host.innerHTML = "";
        accountsId.renderButton(host, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: 280,
        });
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load Google Sign-In. Please check your connection and try again.");
      });

    return () => {
      cancelled = true;
    };
  }, [open, loginWithGoogle, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-lg font-sans sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl">Welcome to Beauty of Beads</DialogTitle>
          <DialogDescription className="text-center">Sign in with Google to track orders, save your cart, and check out faster.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 py-2">
          {GOOGLE_CLIENT_ID ? (
            <div ref={buttonHostRef} className="flex min-h-[44px] items-center justify-center" />
          ) : (
            <p className="text-center text-sm text-foreground/60">Google Sign-In is being set up — check back soon.</p>
          )}
          {signingIn && <p className="text-sm text-foreground/60">Signing you in…</p>}
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
