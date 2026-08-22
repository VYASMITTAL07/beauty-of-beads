import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, AdminApiError, type AdminFeaturedReview, type AdminReview } from "../adminApi";

type FeaturedForm = {
  reviewerName: string;
  rating: string;
  comment: string;
  productName: string;
};

const emptyFeaturedForm: FeaturedForm = { reviewerName: "", rating: "5", comment: "", productName: "" };

export default function ReviewsSection({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  return (
    <div>
      <h1 className="font-serif text-2xl text-olive-600">Reviews</h1>

      <FeaturedReviewsCard onError={onError} onSuccess={onSuccess} />
      <ProductReviewsCard onError={onError} onSuccess={onSuccess} />
    </div>
  );
}

function FeaturedReviewsCard({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
  const [reviews, setReviews] = useState<AdminFeaturedReview[] | null>(null);
  const [form, setForm] = useState<FeaturedForm>(emptyFeaturedForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminApi.featuredReviews
      .list()
      .then((r) => setReviews(r.reviews))
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load homepage reviews"));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startEdit = (r: AdminFeaturedReview) => {
    setEditingId(r.id);
    setForm({ reviewerName: r.reviewer_name, rating: String(r.rating), comment: r.comment, productName: r.product_name || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyFeaturedForm);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.reviewerName.trim() || !form.comment.trim()) {
      onError("Reviewer name and comment are required.");
      return;
    }
    setSaving(true);
    const data = {
      reviewerName: form.reviewerName.trim(),
      rating: Number(form.rating) || 5,
      comment: form.comment.trim(),
      productName: form.productName.trim() || undefined,
    };
    try {
      if (editingId != null) {
        await adminApi.featuredReviews.update(editingId, data);
        onSuccess("Homepage review updated");
      } else {
        await adminApi.featuredReviews.create(data);
        onSuccess("Homepage review added");
      }
      cancelEdit();
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save homepage review");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Remove this homepage review?")) return;
    try {
      await adminApi.featuredReviews.remove(id);
      onSuccess("Homepage review removed");
      if (editingId === id) cancelEdit();
      load();
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't remove homepage review");
    }
  };

  return (
    <div className="mt-5 rounded-md border border-border bg-background p-5">
      <h2 className="font-serif text-lg text-olive-600">Homepage reviews</h2>
      <p className="mt-1 text-xs text-foreground/50">
        Curated testimonials shown on the storefront homepage. These aren't tied to real orders.
      </p>

      <form onSubmit={save} className="mt-4 grid grid-cols-1 gap-3 rounded-sm bg-olive-50 p-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Reviewer name</Label>
          <Input value={form.reviewerName} onChange={(e) => setForm({ ...form, reviewerName: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Rating (1-5)</Label>
          <Input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label className="text-xs">Comment</Label>
          <Textarea rows={2} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Product name (optional)</Label>
          <Input value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
        </div>
        <div className="flex items-end gap-2">
          <Button type="submit" disabled={saving} className="bg-olive-600 hover:bg-black">
            {saving ? "Saving…" : editingId != null ? "Save changes" : "+ Add review"}
          </Button>
          {editingId != null && (
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="mt-4 space-y-2">
        {reviews?.map((r) => (
          <div key={r.id} className="flex items-start justify-between gap-3 rounded-sm border border-border/60 p-3">
            <div>
              <p className="text-sm font-medium">
                {r.reviewer_name} · {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
              {r.product_name && <p className="text-xs text-foreground/50">{r.product_name}</p>}
              <p className="mt-1 text-sm text-foreground/80">{r.comment}</p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <button type="button" onClick={() => startEdit(r)} className="text-xs font-medium text-olive-600 hover:underline">
                Edit
              </button>
              <button type="button" onClick={() => remove(r.id)} className="text-xs font-medium text-clay-500 hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}
        {reviews && reviews.length === 0 && <p className="text-sm text-foreground/50">No homepage reviews yet.</p>}
      </div>
    </div>
  );
}

function ProductReviewsCard({ onError, onSuccess }: { onError: (m: string) => void; onSuccess: (m: string) => void }) {
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

  const grouped = useMemo(() => {
    if (!reviews) return [];
    const map = new Map<string, AdminReview[]>();
    for (const r of reviews) {
      const key = r.product_name;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [reviews]);

  return (
    <div className="mt-6">
      <h2 className="border-t border-border pt-6 font-serif text-lg text-olive-600">Product reviews</h2>
      <p className="mt-1 text-xs text-foreground/50">Verified-purchase reviews customers left on individual products, grouped by product.</p>

      <div className="mt-4 space-y-6">
        {grouped.map(([productName, productReviews]) => (
          <div key={productName}>
            <h3 className="text-sm font-medium text-foreground">{productName}</h3>
            <div className="mt-2 space-y-3">
              {productReviews.map((r) => (
                <div key={r.id} className="rounded-md border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs text-foreground/50">
                      {r.reviewer_name} · {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)} · {new Date(r.created_at).toLocaleDateString("en-IN")}
                    </p>
                    <button type="button" onClick={() => remove(r.id)} className="flex-shrink-0 text-xs font-medium text-clay-500 hover:underline">
                      Remove
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {reviews && reviews.length === 0 && <p className="text-sm text-foreground/50">No reviews yet.</p>}
      </div>
    </div>
  );
}
