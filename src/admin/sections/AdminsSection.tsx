import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminApi, AdminApiError, type AdminAccount } from "../adminApi";

// Who can sign into this panel.
//
// There was no way to see which accounts existed, and no way back in for an
// owner who had forgotten theirs: the setup endpoint only creates, refuses an
// email that already exists, and needs a key meant to be rotated away after
// first use. Everything here needs an admin session already, so it grants
// nothing that signing in did not.

export default function AdminsSection({
  onError,
  onSuccess,
}: {
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [admins, setAdmins] = useState<AdminAccount[] | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [resetFor, setResetFor] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });

  const load = () => {
    adminApi.admins
      .list()
      .then((r) => {
        setAdmins(r.admins);
        setCurrentId(r.currentId);
      })
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load admin accounts"));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const savePassword = async (id: number) => {
    if (password.length < 8) {
      onError("Use at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const r = await adminApi.admins.setPassword(id, password);
      onSuccess(`New password set for ${r.email}`);
      setResetFor(null);
      setPassword("");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't set the password");
    } finally {
      setBusy(false);
    }
  };

  const create = async () => {
    setBusy(true);
    try {
      await adminApi.admins.create(newAdmin);
      onSuccess(`${newAdmin.email} can now sign in`);
      setAdding(false);
      setNewAdmin({ name: "", email: "", password: "" });
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't add that admin");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (a: AdminAccount) => {
    if (!window.confirm(`Remove ${a.email}? They will not be able to sign in again.`)) return;
    setBusy(true);
    try {
      await adminApi.admins.remove(a.id);
      onSuccess(`${a.email} removed`);
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't remove that admin");
    } finally {
      setBusy(false);
    }
  };

  if (!admins) return <p className="text-sm text-foreground/50">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-lg text-olive-600">Admin accounts</h2>
          <p className="mt-1 text-xs text-foreground/50">{admins.length} account(s) can sign into this panel</p>
        </div>
        <Button onClick={() => setAdding((v) => !v)} disabled={busy}>
          {adding ? "Cancel" : "Add an admin"}
        </Button>
      </div>

      {adding && (
        <div className="mt-4 rounded-sm border border-border p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Name</Label>
              <Input
                className="mt-1"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input
                className="mt-1"
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Password</Label>
              <Input
                className="mt-1"
                type="password"
                autoComplete="new-password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              />
              <p className="mt-1 text-xs text-foreground/45">At least 8 characters.</p>
            </div>
          </div>
          <Button className="mt-3" onClick={create} disabled={busy || !newAdmin.email || newAdmin.password.length < 8}>
            {busy ? "Adding…" : "Add admin"}
          </Button>
        </div>
      )}

      <div className="mt-4 divide-y divide-border rounded-sm border border-border">
        {admins.map((a) => (
          <div key={a.id} className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {a.name}
                  {a.id === currentId && <span className="ml-2 text-xs font-normal text-olive-600">you</span>}
                </p>
                <p className="truncate text-xs text-foreground/50">{a.email}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setResetFor(resetFor === a.id ? null : a.id);
                    setPassword("");
                  }}
                  className="text-xs font-medium text-olive-600 hover:underline"
                >
                  {resetFor === a.id ? "Cancel" : "Set new password"}
                </button>
                {a.id !== currentId && admins.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(a)}
                    disabled={busy}
                    className="text-xs font-medium text-destructive hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {resetFor === a.id && (
              <div className="mt-3 rounded-sm bg-olive-50/60 p-3">
                <Label className="text-xs">New password for {a.email}</Label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <Input
                    type="password"
                    autoComplete="new-password"
                    className="min-w-[12rem] flex-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                  />
                  <Button onClick={() => savePassword(a.id)} disabled={busy || password.length < 8}>
                    {busy ? "Saving…" : "Save"}
                  </Button>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/55">
                  Type the new password here and tell them what it is — nothing is emailed. Setting it also clears the
                  lockout that repeated wrong guesses will have left on the account.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
