// Thin fetch wrapper for the admin API — mirrors src/lib/api.ts but talks to
// the /api/admin/* routes, which use a separate admin_session cookie (see
// beauty-of-beads-worker/src/lib/auth.js) so being logged in as a customer
// on the same browser never grants admin access and vice versa.
function readViteEnv(key: "VITE_API_BASE"): string {
  return (import.meta as { env?: Record<string, string> }).env?.[key] || "";
}
const API_BASE = readViteEnv("VITE_API_BASE") || "https://beauty-of-beads-api.vyasmittal1206.workers.dev";

export class AdminApiError extends Error {
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
    headers: options.body instanceof FormData ? options.headers : { "Content-Type": "application/json", ...(options.headers || {}) },
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
    throw new AdminApiError(message, res.status);
  }
  return body as T;
}

export type AdminUser = { id: number; name: string; email: string };

export type AdminProduct = {
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
  createdAt: string;
  updatedAt: string;
};

export type AdminOrder = {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  currency_code: string;
  promo_code: string | null;
  discount_amount: number;
  customer_name: string;
  customer_email: string;
  created_by_admin?: number | boolean;
  created_at: string;
  updated_at: string;
};

export type AdminOrderDetail = {
  order: AdminOrder & {
    shipping_name: string;
    shipping_phone: string | null;
    shipping_line1: string;
    shipping_line2: string | null;
    shipping_city: string;
    shipping_state: string | null;
    shipping_postal_code: string | null;
    shipping_country: string;
    custom_note: string | null;
  };
  items: { product_name: string; product_price: number; quantity: number; product_image?: string | null }[];
  history: { status: string; note: string | null; created_at: string }[];
  stages: string[];
};

export type AdminCustomer = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
  order_count: number;
  lifetime_value: number;
};

export type AdminReview = {
  id: number;
  user_id: number;
  order_id: number;
  product_name: string;
  rating: number;
  comment: string;
  reviewer_name: string;
  created_at: string;
};

export type AdminPromoCode = {
  id: number;
  code: string;
  type: "percent" | "flat";
  value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  usage_limit: number | null;
  used_count: number;
  active: boolean | number;
  expires_at: string | null;
  created_at: string;
};

// What the create/update endpoints accept (camelCase, matches the worker's
// zod schema) — distinct from AdminPromoCode, which mirrors the DB row
// (snake_case) as returned by GET.
export type PromoCodeInput = {
  code?: string;
  type?: "percent" | "flat";
  value?: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number | null;
  usageLimit?: number | null;
  active?: boolean;
  expiresAt?: string | null;
};

export type AdminCategory = { id: number; name: string; slug: string; imageUrl: string; sortOrder: number };
export type HomepageSectionKey = "topPicks" | "shopByTrend" | "newArrivals" | "spotlight";
export type HomepageImageSlot = "hero" | "heritageBanner" | "storeVisitBanner";
export type AdminPickerProduct = { id: number; name: string; category: string; price: number; image: string; active: boolean };
// One entry per homepage section, in the exact order the storefront renders
// them — the editor builds its cards straight from this so the two can't drift.
export type HomepageLayoutEntry = {
  key: string;
  kind: "images" | "categories" | "products";
  title: string;
  help: string;
};
export type AdminHomepage = {
  layout: HomepageLayoutEntry[];
  images: Record<HomepageImageSlot, string[]>;
  categories: AdminCategory[];
  sections: Record<HomepageSectionKey, AdminPickerProduct[]>;
  allProducts: AdminPickerProduct[];
  maxImagesPerSlot: number;
};
export type AdminFeaturedReview = {
  id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  product_name: string | null;
  sort_order: number;
  created_at: string;
};

export type AdminComplaint = {
  id: number;
  order_id: number;
  order_number: string;
  user_id: number;
  customer_name: string;
  customer_email: string;
  product_name: string | null;
  description: string;
  images: string[];
  phone: string;
  status: "open" | "in_progress" | "resolved" | "rejected";
  created_at: string;
  updated_at: string;
};

export type AdminAnalytics = {
  orderCount: number;
  revenue: number;
  customerCount: number;
  byStatus: { status: string; count: number }[];
  topProducts: { productName: string; unitsSold: number; revenue: number }[];
  recentOrders: { order_number: string; total_amount: number; status: string; created_at: string }[];
};

