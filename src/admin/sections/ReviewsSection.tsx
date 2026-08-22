import { useEffect, useState } from "react";
import { adminApi, AdminApiError, type AdminReview } from "../adminApi";

export default function ReviewsSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [reviews, setReviews] = useState<AdminReview[] | null>(null);

  const load = () => {
    adminApi.reviews
      .list()
      .then((r) => setReviews(r.reviews))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load reviews"));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const remove = async (id: number) => {
    if (!confirm("Remove this review? This can't be undone.")) return;
    try {
      await adminApi.reviews.remove(id);
      onSuccess("Review removed");
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't remove review");
    }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-600">Reviews</h1>

      <div className="mt-5 space-y-3">
        {reviews?.map((r) => (
          <div key={r.id} className="rounded-md border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{r.product_name}</p>
                <p className="text-xs text-foreground/50">
                  {r.reviewer_name} · {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)} · {new Date(r.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
              <button type="button" onClick={() => remove(r.id)} className="flex-shrink-0 text-xs font-medium text-clay-500 hover:underline">
                Remove
              </button>
            </div>
            <p className="mt-2 text-sm text-foreground/80">{r.comment}</p>
          </div>
        ))}
        {reviews && reviews.length === 0 && <p className="text-sm text-foreground/50">No reviews yet.</p>}
      </div>
    </div>
  );
}
