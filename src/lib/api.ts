// Thin fetch wrapper for the Beauty of Beads backend.
//
// API_BASE is picked up at build time from VITE_API_BASE (see .env.example in the
// backend folder / README) — defaults to localhost:4000 for local dev. When this
// site is deployed for real (e.g. on Hostinger), set VITE_API_BASE to the deployed
// backend's URL before building.
//
// IMPORTANT: when this page is published as a claude.ai Artifact (strict CSP), fetch
// calls to any external host — including this backend — are blocked by the sandbox.
// Backend-dependent features (login, cart sync, orders) only work when the built
// HTML is opened directly / served from a real host that can reach the backend.

// Vite (`npm run build` / `npm run dev`) exposes build-time env vars via the runtime
// object `import.meta.env`. The Parcel build used for the single-file artifact
// (bundle-artifact.sh) does NOT populate `import.meta.env`, and — verified directly —
// does not statically inline custom `process.env.SOME_VAR` references in this project's
// setup either, so an env var can't reliably reach the artifact build at all. Guarded
// so a Vite build can still override via VITE_API_BASE / VITE_GOOGLE_CLIENT_ID if set.
import { compressImage } from "@/lib/compressImage";

function readViteEnv(key: "VITE_API_BASE" | "VITE_GOOGLE_CLIENT_ID"): string {
  return (import.meta as { env?: Record<string, string> }).env?.[key] || "";
}

const API_BASE = readViteEnv("VITE_API_BASE") || "https://beauty-of-beads-api.vyasmittal1206.workers.dev";

// Google Cloud OAuth Client ID (Web application) for "Sign in with Google". Client IDs
// aren't secret — they're meant to be embedded in client-side code (unlike a client
// secret) — so hardcoding it here is the normal, safe approach, and it's the only
// approach that reliably survives the Parcel artifact build (see note above). Empty
// until it's set — the UI shows a friendly "being set up" message instead of a broken
// button when this is blank.
const GOOGLE_CLIENT_ID_HARDCODED = "958754486244-3ji2ug716o2vgpl3g27v6v5ipk07trbe.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID = readViteEnv("VITE_GOOGLE_CLIENT_ID") || GOOGLE_CLIENT_ID_HARDCODED;
export { GOOGLE_CLIENT_ID };

