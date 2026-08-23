import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminApi, AdminApiError, type AdminComplaint } from "../adminApi";

type View = "all" | "open" | "in_progress" | "resolved" | "rejected";

const STATUS_LABEL: Record<AdminComplaint["status"], string> = {
  open: "Open",
  in_progress: "In progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

const STATUS_BADGE: Record<AdminComplaint["status"], string> = {
  open: "bg-clay-100 text-clay-600",
  in_progress: "bg-olive-100 text-olive-600",
  resolved: "bg-olive-100 text-olive-600",
  rejected: "bg-foreground/10 text-foreground/50",
};

const STATUS_FLOW: AdminComplaint["status"][] = ["open", "in_progress", "resolved", "rejected"];

export default function ComplaintsSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [complaints, setComplaints] = useState<AdminComplaint[] | null>(null);
  const [view, setView] = useState<View>("all");
  const [openComplaintId, setOpenComplaintId] = useState<number | null>(null);

  const load = () => {
    adminApi.complaints
      .list(view === "all" ? undefined : view)
      .then((r) => setComplaints(r.complaints))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load complaints"));
  };

  useEffect(load, [view]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Complaints</h1>
        <div className="flex flex-wrap rounded-sm border border-border bg-background p-0.5 text-xs sm:text-sm">
          {(["all", "open", "in_progress", "resolved", "rejected"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-sm px-3 py-1.5 capitalize transition-colors ${
                view === v ? "bg-olive-100 font-medium text-olive-600" : "text-foreground/60 hover:bg-olive-50"
              }`}
            >
              {v === "all" ? "All" : STATUS_LABEL[v as AdminComplaint["status"]]}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: card list — an eight-column table cannot work on a phone. */}
      <div className="mt-5 flex flex-col gap-2 lg:hidden">
        {complaints?.map((c) => (
          <div key={c.id} className="rounded-md border border-border bg-background p-3">
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-foreground/70">{c.order_number}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${STATUS_BADGE[c.status]}`}>{STATUS_LABEL[c.status]}</span>
            </div>
            <p className="mt-1.5 truncate text-sm font-medium">{c.customer_name}</p>
            <p className="truncate text-xs text-foreground/50">{c.product_name || "General"}</p>
            <p className="mt-1.5 line-clamp-2 text-xs text-foreground/70">{c.description}</p>
            {c.images.length > 0 && (
              <p className="mt-1 text-[11px] text-foreground/40">
                {c.images.length} photo{c.images.length === 1 ? "" : "s"}
              </p>
            )}
            <div className="mt-2.5 flex items-center justify-between gap-3">
              <a href={`tel:${c.phone}`} className="text-xs text-olive-600 hover:underline">
                {c.phone}
              </a>
              <button
                type="button"
                onClick={() => setOpenComplaintId(c.id)}
                className="rounded-sm border border-olive-400 px-3 py-1.5 text-xs font-medium text-olive-600 transition-colors hover:bg-olive-50"
              >
                View
              </button>
            </div>
          </div>
        ))}
        {complaints && complaints.length === 0 && (
          <p className="rounded-md border border-border bg-background p-6 text-center text-sm text-foreground/50">No complaints found.</p>
        )}
      </div>

      <div className="mt-5 hidden overflow-x-auto rounded-md border border-border bg-background lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-foreground/50">
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Description</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Raised</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {complaints?.map((c) => (
              <tr key={c.id} className="border-b border-border/60 last:border-none hover:bg-olive-50/50">
                <td className="p-3 font-mono text-xs">{c.order_number}</td>
                <td className="p-3">
                  <div>{c.customer_name}</div>
                  <div className="text-xs text-foreground/50">{c.customer_email}</div>
                </td>
                <td className="p-3">{c.product_name || <span className="text-foreground/50">General</span>}</td>
                <td className="max-w-xs p-3">
                  <p className="truncate text-foreground/70">{c.description}</p>
                  {c.images.length > 0 && (
                    <p className="mt-0.5 text-xs text-foreground/40">
                      {c.images.length} photo{c.images.length === 1 ? "" : "s"}
                    </p>
                  )}
                </td>
                <td className="p-3">
                  <a href={`tel:${c.phone}`} className="text-olive-600 hover:underline">
                    {c.phone}
                  </a>
                </td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${STATUS_BADGE[c.status]}`}>{STATUS_LABEL[c.status]}</span>
                </td>
                <td className="p-3 text-foreground/50">{new Date(c.created_at).toLocaleDateString("en-IN")}</td>
                <td className="p-3">
                  <button type="button" onClick={() => setOpenComplaintId(c.id)} className="text-xs font-medium text-olive-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {complaints && complaints.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-foreground/50">
                  No complaints found.
                </td>
              </tr>
            )}
            {!complaints && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-foreground/50">
                  Loading…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openComplaintId != null && (
        <ComplaintDetailModal
          complaint={complaints?.find((c) => c.id === openComplaintId) ?? null}
          onClose={() => setOpenComplaintId(null)}
          onChanged={load}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}

function ComplaintDetailModal({
  complaint,
  onClose,
  onChanged,
  onError,
  onSuccess,
}: {
  complaint: AdminComplaint | null;
  onClose: () => void;
  onChanged: () => void;
  onError: (m: string) => void;
  onSuccess: (m: string) => void;
}) {
  const [updating, setUpdating] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [current, setCurrent] = useState<AdminComplaint | null>(complaint);

  useEffect(() => setCurrent(complaint), [complaint]);

  const setStatus = async (status: AdminComplaint["status"]) => {
    if (!current) return;
    setUpdating(true);
    try {
      const { complaint: updated } = await adminApi.complaints.setStatus(current.id, status);
      setCurrent(updated);
      onSuccess(`Complaint marked ${STATUS_LABEL[status]}`);
      onChanged();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update complaint status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-6 sm:p-4 sm:py-8" onClick={onClose}>
      <div className="w-full max-w-lg rounded-md bg-background p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        {!current ? (
          <p className="text-sm text-foreground/50">Loading…</p>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-sm">{current.order_number}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-olive-600">{current.product_name || "General complaint"}</p>
              </div>
              <button type="button" onClick={onClose} className="text-sm text-foreground/50 hover:text-foreground">
                Close
              </button>
            </div>

            <div className="mt-4 rounded-sm bg-olive-50 p-3 text-sm">
              <p className="font-medium">{current.customer_name}</p>
              <p className="text-foreground/60">{current.customer_email}</p>
              <a href={`tel:${current.phone}`} className="mt-1 inline-block text-olive-600 hover:underline">
                {current.phone}
              </a>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">Description</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/80">{current.description}</p>
            </div>

            {current.images.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">Photos</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {current.images.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxSrc(src)}
                      className="h-20 w-20 overflow-hidden rounded-sm border border-border"
                    >
                      <img src={src} alt={`Complaint photo ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-foreground/50">Status</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {STATUS_FLOW.map((s) => (
                  <Button
                    key={s}
                    type="button"
                    size="sm"
                    disabled={updating || current.status === s}
                    variant={current.status === s ? "default" : "outline"}
                    onClick={() => setStatus(s)}
                    className={current.status === s ? "bg-olive-600 hover:bg-black" : ""}
                  >
                    {STATUS_LABEL[s]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-border pt-3 text-xs text-foreground/50">
              <span>Raised {new Date(current.created_at).toLocaleString("en-IN")}</span>
              <span>Updated {new Date(current.updated_at).toLocaleString("en-IN")}</span>
            </div>
          </>
        )}
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxSrc(null);
          }}
        >
          <img src={lightboxSrc} alt="" className="max-h-full max-w-full rounded-sm object-contain" />
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-6 top-6 text-2xl leading-none text-white hover:text-white/70"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
