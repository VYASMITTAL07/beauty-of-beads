import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api, ApiError, type ApiUser } from "@/lib/api";

type AuthState = {
  user: ApiUser | null;
  loading: boolean;
  // true once we've checked whether a session cookie is present — lets the UI avoid
  // flashing a "logged out" state for a moment while the initial /me check is in flight
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  // Patches the signed-in user's locally-held profile fields (e.g. after a
  // successful PATCH /api/auth/me) so every consumer — header greeting,
  // checkout prefill, profile page — reflects the change immediately without
  // a hard reload or a second round trip to /me.
  updateUser: (patch: Partial<ApiUser>) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.auth
      .me()
      .then((res) => {
        if (!cancelled) setUser(res.user);
      })
      .catch(() => {
        // not logged in, or backend unreachable (e.g. inside the Artifact CSP sandbox) — fine, stay a guest
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.auth.login({ email, password });
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.auth.signup({ name, email, password });
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async (credential: string) => {
    setLoading(true);
    try {
      const res = await api.auth.google(credential);
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.auth.logout();
    } catch {
      // even if the request fails, drop the local session so the UI reflects "logged out"
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback((patch: Partial<ApiUser>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, ready, login, signup, loginWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { ApiError };