// Resolves a media URL that may have been stored in one of two broken shapes.
//
// 1. "/media/<key>" — what uploads returned while MEDIA_PUBLIC_BASE_URL was
//    unset. Root-relative, so the browser resolved it against this site's
//    origin, but the files are served by the API worker.
// 2. "<api-origin>/<key>" — absolute but missing the "/media" segment, from a
//    later fix that appended the key straight onto the origin.
//
// Uploads now return the correct absolute URL; this repairs the rows already
// written to the database so they render without a migration.
export function mediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("/media/")) return `${API_BASE}${trimmed}`;
  // Anything under the API origin must sit beneath /media/.
  if (trimmed.startsWith(`${API_BASE}/`) && !trimmed.startsWith(`${API_BASE}/media/`)) {
    return `${API_BASE}/media/${trimmed.slice(API_BASE.length + 1)}`;
  }
  return trimmed;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }

  if (!res.ok) {
    const message = (body as { error?: string } | null)?.error || `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return body as T;
}

export type ApiUser = { id: number; name: string; email: string; phone?: string | null; created_at?: string };

// Uploads bypass `request()` because a multipart body must NOT have an
// explicit Content-Type set (the browser needs to add its own boundary=...).
async function uploadFile(path: string, file: File): Promise<{ url: string; key: string }> {
  // Complaint photos come straight off a phone camera and are routinely
  // several megabytes each, with up to five per complaint. Shrinking them here
  // keeps the upload quick on mobile data and the admin's view of them fast.
  const optimised = await compressImage(file);
  const form = new FormData();
  form.append("file", optimised);
  const res = await fetch(`${API_BASE}${path}`, { method: "POST", credentials: "include", body: form });
  let body: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }
  if (!res.ok) {
    const message = (body as { error?: string } | null)?.error || `Upload failed (${res.status})`;
    throw new ApiError(message, res.status);
  }
  return body as { url: string; key: string };
}

export const api = {
  auth: {
    signup: (data: { name: string; email: string; password: string; phone?: string }) =>
      request<{ user: ApiUser }>("/api/auth/signup", { method: "POST", body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      request<{ user: ApiUser }>("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
    logout: () => request<{ ok: true }>("/api/auth/logout", { method: "POST" }),
    google: (credential: string) => request<{ user: ApiUser }>("/api/auth/google", { method: "POST", body: JSON.stringify({ credential }) }),
    me: () => request<{ user: ApiUser }>("/api/auth/me"),
    updateProfile: (data: { name?: string; phone?: string }) =>
      request<{ user: ApiUser }>("/api/auth/me", { method: "PATCH", body: JSON.stringify(data) }),
  },
  cart: {
    list: () => request<{ items: CartItemDto[] }>("/api/cart"),
    add: (data: { productName: string; productPrice: number; productImage?: string; quantity?: number }) =>
      request<{ items: CartItemDto[] }>("/api/cart", { method: "POST", body: JSON.stringify(data) }),
    updateQuantity: (id: number, quantity: number) =>
      request<{ ok: true }>(`/api/cart/${id}`, { method: "PATCH", body: JSON.stringify({ quantity }) }),
    remove: (id: number) => request<{ ok: true }>(`/api/cart/${id}`, { method: "DELETE" }),
    clear: () => request<{ ok: true }>("/api/cart", { method: "DELETE" }),
  },
  wishlist: {
    list: () => request<{ items: WishlistItemDto[] }>("/api/wishlist"),
    add: (data: { productName: string; productPrice: number; productImage?: string }) =>
      request<{ items: WishlistItemDto[] }>("/api/wishlist", { method: "POST", body: JSON.stringify(data) }),
    removeByName: (name: string) => request<{ ok: true }>(`/api/wishlist/by-name/${encodeURIComponent(name)}`, { method: "DELETE" }),
  },
  orders: {
    list: () => request<{ orders: OrderSummaryDto[] }>("/api/orders"),
    get: (orderNumber: string) =>
      request<{ order: OrderDto; items: OrderItemDto[]; history: OrderHistoryDto[]; stages: string[] }>(
        `/api/orders/${encodeURIComponent(orderNumber)}`
      ),
    place: (data: {
      items: { productName: string; productPrice: number; quantity: number }[];
      currencyCode?: string;
      promoCode?: string;
      shipping: ShippingInput;
    }) =>
      request<{ orderNumber: string; orderId: number; totalAmount: number; discountAmount: number }>("/api/orders", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    previewPromo: (code: string, subtotal: number) =>
      request<{ valid: boolean; discountAmount?: number; error?: string }>("/api/orders/preview-promo", {
        method: "POST",
        body: JSON.stringify({ code, subtotal }),
      }),
    // Confirms a custom order an admin built for this customer (status
    // 'awaiting_payment') — the customer supplies/confirms shipping details
    // here and it becomes a normal order, same as a self-service checkout.
    confirm: (orderNumber: string, shipping: ShippingInput) =>
      request<{ ok: true; orderNumber: string }>(`/api/orders/${encodeURIComponent(orderNumber)}/confirm`, {
        method: "POST",
        body: JSON.stringify({ shipping }),
      }),
  },
  // Saved shipping addresses. Backs the Profile page's address form and
  // gives checkout something to prefill from.
  addresses: {
    list: () => request<{ addresses: AddressDto[] }>("/api/addresses"),
    create: (data: AddressInput) => request<{ addresses: AddressDto[] }>("/api/addresses", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Partial<AddressInput>) =>
      request<{ addresses: AddressDto[] }>(`/api/addresses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<{ addresses: AddressDto[] }>(`/api/addresses/${id}`, { method: "DELETE" }),
    setDefault: (id: number) => request<{ addresses: AddressDto[] }>(`/api/addresses/${id}/default`, { method: "POST" }),
  },
  // One call for the whole homepage. Replaces four separate requests, and
  // queries each carousel directly so a section is never truncated by the
  // products endpoint's page limit.
  homepage: {
    get: () => request<HomepagePayload>("/api/homepage"),
  },
  categories: {
    list: () => request<{ categories: CategoryDto[] }>("/api/categories"),
  },
  siteSettings: {
    get: () => request<{ settings: Record<string, string> }>("/api/site-settings"),
  },
  featuredReviews: {
    list: () => request<{ reviews: FeaturedReviewDto[] }>("/api/featured-reviews"),
  },
  newsletter: {
    subscribe: (email: string) =>
      request<{ ok: true; alreadySubscribed: boolean }>("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) }),
  },
  // Public catalog — the admin panel is the source of truth for products;
  // this reads whatever's live there. Only reachable when this build is
  // served from a real host that can reach the backend (see the CSP note
  // at the top of this file) — the App component falls back to its
  // built-in placeholder catalog whenever this fails, e.g. in the
  // sandboxed artifact preview.
  products: {
    list: (params?: { category?: string; limit?: number; page?: number }) => {
      const qs = new URLSearchParams();
      if (params?.category) qs.set("category", params.category);
      if (params?.limit) qs.set("limit", String(params.limit));
      if (params?.page) qs.set("page", String(params.page));
      const suffix = qs.toString() ? `?${qs.toString()}` : "";
      return request<{ products: ProductDto[]; page: number; limit: number; total: number }>(`/api/products${suffix}`);
    },
  },
  reviews: {
    // Public — anyone can read a product's live, verified-purchase reviews.
    list: (productName: string) =>
      request<{ reviews: ReviewDto[]; count: number; average: number | null }>(
        `/api/reviews/product/${encodeURIComponent(productName)}`
      ),
    // Auth required — delivered order items this user hasn't reviewed yet.
    // This is what powers the "Write a Review" prompt in My Orders, standing
    // in for the "please review your order" email until real email sending
    // is wired up with a provider.
    reviewable: () => request<{ reviewable: ReviewableItemDto[] }>("/api/reviews/reviewable"),
    create: (data: { orderId: number; productName: string; rating: number; comment: string }) =>
      request<{ review: ReviewDto }>("/api/reviews", { method: "POST", body: JSON.stringify(data) }),
  },
  uploads: {
    // Customer-scoped image upload — used by the "raise a complaint" form.
    image: (file: File) => uploadFile("/api/uploads", file),
  },
  complaints: {
    list: () => request<{ complaints: ComplaintDto[] }>("/api/complaints"),
    create: (orderNumber: string, data: { productName?: string; description: string; images?: string[]; phone: string }) =>
      request<{ complaint: ComplaintDto }>(`/api/complaints/${encodeURIComponent(orderNumber)}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};

export type CartItemDto = { id: number; product_name: string; product_price: number; product_image: string | null; quantity: number };
export type WishlistItemDto = { id: number; product_name: string; product_price: number; product_image: string | null };
export type OrderSummaryDto = { id: number; order_number: string; status: string; total_amount: number; currency_code: string; created_at: string };
export type OrderDto = OrderSummaryDto & {
  user_id: number;
  created_by_admin?: boolean | number;
  custom_note?: string | null;
  shipping_name: string;
  shipping_phone?: string | null;
  shipping_line1: string;
  shipping_line2: string | null;
  shipping_city: string;
  shipping_state: string | null;
  shipping_postal_code: string | null;
  shipping_country: string;
  promo_code?: string | null;
  discount_amount?: number | null;
  updated_at: string;
};
export type OrderItemDto = { product_name: string; product_price: number; quantity: number; product_image?: string | null };
export type OrderHistoryDto = { status: string; note: string | null; created_at: string };
export type ReviewDto = { id: number; rating: number; comment: string; reviewer_name: string; created_at: string };
export type ProductDto = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  description: string;
  materialsCare: string;
  shippingReturns: string;
  images: string[];
  videos: string[];
  colors: string[];
  bg: string;
  isBestseller: boolean;
  isNewArrival: boolean;
  isFeatured: boolean;
  isSpotlight: boolean;
  stock: number;
  active: boolean;
};
export type ReviewableItemDto = {
  order_id: number;
  order_number: string;
  delivered_at: string;
  product_name: string;
  product_price: number;
};
export type ShippingInput = {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
};
export type CategoryDto = { id: number; name: string; slug: string; imageUrl: string };
export type AddressDto = {
  id: number;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postalCode: string | null;
  country: string;
  isDefault: boolean;
  createdAt: string;
};
export type AddressInput = {
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  // Optional because the store ships worldwide and not every country has a
  // meaningful subdivision or a postal code — the API applies the same rule.
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
};
// Trimmed product shape used by homepage carousels — the detail view fetches
// the full product when a card is opened.
export type ProductCardDto = Pick<
  ProductDto,
  "id" | "slug" | "name" | "category" | "price" | "mrp" | "rating" | "images" | "colors" | "bg" | "isBestseller" | "isNewArrival" | "isFeatured" | "isSpotlight" | "stock"
>;
export type HomepageSectionKey = "topPicks" | "shopByTrend" | "newArrivals" | "spotlight";
export type HomepageImageSlot = "hero" | "heritageBanner" | "storeVisitBanner";
export type HomepagePayload = {
  images: Record<HomepageImageSlot, string[]>;
  // Optional per-slot images for narrow screens; empty means "use `images`".
  imagesMobile?: Record<HomepageImageSlot, string[]>;
  categories: CategoryDto[];
  sections: Record<HomepageSectionKey, ProductCardDto[]>;
  featuredReviews: FeaturedReviewDto[];
  settings: { materials_care: string; shipping_returns: string };
};
export type FeaturedReviewDto = { id: number; reviewer_name: string; rating: number; comment: string; product_name: string | null };
export type ComplaintDto = {
  id: number;
  order_id: number;
  order_number: string;
  user_id: number;
  product_name: string | null;
  description: string;
  images: string[];
  phone: string;
  status: "open" | "in_progress" | "resolved" | "rejected";
  created_at: string;
  updated_at: string;
};