export const adminApi = {
  auth: {
    login: (email: string, password: string) => request<{ admin: AdminUser; idleTimeoutMs?: number }>("/api/admin/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
    logout: () => request<{ ok: true }>("/api/admin/auth/logout", { method: "POST" }),
    me: () => request<{ admin: AdminUser; idleTimeoutMs?: number }>("/api/admin/auth/me"),
    setup: (data: { setupKey: string; name: string; email: string; password: string }) =>
      request<{ admin: AdminUser }>("/api/admin/auth/setup", { method: "POST", body: JSON.stringify(data) }),
  },
  products: {
    list: () => request<{ products: AdminProduct[] }>("/api/admin/products"),
    get: (id: number) => request<{ product: AdminProduct }>(`/api/admin/products/${id}`),
    create: (data: Partial<AdminProduct>) => request<{ product: AdminProduct }>("/api/admin/products", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Partial<AdminProduct>) => request<{ product: AdminProduct }>(`/api/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number, hard?: boolean) => request<{ ok: true }>(`/api/admin/products/${id}${hard ? "?hard=1" : ""}`, { method: "DELETE" }),
    upload: (file: File) => {
      const form = new FormData();
      form.append("file", file);
      return request<{ url: string; key: string }>("/api/admin/products/upload", { method: "POST", body: form });
    },
  },
  orders: {
    list: (status?: string) => request<{ orders: AdminOrder[]; stages: string[] }>(`/api/admin/orders${status ? `?status=${status}` : ""}`),
    get: (id: number) => request<AdminOrderDetail>(`/api/admin/orders/${id}`),
    setStatus: (id: number, status: string, note?: string) =>
      request<{ ok: true; status: string }>(`/api/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status, note }) }),
    resendDeliveryEmail: (id: number) => request<{ ok: true }>(`/api/admin/orders/${id}/resend-delivery-email`, { method: "POST" }),
  },
  customers: {
    list: () => request<{ customers: AdminCustomer[] }>("/api/admin/customers"),
    orders: (id: number) => request<{ orders: AdminOrder[] }>(`/api/admin/customers/${id}/orders`),
    createCustomOrder: (id: number, data: { items: { productName: string; productPrice: number; quantity?: number }[]; note?: string }) =>
      request<{ orderNumber: string; orderId: number; totalAmount: number }>(`/api/admin/customers/${id}/custom-order`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  categories: {
    list: () => request<{ categories: AdminCategory[] }>("/api/admin/categories"),
    create: (data: { name: string; imageUrl?: string; sortOrder?: number }) =>
      request<{ category: AdminCategory }>("/api/admin/categories", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Partial<{ name: string; imageUrl: string; sortOrder: number }>) =>
      request<{ category: AdminCategory }>(`/api/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<{ ok: true }>(`/api/admin/categories/${id}`, { method: "DELETE" }),
  },
  // Backs the Website Editor's homepage view: the whole homepage in one GET,
  // then one PUT per section.
  homepage: {
    get: () => request<AdminHomepage>("/api/admin/homepage"),
    setImages: (slot: HomepageImageSlot, images: string[]) =>
      request<{ images: string[] }>(`/api/admin/homepage/images/${slot}`, { method: "PUT", body: JSON.stringify({ images }) }),
    // Sets membership and order together — saving them separately could
    // leave a section half-applied if the second call failed.
    setSection: (key: HomepageSectionKey, productIds: number[]) =>
      request<{ products: AdminPickerProduct[] }>(`/api/admin/homepage/sections/${key}`, {
        method: "PUT",
        body: JSON.stringify({ productIds }),
      }),
    setCategoryOrder: (categoryIds: number[]) =>
      request<{ categories: AdminCategory[] }>("/api/admin/homepage/categories/order", {
        method: "PUT",
        body: JSON.stringify({ categoryIds }),
      }),
  },
  siteSettings: {
    get: () => request<{ settings: Record<string, string> }>("/api/admin/site-settings"),
    update: (data: Record<string, string>) =>
      request<{ settings: Record<string, string> }>("/api/admin/site-settings", { method: "PUT", body: JSON.stringify(data) }),
  },
  featuredReviews: {
    list: () => request<{ reviews: AdminFeaturedReview[] }>("/api/admin/featured-reviews"),
    create: (data: { reviewerName: string; rating: number; comment: string; productName?: string; sortOrder?: number }) =>
      request<{ review: AdminFeaturedReview }>("/api/admin/featured-reviews", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: Partial<{ reviewerName: string; rating: number; comment: string; productName: string; sortOrder: number }>) =>
      request<{ review: AdminFeaturedReview }>(`/api/admin/featured-reviews/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<{ ok: true }>(`/api/admin/featured-reviews/${id}`, { method: "DELETE" }),
  },
  reviews: {
    list: (product?: string) => request<{ reviews: AdminReview[] }>(`/api/admin/reviews${product ? `?product=${encodeURIComponent(product)}` : ""}`),
    remove: (id: number) => request<{ ok: true }>(`/api/admin/reviews/${id}`, { method: "DELETE" }),
  },
  promoCodes: {
    list: () => request<{ promoCodes: AdminPromoCode[] }>("/api/admin/promo-codes"),
    create: (data: PromoCodeInput) => request<{ promoCode: AdminPromoCode }>("/api/admin/promo-codes", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: PromoCodeInput) => request<{ promoCode: AdminPromoCode }>(`/api/admin/promo-codes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    remove: (id: number) => request<{ ok: true }>(`/api/admin/promo-codes/${id}`, { method: "DELETE" }),
  },
  analytics: {
    get: () => request<AdminAnalytics>("/api/admin/analytics"),
  },
  complaints: {
    list: (status?: string) => request<{ complaints: AdminComplaint[] }>(`/api/admin/complaints${status ? `?status=${status}` : ""}`),
    setStatus: (id: number, status: AdminComplaint["status"]) =>
      request<{ complaint: AdminComplaint }>(`/api/admin/complaints/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  },
};
