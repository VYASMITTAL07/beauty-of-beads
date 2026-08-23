import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth, ApiError } from "@/context/AuthContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
// Imported as files rather than an inline data: URI — as base64 this single
// logo was ~426KB of the JavaScript bundle, parsed on every page load.
// logo-mark.png is the full-size master and is deliberately NOT imported:
// these -2x derivatives are sized for the 144px the footer actually renders,
// and only imported files are bundled.
import logoMarkPng from "@/assets/logo-mark-2x.png";
import logoMarkWebp from "@/assets/logo-mark-2x.webp";
import { AuthModal } from "@/components/store/AuthModal";
import {
  api,
  type CartItemDto,
  type WishlistItemDto,
  type OrderSummaryDto,
  type OrderDto,
  type OrderItemDto,
  type OrderHistoryDto,
  type ReviewDto,
  type ProductDto,
  type ShippingInput,
  type AddressDto,
  type ProductCardDto,
  type HomepagePayload,
  type HomepageSectionKey,
} from "@/lib/api";
import { SCRAPED_PRODUCTS } from "@/data/scrapedProducts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Star,
  AtSign,
  MessageCircle,
  ThumbsUp,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Truck,
  ShieldCheck,
  Award,
  Gift,
  Globe,
  Share2,
  Sparkles,
  MapPin,
  Package,
  Phone,
  Mail,
  Check,
  AlertCircle,
  CalendarDays,
  CircleCheck,
} from "lucide-react";

// ---------- Decorative bead-strand graphic (stand-in for product photography) ----------
function BeadStrand({
  colors,
  bg,
  size = 16,
  variant = "a",
  rotateDeg,
}: {
  colors: string[];
  bg: string;
  size?: number;
  variant?: "a" | "b";
  rotateDeg?: number;
}) {
  const count = colors.length;
  const rotate = rotateDeg ?? (variant === "b" ? 180 : 0);
  const orderedColors = variant === "b" ? [...colors].reverse() : colors;
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: bg }}
    >
      <svg viewBox="0 0 200 200" className="h-[78%] w-[78%]">
        <g transform={`rotate(${rotate} 100 100)`}>
          {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
            const r = 62;
            const cx = 100 + Math.cos(angle) * r;
            const cy = 100 + Math.sin(angle) * r * 0.86 + 6;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={size - (i % 3 === 0 ? 2 : 0)}
                fill={orderedColors[i % orderedColors.length]}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="1"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// ---------- Stylised payment-method marks (footer "we accept" row) ----------
// ---------- Brand logo mark — single-line illustration, redrawn from the client's own logo ----------
function PaymentIcon({ type }: { type: "visa" | "mastercard" | "upi" | "paytm" | "gpay" }) {
  const base = "flex h-7 w-11 items-center justify-center rounded-sm bg-white shadow-sm";
  if (type === "visa") {
    return (
      <div className={base}>
        <span className="font-serif text-[13px] font-bold italic tracking-tight text-[#1A1F71]">VISA</span>
      </div>
    );
  }
  if (type === "mastercard") {
    return (
      <div className={base}>
        <svg viewBox="0 0 36 22" className="h-4 w-6">
          <circle cx="14" cy="11" r="9" fill="#EB001B" />
          <circle cx="22" cy="11" r="9" fill="#F79E1B" fillOpacity="0.9" />
        </svg>
      </div>
    );
  }
  if (type === "upi") {
    return (
      <div className={base}>
        <span className="text-[11px] font-bold tracking-tight">
          <span style={{ color: "#F58220" }}>U</span>
          <span style={{ color: "#5F259F" }}>P</span>
          <span style={{ color: "#097939" }}>I</span>
        </span>
      </div>
    );
  }
  if (type === "paytm") {
    return (
      <div className={base}>
        <span className="font-serif text-[10px] font-bold italic">
          <span style={{ color: "#00B9F1" }}>pay</span>
          <span style={{ color: "#002E6E" }}>tm</span>
        </span>
      </div>
    );
  }
  return (
    <div className={base}>
      <span className="text-[11px] font-semibold tracking-tight">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>P</span>
        <span style={{ color: "#FBBC05" }}>a</span>
        <span style={{ color: "#34A853" }}>y</span>
      </span>
    </div>
  );
}

type Product = {
  name: string;
  category: string;
  price: number;
  mrp: number;
  rating: number;
  colors: string[];
  bg: string;
  tag?: string;
  // Populated once real products are fetched from the admin-managed catalog
  // (see `useLiveCatalog` below) — undefined for the built-in placeholder
  // catalog used as a fallback when the backend isn't reachable.
  slug?: string;
  images?: string[];
  videos?: string[];
  description?: string;
  materialsCare?: string;
  shippingReturns?: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isSpotlight?: boolean;
  // Real, admin-entered colour-variant labels (e.g. "Rose Gold", "Black") for the
  // product detail page's colour selector — only set when the admin actually added
  // some. Deliberately separate from `colors` above, which is always non-empty
  // (falls back to decorative hex swatches for the BeadStrand placeholder graphic)
  // and must never be shown to a shopper as if it were a real colour option.
  colorOptions?: string[];
};

// Converts a backend ProductDto (admin-managed, camelCase) into the shape
// the storefront has always used internally, deriving `tag` and `bg`/`colors`
// fallbacks the same way the placeholder catalog did.
// Homepage carousels are served a trimmed card shape (no long-form copy, one
// image) — enough to render a card, and the full product is fetched when the
// card is opened.
function cardDtoToProduct(d: ProductCardDto): Product {
  return {
    name: d.name,
    category: d.category,
    price: d.price,
    mrp: d.mrp,
    rating: d.rating,
    colors: d.colors.length ? d.colors : ["#C1653A", "#DDBB6E", "#F1E4D3"],
    bg: d.bg || "linear-gradient(135deg,#F1E4D3,#E4D3BE)",
    tag: d.isBestseller ? "Bestseller" : d.isNewArrival ? "New Arrival" : undefined,
    slug: d.slug,
    images: d.images,
    isBestseller: d.isBestseller,
    isNewArrival: d.isNewArrival,
    isFeatured: d.isFeatured,
    isSpotlight: d.isSpotlight,
    colorOptions: d.colors.length ? d.colors : undefined,
  };
}

function dtoToProduct(d: ProductDto): Product {
  return {
    name: d.name,
    category: d.category,
    price: d.price,
    mrp: d.mrp,
    rating: d.rating,
    colors: d.colors.length ? d.colors : ["#C1653A", "#DDBB6E", "#F1E4D3"],
    bg: d.bg || "linear-gradient(135deg,#F1E4D3,#E4D3BE)",
    tag: d.isBestseller ? "Bestseller" : d.isNewArrival ? "New Arrival" : undefined,
    slug: d.slug,
    images: d.images,
    videos: d.videos,
    description: d.description || undefined,
    materialsCare: d.materialsCare || undefined,
    shippingReturns: d.shippingReturns || undefined,
    isBestseller: d.isBestseller,
    isNewArrival: d.isNewArrival,
    isFeatured: d.isFeatured,
    isSpotlight: d.isSpotlight,
    colorOptions: d.colors.length ? d.colors : undefined,
  };
}

const TOP_PICKS: Product[] = [
  { name: "Customised Initial Hair Pin", category: "Hair Accessories", price: 249, mrp: 349, rating: 4.7, colors: ["#C1653A", "#DDBB6E", "#F1E4D3"], bg: "linear-gradient(135deg,#F6E7D8,#EAD3B8)", tag: "Bestseller" },
  { name: "Charm Beaded Hair Clip", category: "Hair Accessories", price: 199, mrp: 299, rating: 4.6, colors: ["#FAF3EA", "#C79A3E", "#6B7658"], bg: "linear-gradient(135deg,#EFE3D2,#E4D3BE)" },
  { name: "Shree Traditional Juda Pin", category: "Traditional Accessories", price: 379, mrp: 549, rating: 4.8, colors: ["#833E20", "#DDBB6E", "#F1E4D3"], bg: "linear-gradient(135deg,#EFDDC7,#E2C6A5)" },
  { name: "Aesthetic Beaded Hair Chain", category: "Hair Chains", price: 429, mrp: 599, rating: 4.7, colors: ["#4B5540", "#6B7658", "#DDBB6E"], bg: "linear-gradient(135deg,#E4E6D9,#D3D8C2)", tag: "New Arrival" },
  { name: "Rashi Beaded Hair Chain", category: "Hair Chains", price: 399, mrp: 549, rating: 4.5, colors: ["#C79A3E", "#833E20", "#F1E4D3"], bg: "linear-gradient(135deg,#F1E1C4,#E3C593)" },
  { name: "Thistle Resin Earrings", category: "Resin Jewellery", price: 299, mrp: 449, rating: 4.9, colors: ["#C1653A", "#F1E4D3", "#833E20"], bg: "linear-gradient(135deg,#F5E6D6,#E9CDAF)", tag: "Bestseller" },
  { name: "Jasper Beaded Hair Bow", category: "Bow", price: 279, mrp: 399, rating: 4.6, colors: ["#6B7658", "#E4E6D9", "#C79A3E"], bg: "linear-gradient(135deg,#E9EBDE,#D7DBC7)" },
];

const FEATURED_PRODUCTS: Product[] = [
  { name: "Fiery Bird Hair Pins", category: "Hair Pins", price: 249, mrp: 349, rating: 4.6, colors: ["#C1653A", "#DDBB6E", "#833E20"], bg: "linear-gradient(135deg,#F3E2CC,#E7CE9C)" },
  { name: "Heartfelt Beaded Hairpin", category: "Hair Pins", price: 199, mrp: 299, rating: 4.7, colors: ["#6B7658", "#F1E4D3", "#C79A3E"], bg: "linear-gradient(135deg,#E9EBDE,#D3D8C2)" },
  { name: "Amethyst Resin Hair Pins", category: "Resin Jewellery", price: 329, mrp: 469, rating: 4.8, colors: ["#4B5540", "#DDBB6E", "#F1E4D3"], bg: "linear-gradient(135deg,#E4E6D9,#D7DBC7)" },
  { name: "Glam Beaded Hair Brooch", category: "Hair Brooch", price: 349, mrp: 499, rating: 4.5, colors: ["#833E20", "#C1653A", "#DDBB6E"], bg: "linear-gradient(135deg,#EFDDC7,#E2C6A5)", tag: "New Arrival" },
  { name: "Bespoke Personalised Name Pin", category: "Initial Name Pins", price: 399, mrp: 599, rating: 4.9, colors: ["#C79A3E", "#833E20", "#F1E4D3"], bg: "linear-gradient(135deg,#F1E1C4,#E3C593)", tag: "Bestseller" },
  { name: "Advaya Traditional Bun Pin", category: "Traditional Accessories", price: 449, mrp: 649, rating: 4.6, colors: ["#A34F2B", "#6B7658", "#DDBB6E"], bg: "linear-gradient(135deg,#EFDDC7,#E2C6A5)" },
  { name: "Lamzones Resin Hair Pins", category: "Resin Jewellery", price: 279, mrp: 399, rating: 4.7, colors: ["#DDBB6E", "#4B5540", "#C1653A"], bg: "linear-gradient(135deg,#F3E5C8,#E7CE9C)" },
  { name: "Radiant Flutter Butterfly Clip", category: "Hair Vein", price: 229, mrp: 329, rating: 4.8, colors: ["#C1653A", "#F1E4D3", "#6B7658"], bg: "linear-gradient(135deg,#F5E6D6,#E9CDAF)" },
];

const NEW_ARRIVALS: Product[] = [
  { name: "Wildflower Beaded Scrunchie", category: "Hair Accessories", price: 229, mrp: 329, rating: 4.6, colors: ["#6B7658", "#DDBB6E", "#F1E4D3"], bg: "linear-gradient(135deg,#E9EBDE,#D3D8C2)" },
  { name: "Sunkissed Resin Hoops", category: "Resin Jewellery", price: 319, mrp: 459, rating: 4.7, colors: ["#C79A3E", "#833E20", "#F1E4D3"], bg: "linear-gradient(135deg,#F1E1C4,#E3C593)" },
  { name: "Meadow Beaded Anklet", category: "Jewellery", price: 269, mrp: 389, rating: 4.5, colors: ["#4B5540", "#6B7658", "#DDBB6E"], bg: "linear-gradient(135deg,#E4E6D9,#D7DBC7)" },
  { name: "Opal Charm Hair Clip", category: "Hair Accessories", price: 249, mrp: 359, rating: 4.8, colors: ["#FAF3EA", "#C1653A", "#6B7658"], bg: "linear-gradient(135deg,#EFE3D2,#E4D3BE)" },
  { name: "Terracotta Beaded Kalira", category: "Kaliras", price: 449, mrp: 649, rating: 4.7, colors: ["#833E20", "#DDBB6E", "#F1E4D3"], bg: "linear-gradient(135deg,#EFDDC7,#E2C6A5)" },
  { name: "Ivory Pearl Bun Pin", category: "Traditional Accessories", price: 299, mrp: 429, rating: 4.6, colors: ["#F1E4D3", "#C79A3E", "#4B5540"], bg: "linear-gradient(135deg,#F5E6D6,#E9CDAF)" },
];

const SPOTLIGHT_PICKS: Product[] = [
  { name: "Charm Beaded Hair Clip", category: "Hair Accessories", price: 199, mrp: 299, rating: 4.6, colors: ["#FAF3EA", "#C79A3E", "#6B7658"], bg: "linear-gradient(135deg,#EFE3D2,#E4D3BE)" },
  { name: "Thistle Resin Earrings", category: "Resin Jewellery", price: 299, mrp: 449, rating: 4.9, colors: ["#C1653A", "#F1E4D3", "#833E20"], bg: "linear-gradient(135deg,#F5E6D6,#E9CDAF)" },
  { name: "Radiant Flutter Butterfly Clip", category: "Hair Vein", price: 229, mrp: 329, rating: 4.8, colors: ["#C1653A", "#F1E4D3", "#6B7658"], bg: "linear-gradient(135deg,#F5E6D6,#E9CDAF)" },
  { name: "Glam Beaded Hair Brooch", category: "Hair Brooch", price: 349, mrp: 499, rating: 4.5, colors: ["#833E20", "#C1653A", "#DDBB6E"], bg: "linear-gradient(135deg,#EFDDC7,#E2C6A5)" },
  { name: "Bespoke Personalised Name Pin", category: "Initial Name Pins", price: 399, mrp: 599, rating: 4.9, colors: ["#C79A3E", "#833E20", "#F1E4D3"], bg: "linear-gradient(135deg,#F1E1C4,#E3C593)" },
  { name: "Advaya Traditional Bun Pin", category: "Traditional Accessories", price: 449, mrp: 649, rating: 4.6, colors: ["#A34F2B", "#6B7658", "#DDBB6E"], bg: "linear-gradient(135deg,#EFDDC7,#E2C6A5)" },
  { name: "Lamzones Resin Hair Pins", category: "Resin Jewellery", price: 279, mrp: 399, rating: 4.7, colors: ["#DDBB6E", "#4B5540", "#C1653A"], bg: "linear-gradient(135deg,#F3E5C8,#E7CE9C)" },
  { name: "Jasper Beaded Hair Bow", category: "Bow", price: 279, mrp: 399, rating: 4.6, colors: ["#6B7658", "#E4E6D9", "#C79A3E"], bg: "linear-gradient(135deg,#E9EBDE,#D7DBC7)" },
  { name: "Rashi Beaded Hair Chain", category: "Hair Chains", price: 399, mrp: 549, rating: 4.5, colors: ["#C79A3E", "#833E20", "#F1E4D3"], bg: "linear-gradient(135deg,#F1E1C4,#E3C593)" },
  { name: "Meadow Beaded Anklet", category: "Jewellery", price: 269, mrp: 389, rating: 4.5, colors: ["#4B5540", "#6B7658", "#DDBB6E"], bg: "linear-gradient(135deg,#E4E6D9,#D7DBC7)" },
];

const ALL_PRODUCTS: Product[] = (() => {
  // Real catalog scraped from the old storefront (beautyofbeadsbykhushi.com) at the
  // owner's request, layered in behind the hand-picked homepage sections above so
  // "Shop All" / category browsing / search show the full real catalog while the
  // curated homepage carousels keep their original marketing copy untouched.
  const combined: Product[] = [...TOP_PICKS, ...FEATURED_PRODUCTS, ...NEW_ARRIVALS, ...(SCRAPED_PRODUCTS as Product[])];
  const seen = new Set<string>();
  return combined.filter((p) => {
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });
})();

const SHOP_BY_TYPE = [
  { name: "Aaria Beaded Drop Earrings", price: 169, mrp: 249, colors: ["#C1653A", "#DDBB6E", "#F1E4D3"], bg: "#F1E4D3" },
  { name: "Meher Adjustable Ring", price: 219, mrp: 329, colors: ["#6B7658", "#C79A3E", "#E4E6D9"], bg: "#E4E6D9" },
  { name: "Kavya Layered Necklace", price: 389, mrp: 549, colors: ["#833E20", "#DDBB6E", "#F1E4D3"], bg: "#EAD3B8" },
  { name: "Anaya Beaded Bracelet", price: 245, mrp: 349, colors: ["#DDBB6E", "#4B5540", "#C1653A"], bg: "#E3C593" },
];

const VIDEO_PICKS = [
  { name: "GRWM ft. Beaded Hair Pins", colors: ["#C1653A", "#DDBB6E", "#F1E4D3"], thumbBg: "#F1E4D3", bg: "linear-gradient(160deg,#3A2E22,#833E20)" },
  { name: "Layered Necklace Try-On", colors: ["#4B5540", "#6B7658", "#DDBB6E"], thumbBg: "#E4E6D9", bg: "linear-gradient(160deg,#2E3524,#4B5540)" },
  { name: "Festive Bridal Look", colors: ["#833E20", "#C79A3E", "#F1E4D3"], thumbBg: "#EAD3B8", bg: "linear-gradient(160deg,#3A2E22,#6B4A2E)" },
  { name: "Bead Chain Styling Tips", colors: ["#C79A3E", "#833E20", "#DDBB6E"], thumbBg: "#F1E1C4", bg: "linear-gradient(160deg,#2E3524,#6B7658)" },
  { name: "Everyday Earring Edit", colors: ["#C1653A", "#F1E4D3", "#6B7658"], thumbBg: "#F5E6D6", bg: "linear-gradient(160deg,#3A2E22,#833E20)" },
  { name: "Traditional Juda Pin Reel", colors: ["#DDBB6E", "#4B5540", "#C1653A"], thumbBg: "#E3C593", bg: "linear-gradient(160deg,#2E3524,#4B5540)" },
];

const INSTAGRAM_PICKS = [
  { name: "Behind the Scenes: Beading", colors: ["#C1653A", "#DDBB6E", "#F1E4D3"], thumbBg: "#F1E4D3", bg: "linear-gradient(160deg,#3A2E22,#833E20)" },
  { name: "New Season Drop", colors: ["#4B5540", "#6B7658", "#DDBB6E"], thumbBg: "#E4E6D9", bg: "linear-gradient(160deg,#2E3524,#4B5540)" },
  { name: "Customer Unboxing", colors: ["#833E20", "#C79A3E", "#F1E4D3"], thumbBg: "#EAD3B8", bg: "linear-gradient(160deg,#3A2E22,#6B4A2E)" },
  { name: "Studio Diaries", colors: ["#C79A3E", "#833E20", "#DDBB6E"], thumbBg: "#F1E1C4", bg: "linear-gradient(160deg,#2E3524,#6B7658)" },
  { name: "Styling Reel", colors: ["#C1653A", "#F1E4D3", "#6B7658"], thumbBg: "#F5E6D6", bg: "linear-gradient(160deg,#3A2E22,#833E20)" },
  { name: "Festive Edit", colors: ["#DDBB6E", "#4B5540", "#C1653A"], thumbBg: "#E3C593", bg: "linear-gradient(160deg,#2E3524,#4B5540)" },
  { name: "Packaging Peek", colors: ["#6B7658", "#E4E6D9", "#C79A3E"], thumbBg: "#E9EBDE", bg: "linear-gradient(160deg,#3A2E22,#6B4A2E)" },
  { name: "Client Love", colors: ["#833E20", "#DDBB6E", "#F1E4D3"], thumbBg: "#EAD3B8", bg: "linear-gradient(160deg,#2E3524,#6B7658)" },
];

const FAQS = [
  { q: "How long does shipping take?", a: "Orders are dispatched within 1-2 business days and typically arrive within 4-7 business days across India." },
  { q: "Do you offer Cash on Delivery?", a: "No, we currently do not offer Cash on Delivery. All orders are prepaid — you can pay securely via UPI, cards, or net banking at checkout." },
  { q: "Can I return or exchange a product?", a: "As every piece is handmade and made-to-order, we do not accept returns or exchanges. Please check the product details carefully before placing your order." },
  { q: "How do I take care of my jewellery?", a: "Keep your pieces away from water, perfume, and direct sunlight. Store them in a dry pouch when not in use to keep the beads and finish looking new." },
  { q: "Do you offer customisation?", a: "Yes! Many of our pieces, like initial hair pins and name pins, can be personalised. Message us with your requirements before placing an order." },
];

const REVIEWS = [
  { name: "Priya Sharma", rating: 5, text: "The bead quality is stunning and the colors are exactly like the photos. My juda pin gets compliments every single time I wear it." },
  { name: "Ananya Kapoor", rating: 5, text: "Ordered the layered necklace for a wedding and it made the whole outfit. Beautifully packaged too — felt like a proper gift." },
  { name: "Meher Iyer", rating: 4, text: "Love how lightweight the earrings are for daily wear. Fast delivery and the customer support team was super helpful with sizing." },
  { name: "Radhika Menon", rating: 5, text: "Been buying from Beauty of Beads for over a year now. Consistent quality, gorgeous designs, and prices that actually make sense." },
  { name: "Kavya Reddy", rating: 5, text: "The bracelet is so delicate and pretty in person. It's the exact product shown in the photos, which almost never happens online." },
  { name: "Ishita Verma", rating: 5, text: "My experience was amazing from browsing to checkout. Got so many compliments on the hair chain at my sister's sangeet." },
  { name: "Simran Kaur", rating: 4, text: "Great value for the price and the packaging felt very premium. Would love to see more traditional designs added soon." },
  { name: "Neha Joshi", rating: 5, text: "I always wished for accessories that look expensive without the price tag, and this brand nailed it. Shipping was quick too." },
];

const HAIR_ACCESSORY_LINKS = [
  "Initial Name Pins", "Hair Pins", "Hair Band", "Hair Vein", "Hair Chains",
  "Hair Brooch", "Traditional Accessories", "Preserved Flowers", "Bow",
];

const JEWELLERY_LINKS = [
  "Resin Jewellery", "Embroidery Jewellery", "Floral Jewellery",
  "Earcuffs / Earrings", "Hathphul", "Rings / Bracelet", "Neckpiece",
];

const RAKHI_LINKS = ["Rakhi", "Lumba"];
const HAIR_EXTENSION_LINKS = ["Clip-In Extensions", "Ponytail Extensions", "Braided Extensions"];
const KALIRA_LINKS = ["Traditional Kaliras", "Personalised Kaliras"];
const BESTSELLER_LINKS = ["Top Rated", "Trending Now", "Editor's Picks"];

const COLLECTION_GROUPS = [
  { key: "hair", label: "Hair Accessories", items: HAIR_ACCESSORY_LINKS },
  { key: "jewellery", label: "Jewellery", items: JEWELLERY_LINKS },
  { key: "rakhis", label: "Rakhis", items: RAKHI_LINKS },
  { key: "extensions", label: "Hair Extensions", items: HAIR_EXTENSION_LINKS },
  { key: "kaliras", label: "Kaliras", items: KALIRA_LINKS },
  { key: "bestsellers", label: "Best Sellers", items: BESTSELLER_LINKS },
];

const TILE_PALETTE = [
  { colors: ["#833E20", "#DDBB6E", "#F1E4D3"], bg: "#EAD3B8" },
  { colors: ["#C1653A", "#F1E4D3", "#833E20"], bg: "#F1E4D3" },
  { colors: ["#6B7658", "#C79A3E", "#E4E6D9"], bg: "#E4E6D9" },
  { colors: ["#DDBB6E", "#4B5540", "#C1653A"], bg: "#E3C593" },
  { colors: ["#A34F2B", "#DDBB6E", "#6B7658"], bg: "#EFDDC7" },
  { colors: ["#4B5540", "#6B7658", "#DDBB6E"], bg: "#D3D8C2" },
];

const FEATURED_TILES = COLLECTION_GROUPS.flatMap((g) => g.items).map((name, i) => ({
  name,
  colors: TILE_PALETTE[i % TILE_PALETTE.length].colors,
  bg: TILE_PALETTE[i % TILE_PALETTE.length].bg,
}));

type CurrencyOption = { country: string; code: string; symbol: string; rate: number; flagCode: string };

// rate = units of that currency per 1 INR (approximate, for display purposes)
const CURRENCIES: CurrencyOption[] = [
  { country: "India", code: "INR", symbol: "₹", rate: 1, flagCode: "in" },
  { country: "United States", code: "USD", symbol: "$", rate: 0.012, flagCode: "us" },
  { country: "United Kingdom", code: "GBP", symbol: "£", rate: 0.0095, flagCode: "gb" },
  { country: "United Arab Emirates", code: "AED", symbol: "AED ", rate: 0.0442, flagCode: "ae" },
  { country: "Saudi Arabia", code: "SAR", symbol: "SAR ", rate: 0.0452, flagCode: "sa" },
  { country: "Canada", code: "CAD", symbol: "C$", rate: 0.0164, flagCode: "ca" },
  { country: "Australia", code: "AUD", symbol: "A$", rate: 0.0182, flagCode: "au" },
  { country: "Singapore", code: "SGD", symbol: "S$", rate: 0.0161, flagCode: "sg" },
  { country: "Germany", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "de" },
  { country: "France", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "fr" },
  { country: "Italy", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "it" },
  { country: "Spain", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "es" },
  { country: "Netherlands", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "nl" },
  { country: "Ireland", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "ie" },
  { country: "Portugal", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "pt" },
  { country: "Belgium", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "be" },
  { country: "Austria", code: "EUR", symbol: "€", rate: 0.0111, flagCode: "at" },
  { country: "Switzerland", code: "CHF", symbol: "CHF ", rate: 0.0137, flagCode: "ch" },
  { country: "Japan", code: "JPY", symbol: "¥", rate: 1.786, flagCode: "jp" },
  { country: "China", code: "CNY", symbol: "¥", rate: 0.0855, flagCode: "cn" },
  { country: "South Korea", code: "KRW", symbol: "₩", rate: 16.6, flagCode: "kr" },
  { country: "New Zealand", code: "NZD", symbol: "NZ$", rate: 0.02, flagCode: "nz" },
  { country: "South Africa", code: "ZAR", symbol: "R", rate: 0.222, flagCode: "za" },
  { country: "Nigeria", code: "NGN", symbol: "₦", rate: 18.5, flagCode: "ng" },
  { country: "Kenya", code: "KES", symbol: "KSh", rate: 1.57, flagCode: "ke" },
  { country: "Nepal", code: "NPR", symbol: "Rs", rate: 1.6, flagCode: "np" },
  { country: "Sri Lanka", code: "LKR", symbol: "Rs", rate: 3.57, flagCode: "lk" },
  { country: "Bangladesh", code: "BDT", symbol: "৳", rate: 1.32, flagCode: "bd" },
  { country: "Pakistan", code: "PKR", symbol: "Rs", rate: 3.35, flagCode: "pk" },
  { country: "Malaysia", code: "MYR", symbol: "RM", rate: 0.0568, flagCode: "my" },
  { country: "Indonesia", code: "IDR", symbol: "Rp", rate: 190, flagCode: "id" },
  { country: "Thailand", code: "THB", symbol: "฿", rate: 0.4337, flagCode: "th" },
  { country: "Philippines", code: "PHP", symbol: "₱", rate: 0.699, flagCode: "ph" },
  { country: "Vietnam", code: "VND", symbol: "₫", rate: 301, flagCode: "vn" },
  { country: "Russia", code: "RUB", symbol: "₽", rate: 1.108, flagCode: "ru" },
  { country: "Brazil", code: "BRL", symbol: "R$", rate: 0.065, flagCode: "br" },
  { country: "Mexico", code: "MXN", symbol: "$", rate: 0.217, flagCode: "mx" },
  { country: "Turkey", code: "TRY", symbol: "₺", rate: 0.41, flagCode: "tr" },
  { country: "Israel", code: "ILS", symbol: "₪", rate: 0.044, flagCode: "il" },
  { country: "Qatar", code: "QAR", symbol: "QAR ", rate: 0.0437, flagCode: "qa" },
  { country: "Kuwait", code: "KWD", symbol: "KD ", rate: 0.00369, flagCode: "kw" },
  { country: "Oman", code: "OMR", symbol: "OMR ", rate: 0.00462, flagCode: "om" },
  { country: "Bahrain", code: "BHD", symbol: "BD ", rate: 0.00452, flagCode: "bh" },
  { country: "Egypt", code: "EGP", symbol: "E£", rate: 0.593, flagCode: "eg" },
  { country: "Sweden", code: "SEK", symbol: "kr", rate: 0.128, flagCode: "se" },
  { country: "Norway", code: "NOK", symbol: "kr", rate: 0.128, flagCode: "no" },
  { country: "Denmark", code: "DKK", symbol: "kr", rate: 0.083, flagCode: "dk" },
  { country: "Poland", code: "PLN", symbol: "zł", rate: 0.048, flagCode: "pl" },
  { country: "Hong Kong", code: "HKD", symbol: "HK$", rate: 0.0937, flagCode: "hk" },
  { country: "Taiwan", code: "TWD", symbol: "NT$", rate: 0.387, flagCode: "tw" },
];

function flagUrl(flagCode: string) {
  return `https://flagcdn.com/w40/${flagCode}.png`;
}

const CurrencyContext = createContext<{ currency: CurrencyOption; setCurrency: (c: CurrencyOption) => void }>({
  currency: CURRENCIES[0],
  setCurrency: () => {},
});

function useCurrency() {
  return useContext(CurrencyContext);
}

const NO_DECIMAL_CURRENCIES = new Set(["INR", "JPY", "KRW", "VND", "IDR"]);

function formatPrice(inrAmount: number, currency: CurrencyOption) {
  const converted = inrAmount * currency.rate;
  const decimals = NO_DECIMAL_CURRENCIES.has(currency.code) ? 0 : 2;
  return `${currency.symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

const OFFERS = [
  "Free shipping on orders above ₹3,000",
  "100% secure prepaid checkout",
  "Flat 10% off on orders above ₹5,000 for first-time orders",
  "Handcrafted with love, made to order",
];

const HERO_SLIDES = [
  { colors: ["#C1653A", "#DDBB6E", "#F1E4D3", "#833E20"], bg: "linear-gradient(135deg,#F6E7D8,#E3C593)" },
  { colors: ["#6B7658", "#E4E6D9", "#C79A3E", "#F1E4D3"], bg: "linear-gradient(135deg,#E9EBDE,#D3D8C2)" },
  { colors: ["#DDBB6E", "#A34F2B", "#C1653A", "#833E20"], bg: "linear-gradient(135deg,#F1E1C4,#E7CE9C)" },
];

const STORY_SLIDES = [
  { colors: ["#833E20", "#C79A3E", "#DDBB6E", "#F1E4D3"], bg: "linear-gradient(135deg,#EAD3B8,#C79A3E)" },
  { colors: ["#6B7658", "#4B5540", "#DDBB6E", "#E4E6D9"], bg: "linear-gradient(135deg,#E4E6D9,#8E9A7C)" },
  { colors: ["#C1653A", "#F1E4D3", "#833E20", "#DDBB6E"], bg: "linear-gradient(135deg,#F5E6D6,#DDA870)" },
];

function CartPanel({
  open,
  onOpenChange,
  items,
  currency,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  allProducts,
  onOpenProduct,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: CartItemDto[];
  currency: CurrencyOption;
  onUpdateQuantity: (item: CartItemDto, quantity: number) => void;
  onRemove: (item: CartItemDto) => void;
  onCheckout: () => void;
  allProducts: Product[];
  onOpenProduct: (p: Product) => void;
}) {
  const total = items.reduce((sum, i) => sum + i.quantity * i.product_price, 0);
  // CartItemDto only stores the product's name (not a stable id/slug), so a cart
  // line is matched back to a catalog entry by case-insensitive name — the same
  // fallback approach used when an exact slug isn't available elsewhere.
  const goToProduct = (item: CartItemDto) => {
    const match = allProducts.find((p) => p.name.toLowerCase() === item.product_name.toLowerCase());
    if (!match) return;
    onOpenChange(false);
    onOpenProduct(match);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 font-sans sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="font-serif text-xl">
            Your Bag{items.length > 0 && ` (${items.reduce((s, i) => s + i.quantity, 0)})`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingCart className="h-10 w-10 text-foreground/30" />
            <p className="text-sm text-foreground/60">Your bag is empty.</p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-2 rounded-sm border border-foreground/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b border-border pb-4 last:border-0">
                    <button
                      type="button"
                      onClick={() => goToProduct(item)}
                      aria-label={`View ${item.product_name}`}
                      className="h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-olive-50"
                    >
                      {item.product_image && (
                        <img src={item.product_image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" draggable={false} />
                      )}
                    </button>
                    <div className="flex flex-1 flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => goToProduct(item)}
                        className="text-left text-sm font-medium text-foreground transition-colors hover:text-olive-600"
                      >
                        {item.product_name}
                      </button>
                      <p className="font-serif text-sm">{formatPrice(item.product_price, currency)}</p>
                      <div className="mt-1 flex items-center gap-3">
                        <div className="flex items-center rounded-sm border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                            className="px-2 py-1 text-sm text-foreground/70 hover:text-olive-600"
                          >
                            −
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                            className="px-2 py-1 text-sm text-foreground/70 hover:text-olive-600"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item)}
                          className="text-xs text-foreground/50 underline underline-offset-2 hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-serif text-lg">{formatPrice(total, currency)}</span>
              </div>
              <button
                type="button"
                onClick={onCheckout}
                className="w-full rounded-sm bg-olive-600 py-2.5 text-sm font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function WishlistPanel({
  open,
  onOpenChange,
  items,
  currency,
  onRemove,
  onMoveToCart,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: WishlistItemDto[];
  currency: CurrencyOption;
  onRemove: (item: WishlistItemDto) => void;
  onMoveToCart: (item: WishlistItemDto) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 font-sans sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4 text-left">
          <SheetTitle className="font-serif text-xl">Your Wishlist{items.length > 0 && ` (${items.length})`}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <Heart className="h-10 w-10 text-foreground/30" />
            <p className="text-sm text-foreground/60">Nothing saved yet.</p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-2 rounded-sm border border-foreground/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-border pb-4 last:border-0">
                  <div className="h-16 w-16 shrink-0 rounded-sm bg-olive-50" />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-medium text-foreground">{item.product_name}</p>
                    <p className="font-serif text-sm">{formatPrice(item.product_price, currency)}</p>
                    <div className="mt-1 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onMoveToCart(item)}
                        className="rounded-sm bg-olive-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-olive-50 hover:bg-black"
                      >
                        Add to Bag
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        className="text-xs text-foreground/50 underline underline-offset-2 hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function AllProductsView({
  title,
  products,
  wishlist,
  toggleWishlist,
  added,
  addToBag,
  onOpenProduct,
  onBack,
}: {
  title: string;
  products: Product[];
  wishlist: Set<string>;
  toggleWishlist: (n: string) => void;
  added: Set<string>;
  addToBag: (n: string) => void;
  onOpenProduct: (p: Product) => void;
  onBack: () => void;
}) {
  useBodyScrollLock();

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">{title}</h1>
        <span className="ml-auto text-xs text-foreground/50">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 md:px-8 md:py-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
            <p className="font-serif text-lg text-foreground/70">New pieces for &ldquo;{title}&rdquo; are on the way.</p>
            <p className="text-sm text-foreground/50">Check back soon, or explore what&rsquo;s already live below.</p>
            <button
              type="button"
              onClick={onBack}
              className="mt-3 rounded-sm bg-olive-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.name} p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={onOpenProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// A single, premium "shop by category" landing page — every collection shown
// as its own section with a preview of its products, so a shopper sees the
// whole catalog at a glance instead of drilling into one category at a time.
function AllCollectionsView({
  open,
  onBack,
  wishlist,
  toggleWishlist,
  added,
  addToBag,
  onOpenProduct,
  onOpenGroup,
  allProducts,
}: {
  open: boolean;
  onBack: () => void;
  wishlist: Set<string>;
  toggleWishlist: (n: string) => void;
  added: Set<string>;
  addToBag: (n: string) => void;
  onOpenProduct: (p: Product) => void;
  onOpenGroup: (group: { label: string; items: string[] }) => void;
  allProducts: Product[];
}) {
  useBodyScrollLock(open);
  useEffect(() => {
    if (open) window.scrollTo(0, 0);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">Collections</h1>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:px-8 md:py-10">
        {COLLECTION_GROUPS.map((group, i) => {
          const items = group.items.map((it) => it.toLowerCase());
          const products = allProducts.filter((p) => items.includes(p.category.toLowerCase()));
          if (products.length === 0) return null;
          return (
            <section key={group.key} className={i > 0 ? "mt-14 border-t border-border pt-14" : ""}>
              <div className="mb-5 flex items-end justify-between gap-4 sm:mb-8">
                <div>
                  <h2 className="font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">{group.label}</h2>
                  <p className="mt-1 text-xs text-foreground/50">
                    {products.length} {products.length === 1 ? "piece" : "pieces"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenGroup(group)}
                  className="flex-shrink-0 whitespace-nowrap rounded-sm border border-olive-400 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-olive-600 transition-colors hover:bg-olive-50 sm:px-5 sm:py-2.5 sm:text-xs"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
                {products.slice(0, 4).map((p) => (
                  <ProductCard key={p.name} p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={onOpenProduct} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// Full editable account settings page, reachable from the header's profile
// menu. Name and phone are editable and saved via PATCH /api/auth/me; email
// stays read-only since it's the Google account identity, not something we
// let a customer change here.
// Indian states/UTs, offered as a dropdown so the state on an address always
// matches what the admin sees on the order (free text produced "UP", "U.P."
// and "Uttar Pradesh" for the same place).
const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const PIN_REGEX = /^[1-9][0-9]{5}$/;

function formatMemberSince(value?: string | null) {
  if (!value) return null;
  const d = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function ProfileStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-olive-200/70 bg-card px-4 py-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive-50 text-olive-600">{icon}</span>
      <div className="min-w-0">
        <p className="truncate font-serif text-lg leading-tight text-foreground">{value}</p>
        <p className="truncate text-[11px] uppercase tracking-wide text-foreground/50">{label}</p>
      </div>
    </div>
  );
}

// The customer's account page: identity, a summary of their ordering history,
// and editable account + delivery details. The address half writes to
// /api/addresses — the `addresses` table shipped in the very first schema but
// had no routes until now, which is why this page could previously only edit
// a name and a phone number.
function ProfileView({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingAccount, setSavingAccount] = useState(false);
  const [accountMsg, setAccountMsg] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const [addresses, setAddresses] = useState<AddressDto[] | null>(null);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressMsg, setAddressMsg] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const [orders, setOrders] = useState<OrderSummaryDto[] | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open || !user) return;
    setName(user.name || "");
    setPhone(user.phone || "");
    setAccountMsg(null);
    setAddressMsg(null);

    let cancelled = false;
    api.addresses
      .list()
      .then((r) => {
        if (cancelled) return;
        setAddresses(r.addresses);
        const preferred = r.addresses.find((a) => a.isDefault) || r.addresses[0];
        setLine1(preferred?.line1 || "");
        setLine2(preferred?.line2 || "");
        setCity(preferred?.city || "");
        setStateName(preferred?.state || "");
        setPostalCode(preferred?.postalCode || "");
      })
      .catch(() => {
        if (!cancelled) setAddresses([]);
      });
    api.orders
      .list()
      .then((r) => !cancelled && setOrders(r.orders))
      .catch(() => !cancelled && setOrders([]));
    return () => {
      cancelled = true;
    };
  }, [open, user]);

  if (!open || !user) return null;

  const defaultAddress = addresses?.find((a) => a.isDefault) || addresses?.[0] || null;

  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const phoneInvalid = trimmedPhone.length > 0 && !isValidPhone(trimmedPhone);
  const accountDirty = trimmedName !== (user.name || "") || trimmedPhone !== (user.phone || "");
  const canSaveAccount = accountDirty && !savingAccount && trimmedName.length > 0 && !phoneInvalid;

  const addr = {
    line1: line1.trim(),
    line2: line2.trim(),
    city: city.trim(),
    state: stateName.trim(),
    postalCode: postalCode.trim(),
  };
  const pinInvalid = addr.postalCode.length > 0 && !PIN_REGEX.test(addr.postalCode);
  const addressDirty =
    addr.line1 !== (defaultAddress?.line1 || "") ||
    addr.line2 !== (defaultAddress?.line2 || "") ||
    addr.city !== (defaultAddress?.city || "") ||
    addr.state !== (defaultAddress?.state || "") ||
    addr.postalCode !== (defaultAddress?.postalCode || "");
  const addressComplete = !!(addr.line1 && addr.city && addr.state && addr.postalCode);
  const canSaveAddress = addressDirty && addressComplete && !pinInvalid && !savingAddress;

  // Cancelled and not-yet-confirmed orders were never paid for, so counting
  // them as "spent" would overstate what this customer has actually bought.
  const billableOrders = (orders || []).filter((o) => o.status !== "cancelled" && o.status !== "awaiting_payment");
  const deliveredCount = (orders || []).filter((o) => o.status === "delivered").length;
  const lifetimeSpend = billableOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const memberSince = formatMemberSince(user.created_at);

  const saveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSaveAccount) return;
    setAccountMsg(null);
    setSavingAccount(true);
    try {
      const res = await api.auth.updateProfile({ name: trimmedName, phone: trimmedPhone || undefined });
      updateUser(res.user);
      setAccountMsg({ kind: "success", text: "Your account details have been saved." });
    } catch (err) {
      setAccountMsg({ kind: "error", text: err instanceof ApiError ? err.message : "Couldn't save your changes. Please try again." });
    } finally {
      setSavingAccount(false);
    }
  };

  const saveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSaveAddress) return;
    setAddressMsg(null);
    setSavingAddress(true);
    try {
      const payload = {
        line1: addr.line1,
        line2: addr.line2 || undefined,
        city: addr.city,
        state: addr.state,
        postalCode: addr.postalCode,
        isDefault: true,
      };
      const res = defaultAddress ? await api.addresses.update(defaultAddress.id, payload) : await api.addresses.create(payload);
      setAddresses(res.addresses);
      setAddressMsg({ kind: "success", text: "Your delivery address has been saved." });
    } catch (err) {
      setAddressMsg({ kind: "error", text: err instanceof ApiError ? err.message : "Couldn't save your address. Please try again." });
    } finally {
      setSavingAddress(false);
    }
  };

  const fieldClass =
    "w-full rounded-sm border border-border bg-card px-3 py-2.5 text-sm text-foreground transition-shadow placeholder:text-foreground/35 focus:outline-none focus:ring-2 focus:ring-olive-500/60";
  const labelClass = "text-[11px] font-semibold uppercase tracking-wide text-foreground/55";
  const cardClass = "rounded-sm border border-olive-200/70 bg-card p-5 md:p-6";
  const submitClass =
    "mt-1 w-full rounded-sm bg-olive-600 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-olive-50 transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-45";

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="font-serif text-lg uppercase tracking-[0.12em] text-olive-600 md:text-2xl">My Profile</h1>
      </div>

      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-8 md:py-10">
        <div className="overflow-hidden rounded-sm border border-olive-200/70 bg-gradient-to-br from-olive-50 via-background to-olive-50/40">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5 md:p-7">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-olive-600 font-serif text-2xl uppercase text-olive-50 shadow-sm md:h-20 md:w-20 md:text-3xl">
              {(trimmedName || user.name).charAt(0) || "U"}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-serif text-xl text-foreground md:text-2xl">{trimmedName || user.name}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/60">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{user.email}</span>
              </p>
              {user.phone && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/60">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {user.phone}
                </p>
              )}
              {memberSince && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-olive-100/70 px-2.5 py-1 text-[11px] uppercase tracking-wide text-olive-600">
                  <Sparkles className="h-3 w-3" />
                  Member since {memberSince}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <ProfileStat icon={<Package className="h-4 w-4" />} label="Orders placed" value={orders === null ? "—" : String(orders.length)} />
          <ProfileStat icon={<CircleCheck className="h-4 w-4" />} label="Delivered" value={orders === null ? "—" : String(deliveredCount)} />
          <ProfileStat
            icon={<Gift className="h-4 w-4" />}
            label="Total spent"
            value={orders === null ? "—" : `₹${lifetimeSpend.toLocaleString("en-IN")}`}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <form onSubmit={saveAccount} className={cardClass}>
            <h3 className="font-serif text-base uppercase tracking-[0.12em] text-olive-600">Account details</h3>
            <p className="mt-1 text-xs text-foreground/50">The name and number we use for your orders.</p>

            <div className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-name" className={labelClass}>Full name</label>
                <input id="profile-name" required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-email" className={labelClass}>Email</label>
                <input
                  id="profile-email"
                  value={user.email}
                  disabled
                  className={`${fieldClass} cursor-not-allowed bg-olive-50/60 text-foreground/55`}
                />
                <p className="text-[11px] text-foreground/40">Linked to your Google account — it can't be changed here.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-phone" className={labelClass}>Phone</label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={PHONE_PLACEHOLDER}
                  className={`${fieldClass} ${phoneInvalid ? "border-destructive focus:ring-destructive/60" : ""}`}
                />
                <p className={`text-[11px] ${phoneInvalid ? "text-destructive" : "text-foreground/45"}`}>{PHONE_HELPER_TEXT}</p>
              </div>

              {accountMsg && (
                <p className={`flex items-start gap-1.5 text-sm ${accountMsg.kind === "success" ? "text-olive-600" : "text-destructive"}`}>
                  {accountMsg.kind === "success" ? (
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  )}
                  {accountMsg.text}
                </p>
              )}

              <button type="submit" disabled={!canSaveAccount} className={submitClass}>
                {savingAccount ? "Saving…" : "Save account details"}
              </button>
            </div>
          </form>

          <form onSubmit={saveAddress} className={cardClass}>
            <h3 className="flex items-center gap-2 font-serif text-base uppercase tracking-[0.12em] text-olive-600">
              <MapPin className="h-4 w-4" />
              Delivery address
            </h3>
            <p className="mt-1 text-xs text-foreground/50">Saved for faster checkout. You can still change it on any order.</p>

            <div className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="addr-line1" className={labelClass}>Address</label>
                <input
                  id="addr-line1"
                  value={line1}
                  onChange={(e) => setLine1(e.target.value)}
                  placeholder="House / flat no., street"
                  className={fieldClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="addr-line2" className={labelClass}>
                  Area / landmark <span className="normal-case tracking-normal text-foreground/35">(optional)</span>
                </label>
                <input id="addr-line2" value={line2} onChange={(e) => setLine2(e.target.value)} placeholder="Locality, landmark" className={fieldClass} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="addr-city" className={labelClass}>City</label>
                  <input id="addr-city" value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="addr-pin" className={labelClass}>PIN code</label>
                  <input
                    id="addr-pin"
                    inputMode="numeric"
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="251001"
                    className={`${fieldClass} ${pinInvalid ? "border-destructive focus:ring-destructive/60" : ""}`}
                  />
                  {pinInvalid && <p className="text-[11px] text-destructive">Enter a valid 6-digit PIN code.</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="addr-state" className={labelClass}>State</label>
                <select id="addr-state" value={stateName} onChange={(e) => setStateName(e.target.value)} className={fieldClass}>
                  <option value="">Select a state</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {addressMsg && (
                <p className={`flex items-start gap-1.5 text-sm ${addressMsg.kind === "success" ? "text-olive-600" : "text-destructive"}`}>
                  {addressMsg.kind === "success" ? (
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  )}
                  {addressMsg.text}
                </p>
              )}

              <button type="submit" disabled={!canSaveAddress} className={submitClass}>
                {savingAddress ? "Saving…" : defaultAddress ? "Update address" : "Save address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function LegalView({ type, onBack }: { type: "privacy" | "terms"; onBack: () => void }) {
  useBodyScrollLock();

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">
          {type === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
        </h1>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 space-y-5 px-5 py-8 text-sm leading-relaxed text-foreground/80 md:px-8">
        {type === "privacy" ? (
          <>
            <p className="text-xs text-foreground/50">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p>At Beauty of Beads, we respect your privacy and are committed to protecting the personal information you share with us.</p>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Information we collect</h2>
              <p>When you sign in with Google, create an order, or subscribe to our newsletter, we collect your name, email address, and — for orders — your shipping details. We do not collect or store passwords, since sign-in is handled entirely through Google.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">How we use it</h2>
              <p>Your information is used only to process and deliver your orders, keep you signed in, save your cart and wishlist, send order updates, and — if you've opted in — share news about new collections and offers. We never sell your information to third parties.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Data storage</h2>
              <p>Your data is stored securely and is only accessible to you (via your account) and to us, for the purpose of fulfilling your orders and providing support.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Your choices</h2>
              <p>You can unsubscribe from our newsletter at any time, and you can reach out to us via WhatsApp if you'd like your account data reviewed, updated, or deleted.</p>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs text-foreground/50">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p>Welcome to Beauty of Beads. By placing an order or using this site, you agree to the following terms.</p>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Products</h2>
              <p>All our pieces are handmade, so minor variations in colour, size, and finish compared to photos are normal and part of the charm of handcrafted work.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Orders &amp; payment</h2>
              <p>Orders are confirmed once payment is completed. We currently do not offer Cash on Delivery. Please double-check your shipping address before placing an order, as we begin preparing your piece soon after confirmation.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Shipping</h2>
              <p>Dispatch and delivery timelines are shared on the product and FAQ pages. We ship across India and, in select cases, internationally.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Returns &amp; exchanges</h2>
              <p>As each piece is made to order, we currently do not accept returns. If an item arrives damaged or incorrect, please contact us within 48 hours of delivery with photos and we'll make it right.</p>
            </div>
            <div>
              <h2 className="mb-1.5 font-serif text-base text-foreground">Contact</h2>
              <p>For any questions about these terms, reach out to us via WhatsApp from the Contact Us link in the footer.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const SEARCH_SUGGESTIONS = ["Hair Pins", "Hair Chains", "Resin Jewellery", "Traditional Accessories", "Hair Accessories", "Kaliras"];

function SearchOverlay({
  open,
  onClose,
  wishlist,
  toggleWishlist,
  added,
  addToBag,
  onOpenProduct,
  allProducts,
}: {
  open: boolean;
  onClose: () => void;
  wishlist: Set<string>;
  toggleWishlist: (n: string) => void;
  added: Set<string>;
  addToBag: (n: string) => void;
  onOpenProduct: (p: Product) => void;
  allProducts: Product[];
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? allProducts.filter((p) => p.name.toLowerCase().includes(trimmed) || p.category.toLowerCase().includes(trimmed))
    : [];

  return (
    <div className="fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-5 py-4 md:px-8">
        <Search className="h-5 w-5 shrink-0 text-foreground/40" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for hair pins, necklaces, kaliras…"
          className="flex-1 border-none bg-transparent text-base text-foreground outline-none placeholder:text-foreground/40"
        />
        <button
          type="button"
          aria-label="Close search"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 md:px-8 md:py-8">
        {trimmed === "" ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-foreground/50">Try searching for a product or category.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SEARCH_SUGGESTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setQuery(c)}
                  className="rounded-full border border-border px-4 py-1.5 text-xs text-foreground/70 transition-colors hover:border-olive-500 hover:text-olive-600"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="font-serif text-lg text-foreground/70">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-sm text-foreground/50">Try a different search term.</p>
          </div>
        ) : (
          <>
            <p className="mb-5 text-xs text-foreground/50">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.name} p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={onOpenProduct} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function stageLabel(stage: string) {
  return stage
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Matches the backend's mandatory phone format exactly: a leading "+" and
// country code, then 6-14 digits (an optional single space/hyphen allowed
// right after the country code) — e.g. "+91 98765 43210" or "+919876543210".
const PHONE_REGEX = /^\+[1-9]\d{0,3}[\s-]?\d{6,14}$/;
const PHONE_PLACEHOLDER = "+91 98765 43210";
const PHONE_HELPER_TEXT = "Include your country code, e.g. +91 98765 43210.";
function isValidPhone(phone: string) {
  return PHONE_REGEX.test(phone.trim());
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatShortDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function CheckoutModal({
  open,
  onOpenChange,
  items,
  currency,
  prefilledName,
  prefilledPhone,
  onPlaced,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: CartItemDto[];
  currency: CurrencyOption;
  prefilledName: string;
  prefilledPhone: string;
  onPlaced: (orderNumber: string) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(prefilledName || "");
      setPhone(prefilledPhone || "");
      setError(null);
    }
  }, [open, prefilledName, prefilledPhone]);

  const total = items.reduce((sum, i) => sum + i.quantity * i.product_price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setError(null);
    if (!isValidPhone(phone)) {
      setError(`Enter a valid phone number with country code, e.g. ${PHONE_PLACEHOLDER}.`);
      return;
    }
    setLoading(true);
    try {
      const res = await api.orders.place({
        items: items.map((i) => ({ productName: i.product_name, productPrice: i.product_price, quantity: i.quantity })),
        currencyCode: currency.code,
        shipping: {
          name,
          phone,
          line1,
          line2: line2 || undefined,
          city,
          state: state || undefined,
          postalCode: postalCode || undefined,
          country,
        },
      });
      onPlaced(res.orderNumber);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't place your order. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "rounded-sm border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500";
  const labelClass = "text-sm font-medium text-foreground/80";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-sm overflow-y-auto rounded-lg font-sans sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Checkout</DialogTitle>
          <DialogDescription>Enter your shipping details to place your order.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ship-name" className={labelClass}>
              Full name
            </label>
            <input id="ship-name" required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ship-phone" className={labelClass}>
              Phone number
            </label>
            <input
              id="ship-phone"
              type="tel"
              required
              minLength={7}
              maxLength={20}
              pattern={PHONE_REGEX.source}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={PHONE_PLACEHOLDER}
              className={fieldClass}
            />
            <p className="text-xs text-foreground/50">{PHONE_HELPER_TEXT}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ship-line1" className={labelClass}>
              Address line 1
            </label>
            <input
              id="ship-line1"
              required
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              placeholder="House no., street"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ship-line2" className={labelClass}>
              Address line 2 (optional)
            </label>
            <input
              id="ship-line2"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="Landmark, apartment"
              className={fieldClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ship-city" className={labelClass}>
                City
              </label>
              <input id="ship-city" required value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ship-state" className={labelClass}>
                State (optional)
              </label>
              <input id="ship-state" value={state} onChange={(e) => setState(e.target.value)} className={fieldClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ship-postal" className={labelClass}>
                Postal code (optional)
              </label>
              <input id="ship-postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ship-country" className={labelClass}>
                Country
              </label>
              <input id="ship-country" required value={country} onChange={(e) => setCountry(e.target.value)} className={fieldClass} />
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between border-t border-border pt-3 text-sm">
            <span className="text-foreground/70">Total</span>
            <span className="font-serif text-lg">{formatPrice(total, currency)}</span>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className="mt-1 w-full rounded-sm bg-olive-600 py-2.5 text-sm font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black disabled:opacity-60"
          >
            {loading ? "Placing Order…" : "Place Order"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type OrderDetail = { order: OrderDto; items: OrderItemDto[]; history: OrderHistoryDto[]; stages: string[] };

// Verified-purchase review composer — only reachable from a delivered order's
// item row in My Orders (see OrdersView), which is exactly what a "please
// review your order" email would deep-link to, once real email sending is
// wired up with a provider.
function ReviewComposer({
  target,
  onClose,
  onSubmitted,
}: {
  target: { orderId: number; productName: string } | null;
  onClose: () => void;
  onSubmitted: (productName: string) => void;
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (target) {
      setRating(5);
      setHoverRating(0);
      setComment("");
      setError(null);
    }
  }, [target]);

  if (!target) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (comment.trim().length < 5) {
      setError("Please write a few words about the product.");
      return;
    }
    setLoading(true);
    try {
      await api.reviews.create({ orderId: target.orderId, productName: target.productName, rating, comment: comment.trim() });
      onSubmitted(target.productName);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!target} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="font-sans sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Write a Review</DialogTitle>
          <DialogDescription>{target.productName}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
              >
                <Star className={`h-7 w-7 ${(hoverRating || rating) >= n ? "fill-gold-400 text-gold-400" : "text-border"}`} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was your experience with this product?"
            rows={4}
            className="w-full resize-none rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-olive-500"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-olive-600 py-2.5 text-sm font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const MAX_COMPLAINT_IMAGES = 5;
type ComplaintImageAttachment = {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
  error?: string;
};

// "Raise a complaint" composer — only offered on a delivered order within the
// complaint window (see COMPLAINT_WINDOW_DAYS in OrdersView). Structured the same way as
// ReviewComposer above (a Dialog gated on a nullable `target`), with an
// added image-attachment control: each selected file uploads immediately via
// api.uploads.image, and only successfully-uploaded URLs are submitted.
function ComplaintComposer({
  target,
  onClose,
  onSubmitted,
}: {
  target: { orderNumber: string; items: OrderItemDto[] } | null;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const { user } = useAuth();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [attachments, setAttachments] = useState<ComplaintImageAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (target) {
      setProductName("");
      setDescription("");
      setPhone(user?.phone || "");
      setAttachments([]);
      setError(null);
      setSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!target) return null;

  const uniqueProductNames = Array.from(new Set(target.items.map((i) => i.product_name)));
  const uploading = attachments.some((a) => a.status === "uploading");

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remainingSlots = MAX_COMPLAINT_IMAGES - attachments.length;
    if (remainingSlots <= 0) {
      setError(`You can attach up to ${MAX_COMPLAINT_IMAGES} images.`);
      return;
    }
    const toAdd = Array.from(files).slice(0, remainingSlots);
    setError(
      files.length > remainingSlots
        ? `Only ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"} can be added (max ${MAX_COMPLAINT_IMAGES}).`
        : null
    );
    toAdd.forEach((file) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setAttachments((prev) => [...prev, { id, name: file.name, status: "uploading" }]);
      api.uploads
        .image(file)
        .then((res) => {
          setAttachments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "done", url: res.url } : a)));
        })
        .catch((err) => {
          setAttachments((prev) =>
            prev.map((a) =>
              a.id === id ? { ...a, status: "error", error: err instanceof ApiError ? err.message : "Upload failed" } : a
            )
          );
        });
    });
  };

  const removeAttachment = (id: string) => setAttachments((prev) => prev.filter((a) => a.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (description.trim().length < 5) {
      setError("Please describe the issue in a few more words.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError(`Enter a valid phone number with country code, e.g. ${PHONE_PLACEHOLDER}.`);
      return;
    }
    if (uploading) {
      setError("Please wait for your images to finish uploading.");
      return;
    }
    setLoading(true);
    try {
      const images = attachments.filter((a) => a.status === "done" && a.url).map((a) => a.url as string);
      await api.complaints.create(target.orderNumber, {
        productName: productName || undefined,
        description: description.trim(),
        images,
        phone: phone.trim(),
      });
      setSubmitted(true);
      setTimeout(onSubmitted, 1400);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't submit your complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!target} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto font-sans sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Raise a Complaint</DialogTitle>
          <DialogDescription>Order {target.orderNumber}</DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <p className="font-serif text-lg text-olive-600">Complaint submitted</p>
            <p className="text-sm text-foreground/60">Our team will get back to you shortly on the number you provided.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-product" className="text-sm font-medium text-foreground/80">
                Product (optional)
              </label>
              <select
                id="complaint-product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="rounded-sm border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
              >
                <option value="">General issue</option>
                {uniqueProductNames.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-desc" className="text-sm font-medium text-foreground/80">
                Describe the issue
              </label>
              <textarea
                id="complaint-desc"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us what went wrong…"
                className="w-full resize-none rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-olive-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="complaint-phone" className="text-sm font-medium text-foreground/80">
                Phone number
              </label>
              <input
                id="complaint-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={PHONE_PLACEHOLDER}
                pattern={PHONE_REGEX.source}
                className="rounded-sm border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500"
              />
              <p className="text-xs text-foreground/50">{PHONE_HELPER_TEXT}</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground/80">Attach photos (optional, up to {MAX_COMPLAINT_IMAGES})</label>
              <div className="flex flex-wrap gap-2">
                {attachments.map((a) => (
                  <div key={a.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-border bg-olive-50">
                    {a.status === "uploading" && (
                      <div className="flex h-full w-full items-center justify-center text-center text-[9px] text-foreground/50">
                        Uploading…
                      </div>
                    )}
                    {a.status === "done" && a.url && <img src={a.url} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" draggable={false} />}
                    {a.status === "error" && (
                      <div className="flex h-full w-full items-center justify-center p-1 text-center text-[9px] text-destructive">
                        Failed
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeAttachment(a.id)}
                      aria-label="Remove image"
                      className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                ))}
                {attachments.length < MAX_COMPLAINT_IMAGES && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Add photo"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-dashed border-border text-lg text-foreground/40 transition-colors hover:border-olive-500 hover:text-olive-600"
                  >
                    +
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleFilesSelected(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full rounded-sm bg-olive-600 py-2.5 text-sm font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting…" : "Submit Complaint"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// A custom order an admin built for a customer lands with status
// 'awaiting_payment' and no shipping address yet — this card is how the
// customer reviews it and supplies/confirms their shipping details
// (see api.orders.confirm) to move it into the normal fulfillment flow.
function CustomOrderConfirmCard({
  order,
  onConfirmed,
}: {
  order: OrderDto;
  onConfirmed: () => void;
}) {
  const { user } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fieldClass =
    "rounded-sm border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive-500";
  const labelClass = "text-sm font-medium text-foreground/80";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValidPhone(phone)) {
      setError(`Enter a valid phone number with country code, e.g. ${PHONE_PLACEHOLDER}.`);
      return;
    }
    setLoading(true);
    try {
      const shipping: ShippingInput = {
        name,
        phone,
        line1,
        line2: line2 || undefined,
        city,
        state: state || undefined,
        postalCode: postalCode || undefined,
        country,
      };
      await api.orders.confirm(order.order_number, shipping);
      setFormOpen(false);
      onConfirmed();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't confirm this order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-sm border border-olive-400 bg-olive-50 px-4 py-4 sm:px-5 sm:py-5">
      <p className="font-serif text-base text-olive-700 sm:text-lg">A custom order is waiting for your confirmation</p>
      {order.custom_note && <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">"{order.custom_note}"</p>}
      {!formOpen ? (
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="mt-4 rounded-sm bg-olive-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black"
        >
          Confirm &amp; Add Shipping Details
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-name" className={labelClass}>
              Full name
            </label>
            <input id="confirm-name" required value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-phone" className={labelClass}>
              Phone number
            </label>
            <input
              id="confirm-phone"
              type="tel"
              required
              minLength={7}
              maxLength={20}
              pattern={PHONE_REGEX.source}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={PHONE_PLACEHOLDER}
              className={fieldClass}
            />
            <p className="text-xs text-foreground/50">{PHONE_HELPER_TEXT}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-line1" className={labelClass}>
              Address line 1
            </label>
            <input
              id="confirm-line1"
              required
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              placeholder="House no., street"
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-line2" className={labelClass}>
              Address line 2 (optional)
            </label>
            <input
              id="confirm-line2"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="Landmark, apartment"
              className={fieldClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-city" className={labelClass}>
                City
              </label>
              <input id="confirm-city" required value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-state" className={labelClass}>
                State (optional)
              </label>
              <input id="confirm-state" value={state} onChange={(e) => setState(e.target.value)} className={fieldClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-postal" className={labelClass}>
                Postal code (optional)
              </label>
              <input id="confirm-postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-country" className={labelClass}>
                Country
              </label>
              <input id="confirm-country" required value={country} onChange={(e) => setCountry(e.target.value)} className={fieldClass} />
            </div>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="mt-1 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-sm bg-olive-600 py-2.5 text-sm font-semibold uppercase tracking-wide text-olive-50 transition-colors hover:bg-black disabled:opacity-60"
            >
              {loading ? "Confirming…" : "Confirm Order"}
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="rounded-sm border border-border px-4 text-sm font-semibold uppercase tracking-wide text-foreground/70 transition-colors hover:bg-card"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// A customer may raise a complaint for this many days after delivery, after
// which the button disappears. Mirrors COMPLAINT_WINDOW_DAYS in the worker's
// src/routes/complaints.js — the server is the real gate, this only decides
// what the UI offers.
const COMPLAINT_WINDOW_DAYS = 7;

// Status pill colours. Cancelled reads as an error, awaiting_payment as
// something needing the customer's attention, delivered as complete, and
// everything mid-flight shares the neutral olive treatment.
function statusPillClass(status: string) {
  if (status === "cancelled") return "bg-destructive/10 text-destructive";
  if (status === "awaiting_payment") return "bg-olive-600 text-olive-50";
  if (status === "delivered") return "bg-olive-600 text-olive-50";
  return "bg-olive-50 text-olive-600 border border-olive-200";
}

// The stepper is vertical on small screens and horizontal from `sm` up.
// The old layout was a single wrapping flex row, so on a phone the sixth
// step ("Delivered") wrapped onto its own line and the connectors pointed
// nowhere.
function OrderTracker({
  stages,
  status,
  history,
}: {
  stages: string[];
  status: string;
  history: OrderHistoryDto[];
}) {
  const currentIdx = stages.indexOf(status);

  return (
    <div className="rounded-sm border border-olive-200/70 bg-card p-5 md:p-6">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">Order progress</p>

      {/* Mobile: vertical timeline */}
      <ol className="flex flex-col sm:hidden">
        {stages.map((stage, i) => {
          const done = i <= currentIdx;
          const isCurrent = i === currentIdx;
          const stageDate = history.find((h) => h.status === stage)?.created_at;
          return (
            <li key={stage} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                    done ? "bg-olive-600 text-olive-50" : "border border-border bg-card text-foreground/35"
                  } ${isCurrent ? "ring-2 ring-olive-500/30 ring-offset-2 ring-offset-card" : ""}`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                {i < stages.length - 1 && <span className={`w-px flex-1 ${i < currentIdx ? "bg-olive-500" : "bg-border"}`} />}
              </div>
              <div className={`pb-5 ${i === stages.length - 1 ? "pb-0" : ""}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide ${done ? "text-olive-600" : "text-foreground/40"}`}>
                  {stageLabel(stage)}
                </p>
                {done && stageDate ? (
                  <p className="mt-0.5 text-[11px] text-foreground/45">{formatShortDateTime(stageDate)}</p>
                ) : (
                  <p className="mt-0.5 text-[11px] text-foreground/30">Pending</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: horizontal rail. The connector is drawn as a background
          track with a filled overlay so it lines up exactly with the dots
          regardless of how many stages there are. */}
      <div className="hidden sm:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-3.5 h-px bg-border" aria-hidden="true" />
          <div
            className="absolute left-0 top-3.5 h-px bg-olive-500 transition-all duration-500"
            style={{ width: currentIdx <= 0 ? "0%" : `${(currentIdx / (stages.length - 1)) * 100}%` }}
            aria-hidden="true"
          />
          <ol className="relative flex justify-between">
            {stages.map((stage, i) => {
              const done = i <= currentIdx;
              const isCurrent = i === currentIdx;
              const stageDate = history.find((h) => h.status === stage)?.created_at;
              return (
                <li key={stage} className="flex flex-1 flex-col items-center gap-2 text-center">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                      done ? "bg-olive-600 text-olive-50" : "border border-border bg-card text-foreground/35"
                    } ${isCurrent ? "ring-2 ring-olive-500/30 ring-offset-2 ring-offset-card" : ""}`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span
                    className={`max-w-[7rem] text-[10px] font-semibold uppercase leading-tight tracking-wide ${
                      done ? "text-olive-600" : "text-foreground/40"
                    }`}
                  >
                    {stageLabel(stage)}
                  </span>
                  {done && stageDate && <span className="text-[9px] leading-tight text-foreground/40">{formatShortDateTime(stageDate)}</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

function OrdersView({
  open,
  onClose,
  initialOrderNumber,
  currency,
}: {
  open: boolean;
  onClose: () => void;
  initialOrderNumber: string | null;
  currency: CurrencyOption;
}) {
  const [orders, setOrders] = useState<OrderSummaryDto[] | null>(null);
  const [selected, setSelected] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Product names within the currently open order that are still eligible for
  // a review (delivered, not yet reviewed). null while unknown/loading.
  const [reviewableNames, setReviewableNames] = useState<Set<string> | null>(null);
  const [reviewTarget, setReviewTarget] = useState<{ orderId: number; productName: string } | null>(null);
  const [complaintTarget, setComplaintTarget] = useState<{ orderNumber: string; items: OrderItemDto[] } | null>(null);

  const loadOrder = (orderNumber: string) => {
    setError(null);
    api.orders
      .get(orderNumber)
      .then(setSelected)
      .catch((e) => setError(e instanceof ApiError ? e.message : "Couldn't load that order."));
  };

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    setSelected(null);
    api.orders
      .list()
      .then((r) => {
        setOrders(r.orders);
        if (initialOrderNumber) loadOrder(initialOrderNumber);
      })
      .catch((e) => setError(e instanceof ApiError ? e.message : "Couldn't load your orders. Please check your connection."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialOrderNumber]);

  useEffect(() => {
    if (!selected || selected.order.status !== "delivered") {
      setReviewableNames(null);
      return;
    }
    let cancelled = false;
    api.reviews
      .reviewable()
      .then((r) => {
        if (cancelled) return;
        const names = new Set(r.reviewable.filter((it) => it.order_id === selected.order.id).map((it) => it.product_name));
        setReviewableNames(names);
      })
      .catch(() => {
        if (!cancelled) setReviewableNames(new Set());
      });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-8">
        <button
          type="button"
          aria-label="Back"
          onClick={() => (selected ? setSelected(null) : onClose())}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="min-w-0 truncate font-serif text-base uppercase tracking-[0.12em] text-olive-600 md:text-2xl">
          {selected ? selected.order.order_number : "Your Orders"}
        </h1>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 md:px-8 md:py-8">
        {loading && <p className="py-16 text-center text-sm text-foreground/50">Loading…</p>}
        {error && <p className="py-16 text-center text-sm text-destructive">{error}</p>}

        {!loading && !error && !selected && orders && orders.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Package className="h-8 w-8 text-foreground/25" />
            <p className="font-serif text-lg text-foreground/70">No orders yet.</p>
            <p className="text-sm text-foreground/50">Once you place an order, you'll be able to track it here.</p>
          </div>
        )}

        {!loading && !error && !selected && orders && orders.length > 0 && (
          <div className="flex flex-col gap-3">
            {orders.map((o) => (
              <button
                key={o.order_number}
                type="button"
                onClick={() => loadOrder(o.order_number)}
                className={`group flex flex-col gap-3 rounded-sm border p-4 text-left transition-all hover:border-olive-400 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between ${
                  o.status === "awaiting_payment" ? "border-olive-400 bg-olive-50/60" : "border-olive-200/70 bg-card"
                }`}
              >
                <div className="min-w-0">
                  <p className="font-serif text-sm tracking-wide text-foreground">{o.order_number}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/50">
                    <CalendarDays className="h-3 w-3 shrink-0" />
                    {formatDateTime(o.created_at)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusPillClass(o.status)}`}>
                    {stageLabel(o.status)}
                  </span>
                  <span className="font-serif text-sm">{formatPrice(o.total_amount, currency)}</span>
                  <ChevronRight className="hidden h-4 w-4 shrink-0 text-foreground/30 transition-transform group-hover:translate-x-0.5 sm:block" />
                </div>
              </button>
            ))}
          </div>
        )}

        {!loading && selected && (() => {
          const deliveredAt = selected.history.find((h) => h.status === "delivered")?.created_at;
          const daysSinceDelivered = deliveredAt ? (Date.now() - new Date(deliveredAt).getTime()) / (24 * 60 * 60 * 1000) : null;
          const canComplain =
            selected.order.status === "delivered" && daysSinceDelivered !== null && daysSinceDelivered <= COMPLAINT_WINDOW_DAYS;
          const daysLeft = daysSinceDelivered === null ? null : Math.max(0, Math.ceil(COMPLAINT_WINDOW_DAYS - daysSinceDelivered));
          const itemCount = selected.items.reduce((n, it) => n + it.quantity, 0);
          const subtotal = selected.items.reduce((sum, it) => sum + it.product_price * it.quantity, 0);
          const discount = selected.order.discount_amount || 0;
          const handleInvoice = () => {
            alert("Invoice PDF download will be available once the payment gateway is set up.");
          };

          return (
            <div className="flex flex-col gap-4">
              {/* Summary header */}
              <div className="rounded-sm border border-olive-200/70 bg-gradient-to-br from-olive-50 via-card to-card p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif text-lg tracking-wide text-foreground">{selected.order.order_number}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-foreground/55">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      Placed on {formatDateTime(selected.order.created_at)}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusPillClass(selected.order.status)}`}>
                    {stageLabel(selected.order.status)}
                  </span>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-olive-200/60 pt-4 sm:grid-cols-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-foreground/45">Items</dt>
                    <dd className="mt-0.5 font-serif text-sm text-foreground">{itemCount}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-foreground/45">Order total</dt>
                    <dd className="mt-0.5 font-serif text-sm text-foreground">{formatPrice(selected.order.total_amount, currency)}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-foreground/45">Last update</dt>
                    <dd className="mt-0.5 font-serif text-sm text-foreground">{formatShortDateTime(selected.order.updated_at)}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-wide text-foreground/45">Invoice</dt>
                    <dd className="mt-0.5">
                      <button type="button" onClick={handleInvoice} className="font-serif text-sm text-olive-600 hover:underline">
                        Download
                      </button>
                    </dd>
                  </div>
                </dl>

                {selected.order.custom_note && (
                  <p className="mt-4 rounded-sm bg-olive-50 px-3 py-2 text-xs text-foreground/70">
                    <span className="font-semibold uppercase tracking-wide text-olive-600">Note · </span>
                    {selected.order.custom_note}
                  </p>
                )}
              </div>

              {selected.order.status === "awaiting_payment" ? (
                <CustomOrderConfirmCard order={selected.order} onConfirmed={() => loadOrder(selected.order.order_number)} />
              ) : (
                <>
                  {selected.order.status !== "cancelled" && (
                    <OrderTracker stages={selected.stages} status={selected.order.status} history={selected.history} />
                  )}

                  <div className="rounded-sm border border-olive-200/70 bg-card p-5 md:p-6">
                    <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50">
                      <MapPin className="h-3.5 w-3.5" />
                      Shipping to
                    </p>
                    <p className="font-serif text-sm text-foreground">{selected.order.shipping_name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                      {selected.order.shipping_line1}
                      {selected.order.shipping_line2 ? `, ${selected.order.shipping_line2}` : ""}
                      <br />
                      {selected.order.shipping_city}
                      {selected.order.shipping_state ? `, ${selected.order.shipping_state}` : ""}{" "}
                      {selected.order.shipping_postal_code || ""}
                      <br />
                      {selected.order.shipping_country}
                    </p>
                    {selected.order.shipping_phone && (
                      <a
                        href={`tel:${selected.order.shipping_phone}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm text-olive-600 hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {selected.order.shipping_phone}
                      </a>
                    )}
                  </div>
                </>
              )}

              {/* Items */}
              <div className="overflow-hidden rounded-sm border border-olive-200/70 bg-card">
                <p className="border-b border-olive-200/60 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/50 md:px-6">
                  Items in this order
                </p>
                <div className="divide-y divide-olive-200/60">
                  {selected.items.map((it, i) => (
                    <div key={i} className="flex gap-3 px-5 py-4 md:gap-4 md:px-6">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-olive-50 md:h-20 md:w-20">
                        {it.product_image ? (
                          <img
                            src={it.product_image}
                            alt={it.product_name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-foreground/20">
                            <Package className="h-5 w-5" />
                          </span>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <p className="text-sm font-medium leading-snug text-foreground">{it.product_name}</p>
                        <p className="text-xs text-foreground/50">
                          {formatPrice(it.product_price, currency)} × {it.quantity}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {reviewableNames?.has(it.product_name) && (
                            <button
                              type="button"
                              onClick={() => setReviewTarget({ orderId: selected.order.id, productName: it.product_name })}
                              className="flex items-center gap-1 rounded-full border border-olive-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-olive-600 transition-colors hover:bg-olive-50"
                            >
                              <Star className="h-3 w-3" />
                              Write a review
                            </button>
                          )}
                          {selected.order.status === "delivered" && reviewableNames && !reviewableNames.has(it.product_name) && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-olive-600">
                              <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                              Reviewed
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="shrink-0 font-serif text-sm text-foreground">
                        {formatPrice(it.product_price * it.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 border-t border-olive-200/60 bg-olive-50/40 px-5 py-4 text-sm md:px-6">
                  <div className="flex items-center justify-between text-foreground/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-olive-600">
                      <span>Discount{selected.order.promo_code ? ` · ${selected.order.promo_code}` : ""}</span>
                      <span>− {formatPrice(discount, currency)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-olive-200/60 pt-2 font-semibold text-foreground">
                    <span>Total paid</span>
                    <span className="font-serif text-base">{formatPrice(selected.order.total_amount, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Complaint window */}
              {selected.order.status === "delivered" && (
                <div className="flex flex-col gap-3 rounded-sm border border-olive-200/70 bg-card p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <AlertCircle className="h-4 w-4 shrink-0 text-olive-600" />
                      Something wrong with this order?
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                      {canComplain ? (
                        <>
                          You can raise a complaint within {COMPLAINT_WINDOW_DAYS} days of delivery
                          {daysLeft !== null && (
                            <>
                              {" — "}
                              <span className="font-semibold text-olive-600">
                                {daysLeft} {daysLeft === 1 ? "day" : "days"} left
                              </span>
                            </>
                          )}
                          .
                        </>
                      ) : (
                        <>The {COMPLAINT_WINDOW_DAYS}-day complaint window for this order has closed. Please reach out on WhatsApp for further help.</>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!canComplain}
                    onClick={() => setComplaintTarget({ orderNumber: selected.order.order_number, items: selected.items })}
                    className="shrink-0 rounded-sm border border-olive-400 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-olive-600 transition-colors hover:bg-olive-50 disabled:cursor-not-allowed disabled:border-border disabled:text-foreground/30 disabled:hover:bg-transparent"
                  >
                    Raise a complaint
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      </div>
      <ReviewComposer
        target={reviewTarget}
        onClose={() => setReviewTarget(null)}
        onSubmitted={(productName) => {
          setReviewableNames((prev) => {
            if (!prev) return prev;
            const next = new Set(prev);
            next.delete(productName);
            return next;
          });
          setReviewTarget(null);
        }}
      />
      <ComplaintComposer target={complaintTarget} onClose={() => setComplaintTarget(null)} onSubmitted={() => setComplaintTarget(null)} />
    </div>
  );
}

// A cross-fading slideshow for the admin-managed image slots (hero and the
// two full-bleed banners), which each hold a list of images rather than the
// single image they used to.
//
// Performance matters here — these are the largest images on the page and the
// hero is the LCP element — so only the first frame loads eagerly and with
// fetchPriority high; the rest are lazy and decode off the main thread. With
// one image it renders a plain <img> and starts no timer at all.
function ImageSlideshow({
  images,
  alt,
  intervalMs = 5000,
  showControls = false,
  className = "",
}: {
  images: string[];
  alt: string;
  intervalMs?: number;
  showControls?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  // Reset when the set of images changes (e.g. the admin removes one) so the
  // index can never point past the end of the list.
  useEffect(() => {
    setIndex(0);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          // @ts-expect-error fetchPriority is valid HTML but not yet in React's typings
          fetchpriority={i === 0 ? "high" : undefined}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      ))}

      {showControls && images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm transition-colors hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm transition-colors hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function ProductCard({
  p,
  wishlist,
  toggleWishlist,
  added,
  addToBag,
  onOpen,
}: {
  p: Product;
  wishlist: Set<string>;
  toggleWishlist: (n: string) => void;
  added: Set<string>;
  addToBag: (n: string) => void;
  onOpen: (p: Product) => void;
}) {
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const isAdded = added.has(p.name);
  const { currency } = useCurrency();
  const [imgError, setImgError] = useState(false);
  const hasRealImage = !!p.images && p.images.length > 0 && !imgError;
  return (
    <div className="group relative transition-transform duration-300 hover:-translate-y-1">
      {p.tag && (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-olive-600 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-olive-50 shadow-sm">
          {p.tag}
        </span>
      )}
      <button type="button" onClick={() => onOpen(p)} aria-label={`View ${p.name}`} className="relative block aspect-square w-full overflow-hidden shadow-xl">
        {hasRealImage ? (
          <>
            <img
              src={p.images![0]}
              alt={p.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setImgError(true)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${p.images![1] ? "group-hover:opacity-0" : ""}`}
            />
            {p.images![1] && (
              <img
                src={p.images![1]}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-100 transition-opacity duration-500 group-hover:opacity-0">
              <BeadStrand colors={p.colors} bg={p.bg} />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <BeadStrand colors={p.colors} bg={p.bg} variant="b" />
            </div>
          </>
        )}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(p.name);
        }}
        aria-label="Wishlist"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${wishlist.has(p.name) ? "fill-olive-500 text-olive-500" : "text-foreground/60"}`} />
      </button>
      <div className="pt-3">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.category}</p>
        <button type="button" onClick={() => onOpen(p)} className="text-left">
          <h3 className="mt-1 font-serif text-[15px] leading-snug hover:text-olive-600">{p.name}</h3>
        </button>
        <div className="mt-1.5 flex items-center gap-1 text-[12px] text-muted-foreground">
          <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
          {p.rating}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-lg">{formatPrice(p.price, currency)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatPrice(p.mrp, currency)}</span>
          <span className="text-xs font-medium text-olive-600">{discount}% off</span>
        </div>
        <button
          onClick={() => addToBag(p.name)}
          className={`mt-3 w-full rounded-sm py-2 text-sm font-medium transition-colors ${
            isAdded ? "bg-olive-400 text-white" : "bg-olive-600 text-background hover:bg-black"
          }`}
        >
          {isAdded ? "Added ✓" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}

function SpotlightCard({
  p,
  wishlist,
  toggleWishlist,
  added,
  addToBag,
  onOpen,
}: {
  p: Product;
  wishlist: Set<string>;
  toggleWishlist: (n: string) => void;
  added: Set<string>;
  addToBag: (n: string) => void;
  onOpen: (p: Product) => void;
}) {
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const isAdded = added.has(p.name);
  const { currency } = useCurrency();
  const [imgError, setImgError] = useState(false);
  const hasRealImage = !!p.images && p.images.length > 0 && !imgError;
  return (
    <div className="group relative">
      {p.tag && (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-olive-600 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-olive-50 shadow-sm">
          {p.tag}
        </span>
      )}
      <button type="button" onClick={() => onOpen(p)} aria-label={`View ${p.name}`} className="relative block aspect-[12/17] w-full overflow-hidden sm:aspect-square">
        {hasRealImage ? (
          <>
            <img
              src={p.images![0]}
              alt={p.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setImgError(true)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${p.images![1] ? "group-hover:opacity-0" : ""}`}
            />
            {p.images![1] && (
              <img
                src={p.images![1]}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-100 transition-opacity duration-500 group-hover:opacity-0">
              <BeadStrand colors={p.colors} bg={p.bg} />
            </div>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <BeadStrand colors={p.colors} bg={p.bg} variant="b" />
            </div>
          </>
        )}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(p.name);
        }}
        aria-label="Wishlist"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${wishlist.has(p.name) ? "fill-olive-500 text-olive-500" : "text-foreground/60"}`} />
      </button>
      <div className="pt-2 sm:pt-3">
        <p className="text-[9px] uppercase tracking-wide text-olive-50/70 sm:text-[11px]">{p.category}</p>
        <button type="button" onClick={() => onOpen(p)} className="text-left">
          <h3 className="mt-0.5 line-clamp-2 font-serif text-[12px] leading-snug text-olive-50 hover:text-gold-300 sm:mt-1 sm:text-[15px]">{p.name}</h3>
        </button>
        <div className="mt-0.5 flex items-center gap-1 text-[10px] text-olive-50/70 sm:mt-1.5 sm:text-[12px]">
          <Star className="h-2.5 w-2.5 fill-gold-300 text-gold-300 sm:h-3 sm:w-3" />
          {p.rating}
        </div>
        <div className="mt-0 flex items-baseline gap-1.5 sm:mt-2 sm:gap-2">
          <span className="font-serif text-sm text-olive-50 sm:text-lg">{formatPrice(p.price, currency)}</span>
          <span className="text-[10px] text-olive-50/50 line-through sm:text-xs">{formatPrice(p.mrp, currency)}</span>
          <span className="text-[10px] font-medium text-gold-300 sm:text-xs">{discount}% off</span>
        </div>
        <button
          onClick={() => addToBag(p.name)}
          className={`mt-1.5 w-full rounded-sm py-1.5 text-xs font-medium transition-colors sm:mt-3 sm:py-2 sm:text-sm ${
            isAdded ? "bg-olive-600 text-olive-50" : "bg-olive-50 text-foreground hover:bg-black hover:text-white"
          }`}
        >
          {isAdded ? "Added ✓" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}

// Deterministic pseudo-review-count so the same product always shows the same number
// (rather than a fresh random number on every render) — seeded from the product name.
function reviewCountFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return 24 + (h % 165);
}

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  "Hair Accessories":
    "Beaded entirely by hand using premium glass and acrylic beads, this piece is designed to sit comfortably through a full day of wear. Small variations in bead placement are part of the handcrafted charm — no two pieces are ever perfectly identical.",
  "Traditional Accessories":
    "A traditional silhouette reimagined with hand-strung beadwork, made to complement ethnic wear for weddings, festivals, and celebrations. Finished by hand for a refined, heirloom-like quality.",
  "Hair Chains":
    "A delicate beaded chain designed to drape gracefully through the hair, adding a soft shimmer to any hairstyle. Lightweight enough for all-day wear, sturdy enough for a full evening of dancing.",
  "Resin Jewellery":
    "Cast and hand-finished in resin with genuine care to detail, each piece is polished individually — so light plays across it a little differently every time you wear it.",
  "Bow":
    "A hand-beaded bow accessory, finished with a secure clip base so it holds through the day without slipping. Pairs beautifully with both casual and festive looks.",
  "Hair Pins":
    "Hand-beaded onto a sturdy pin base for secure, all-day hold. A small, elegant detail that finishes off any hairstyle — from a simple bun to an elaborate updo.",
  "Hair Brooch":
    "A statement brooch, hand-beaded and mounted on a secure pin backing. Designed to be the focal point of a hairstyle or an outfit.",
  "Initial Name Pins":
    "Personalised and hand-beaded letter by letter, this piece is made to order especially for you. A thoughtful detail — and a lovely gift for someone whose name you want to celebrate.",
  "Hair Vein":
    "A soft, trailing hair vein finished with hand-strung beads and blooms, designed to catch the light as you move. A romantic finishing touch for festive hairstyles.",
  "Kaliras":
    "Traditionally hand-strung with care, this kalira is designed to be tied onto bangles for weddings and celebrations, catching light and movement with every gesture.",
  "Jewellery":
    "Hand-beaded and finished with a secure, comfortable fastening, this piece is designed for both daily wear and special occasions alike.",
};

function ProductDetailView({
  product,
  wishlist,
  toggleWishlist,
  added,
  addToBag,
  addProductWithQuantity,
  onOpen,
  onBack,
  onBuyNow,
  cartCount,
  onOpenCart,
  onViewAllRelated,
  allProducts,
  siteSettings,
}: {
  product: Product;
  wishlist: Set<string>;
  toggleWishlist: (n: string) => void;
  added: Set<string>;
  addToBag: (n: string) => void;
  addProductWithQuantity: (p: Product, quantity: number) => void;
  onOpen: (p: Product) => void;
  onBack: () => void;
  onBuyNow: (p: Product, quantity: number) => void;
  cartCount: number;
  onOpenCart: () => void;
  onViewAllRelated: (title: string, products: Product[]) => void;
  allProducts: Product[];
  siteSettings: Record<string, string>;
}) {
  useBodyScrollLock();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product.name]);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<"description" | "care" | "shipping" | null>("description");
  const [justAdded, setJustAdded] = useState(false);
  // Colour-variant selector (task 1) — purely local UI state; there's no backend
  // field for "selected colour on an order item" yet, so the choice is folded into
  // the cart line's product name (see `cartProduct` below) to at least surface it
  // distinctly in the cart/order.
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colorOptions && product.colorOptions.length > 0 ? product.colorOptions[0] : null
  );
  // Live, verified-purchase reviews from the backend. Stays null when the
  // request fails (e.g. no backend reachable, as in the artifact preview) so
  // the section below simply doesn't render rather than showing a broken state.
  const [liveReviews, setLiveReviews] = useState<{ reviews: ReviewDto[]; count: number; average: number | null } | null>(null);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setJustAdded(false);
    setSelectedColor(product.colorOptions && product.colorOptions.length > 0 ? product.colorOptions[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.name]);

  useEffect(() => {
    let cancelled = false;
    setLiveReviews(null);
    api.reviews
      .list(product.name)
      .then((r) => {
        if (!cancelled) setLiveReviews(r);
      })
      .catch(() => {
        // no backend reachable / request failed — section stays hidden
      });
    return () => {
      cancelled = true;
    };
  }, [product.name]);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const isWishlisted = wishlist.has(product.name);
  const { currency } = useCurrency();
  const related = (() => {
    const sameCategory = allProducts.filter((p) => p.category === product.category && p.name !== product.name);
    const others = allProducts.filter((p) => p.category !== product.category && p.name !== product.name);
    return [...sameCategory, ...others].slice(0, 10);
  })();
  const relatedScrollRef = useRef<HTMLDivElement>(null);
  const [relatedScrollProgress, setRelatedScrollProgress] = useState(0);
  const scrollRelated = (dir: number) => {
    const el = relatedScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };
  const reviewCount = reviewCountFor(product.name);
  const hasRealImages = !!product.images && product.images.length > 0;
  const gallery: (number | string)[] = hasRealImages ? product.images! : [0, 90, 180, 270];
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const goToImage = (dir: 1 | -1) => {
    setActiveImage((prev) => (prev + dir + gallery.length) % gallery.length);
  };
  const handleGalleryPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragStartX(e.clientX);
    setIsZoomed(false);
  };
  const handleGalleryPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX !== null) return;
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  const handleGalleryPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (dragStartX === null) return;
    const delta = e.clientX - dragStartX;
    const SWIPE_THRESHOLD = 40;
    if (delta > SWIPE_THRESHOLD) goToImage(-1);
    else if (delta < -SWIPE_THRESHOLD) goToImage(1);
    setDragStartX(null);
  };
  const description =
    product.description ||
    PRODUCT_DESCRIPTIONS[product.category] ||
    "A handmade piece, thoughtfully beaded and finished by hand — every piece carries small, natural variations that make it one-of-a-kind.";
  // Site-wide admin copy (Settings > Materials & Care / Shipping & Returns) now wins
  // for every product; the per-product fields only serve as the fallback until the
  // admin sets the site-wide text, same as the hardcoded copy always has.
  const materialsCareText =
    siteSettings.materials_care ||
    product.materialsCare ||
    "Keep your pieces away from water, perfume, and direct sunlight. Store them in a dry pouch when not in use to keep the beads and finish looking new.";
  const shippingReturnsText =
    siteSettings.shipping_returns ||
    product.shippingReturns ||
    "Dispatched within 1-2 business days, typically arriving in 4-7 business days across India. As every piece is made to order, we don't accept returns or exchanges — please review your order carefully before placing it.";

  // When a colour is selected, fold it into the cart line's product name (there's no
  // backend field for "selected colour on an order item" yet) so it shows up
  // distinctly in the cart/order — e.g. "Rose Gold Hair Pin - Rose Gold".
  const cartProduct: Product =
    selectedColor && product.colorOptions && product.colorOptions.length > 0
      ? { ...product, name: `${product.name} - ${selectedColor}` }
      : product;

  const handleAddToBag = () => {
    addProductWithQuantity(cartProduct, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-[92] flex flex-col overflow-y-auto bg-background font-sans">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h1 className="line-clamp-1 flex-1 font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">{product.name}</h1>
        <button
          type="button"
          aria-label="Cart"
          onClick={onOpenCart}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-olive-50 hover:text-olive-500"
        >
          <ShoppingCart className="h-[18px] w-[18px]" />
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-olive-500 text-[10px] text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* ---------- Image gallery ---------- */}
          <div>
            <div
              className={`relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-sm shadow-xl ${
                dragStartX !== null ? "cursor-grabbing" : "cursor-zoom-in"
              }`}
              onPointerDown={handleGalleryPointerDown}
              onPointerMove={handleGalleryPointerMove}
              onPointerUp={handleGalleryPointerUp}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setIsZoomed(true);
              }}
              onPointerLeave={() => {
                setDragStartX(null);
                setIsZoomed(false);
              }}
            >
              <div
                className="h-full w-full transition-transform duration-150 ease-out"
                style={{
                  transform: isZoomed ? "scale(1.9)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }}
              >
                {hasRealImages ? (
                  <img
                    src={gallery[activeImage] as string}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <BeadStrand colors={product.colors} bg={product.bg} size={26} rotateDeg={gallery[activeImage] as number} />
                )}
              </div>
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-sm bg-olive-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-olive-50 shadow-sm">
                  {product.tag}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product.name)}
                aria-label="Wishlist"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-olive-500 text-olive-500" : "text-foreground/60"}`} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(-1);
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(1);
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((deg, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-square overflow-hidden rounded-sm transition-all ${
                    activeImage === i ? "ring-2 ring-olive-600 ring-offset-2 ring-offset-background" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {hasRealImages ? (
                    <img src={deg as string} alt="" className="h-full w-full object-cover" draggable={false} />
                  ) : (
                    <BeadStrand colors={product.colors} bg={product.bg} size={20} rotateDeg={deg as number} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- Info panel ---------- */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</p>
                <h2 className="mt-1.5 font-serif text-2xl leading-snug text-foreground md:text-3xl">{product.name}</h2>
              </div>
              <button
                onClick={() => {
                  try {
                    navigator.clipboard?.writeText(`${product.name} — Beauty of Beads`);
                  } catch {
                    // clipboard unavailable — quietly ignore, this is a nice-to-have
                  }
                }}
                aria-label="Share"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-olive-500 hover:text-olive-600"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-olive-600" />
              Handcrafted Finish
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold-400 text-gold-400" : "text-border"}`}
                  />
                ))}
              </span>
              <span className="font-medium text-foreground">{product.rating}</span>
              <span className="text-foreground/50">· {reviewCount} reviews</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-foreground">{formatPrice(product.price, currency)}</span>
              <span className="text-base text-muted-foreground line-through">{formatPrice(product.mrp, currency)}</span>
              <span className="text-sm font-medium text-olive-600">{discount}% off</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/75">{description}</p>

            {/* Product videos — kept out of the photo gallery, shown alongside the description instead */}
            {product.videos && product.videos.length > 0 && (
              <div className="mt-4 max-w-md">
                <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  {product.videos.length > 1 ? "Videos" : "Video"}
                </span>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.videos.map((v, i) => (
                    <video
                      key={i}
                      src={v}
                      controls
                      playsInline
                      className="aspect-[9/16] w-full rounded-sm bg-black object-cover shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Colour variants — plain text labels the admin entered; no colour swatch
                data exists on the order, so this is tracked purely in local state. */}
            {product.colorOptions && product.colorOptions.length > 0 && (
              <div className="mt-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
                  Colour{selectedColor ? `: ${selectedColor}` : ""}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`rounded-sm border px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                        selectedColor === c
                          ? "border-olive-600 bg-olive-600 text-olive-50"
                          : "border-border text-foreground/70 hover:border-olive-400"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground/60">Quantity</span>
              <div className="flex items-center rounded-sm border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-9 w-9 items-center justify-center text-foreground/70 hover:bg-olive-50"
                >
                  −
                </button>
                <span className="w-9 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-9 w-9 items-center justify-center text-foreground/70 hover:bg-olive-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleAddToBag}
                className={`flex-1 rounded-sm py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  justAdded ? "bg-olive-400 text-white" : "bg-olive-600 text-background hover:bg-black"
                }`}
              >
                {justAdded ? "Added to Bag ✓" : "Add to Bag"}
              </button>
              <button
                onClick={() => onBuyNow(cartProduct, quantity)}
                className="flex-1 rounded-sm border border-foreground py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Buy It Now
              </button>
            </div>
            <button
              onClick={() => toggleWishlist(product.name)}
              className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-olive-600"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-olive-500 text-olive-500" : ""}`} />
              {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
            </button>

            {/* Coupons & offers */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-sm border border-dashed border-olive-400 bg-olive-50/60 px-3.5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-olive-700">Free Shipping</p>
                <p className="mt-1 text-[11px] leading-snug text-foreground/60">
                  On orders above ₹3,000. Applied automatically at checkout.
                </p>
              </div>
              <div className="rounded-sm border border-dashed border-olive-400 bg-olive-50/60 px-3.5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-olive-700">Flat 10% Off</p>
                <p className="mt-1 text-[11px] leading-snug text-foreground/60">
                  On orders above ₹5,000 for first-time orders. Code: WELCOME10
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-7 grid grid-cols-2 gap-y-5 border-y border-border py-6 text-center sm:grid-cols-4 sm:gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="h-5 w-5 text-foreground/60" />
                <p className="text-[10.5px] leading-tight text-foreground/60">Free shipping above ₹3,000</p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Award className="h-5 w-5 text-foreground/60" />
                <p className="text-[10.5px] leading-tight text-foreground/60">Premium handcrafted quality</p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-foreground/60" />
                <p className="text-[10.5px] leading-tight text-foreground/60">100% secure checkout</p>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Globe className="h-5 w-5 text-foreground/60" />
                <p className="text-[10.5px] leading-tight text-foreground/60">Shipping worldwide</p>
              </div>
            </div>

            {/* Accordion: description / care / shipping */}
            <div className="mt-2 divide-y divide-border">
              {(
                [
                  { key: "description" as const, label: "Description", body: description },
                  {
                    key: "care" as const,
                    label: "Materials & Care",
                    body: materialsCareText,
                  },
                  {
                    key: "shipping" as const,
                    label: "Shipping & Returns",
                    body: shippingReturnsText,
                  },
                ]
              ).map((section) => (
                <div key={section.key} className="py-3.5">
                  <button
                    onClick={() => setOpenSection((s) => (s === section.key ? null : section.key))}
                    className="flex w-full items-center justify-between gap-4 text-left text-xs font-semibold uppercase tracking-wide text-foreground"
                  >
                    {section.label}
                    <ChevronDown className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${openSection === section.key ? "rotate-180" : ""}`} />
                  </button>
                  {openSection === section.key && (
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground/70">{section.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {liveReviews && (
          <div className="mt-16 border-t border-border pt-10">
            <h3 className="mb-6 text-center font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">Customer Reviews</h3>
            {liveReviews.count === 0 ? (
              <p className="mx-auto max-w-sm text-center text-sm text-foreground/60">
                No reviews yet — once your delivered order arrives, you can be the first to review this product from My Orders.
              </p>
            ) : (
              <div className="mx-auto max-w-2xl">
                <div className="mb-8 flex items-center justify-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`h-5 w-5 ${
                          liveReviews.average && liveReviews.average >= n - 0.5 ? "fill-gold-400 text-gold-400" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-serif text-lg">{liveReviews.average?.toFixed(1)}</span>
                  <span className="text-sm text-foreground/50">
                    · {liveReviews.count} verified {liveReviews.count === 1 ? "review" : "reviews"}
                  </span>
                </div>
                <div className="flex flex-col gap-6">
                  {liveReviews.reviews.map((r) => (
                    <div key={r.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className={`h-3.5 w-3.5 ${r.rating >= n ? "fill-gold-400 text-gold-400" : "text-border"}`} />
                        ))}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{r.comment}</p>
                      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-foreground/50">
                        {r.reviewer_name} · Verified Buyer · {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <div className="relative mb-3 flex items-center justify-center sm:mb-6">
              <h3 className="font-serif text-xl uppercase tracking-wide text-olive-600 md:text-2xl">You may also like</h3>
              <div className="absolute right-0 hidden gap-2 sm:flex">
                <button
                  type="button"
                  aria-label="Scroll related products left"
                  onClick={() => scrollRelated(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-card"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll related products right"
                  onClick={() => scrollRelated(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-card"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              ref={relatedScrollRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                const maxScroll = el.scrollWidth - el.clientWidth;
                setRelatedScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
              }}
              className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth pb-2 pt-3"
            >
              {related.map((p) => (
                <div
                  key={p.name}
                  className="basis-[calc((100%-1.25rem)/2)] flex-shrink-0 md:basis-[calc((100%-2.5rem)/3)] lg:basis-[calc((100%-3.75rem)/4)]"
                  style={{ minWidth: 0 }}
                >
                  <ProductCard p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={onOpen} />
                </div>
              ))}
            </div>
            <div className="relative mx-auto mt-5 h-1 w-20 overflow-hidden rounded-full bg-border sm:hidden">
              <div
                className="absolute left-0 top-0 h-full w-7 rounded-full bg-olive-600 transition-transform duration-150 ease-out"
                style={{ transform: `translateX(${relatedScrollProgress * (80 - 28)}px)` }}
              />
            </div>
            <div className="mt-6 flex justify-center sm:mt-8">
              <button
                type="button"
                onClick={() => onViewAllRelated("You May Also Like", related)}
                className="rounded-sm bg-olive-600 px-5 py-2 text-xs font-medium uppercase tracking-wide text-background transition-colors hover:bg-black sm:px-8 sm:py-3 sm:text-sm"
              >
                View All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const { user, ready, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const [wishlistPanelOpen, setWishlistPanelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ordersViewOpen, setOrdersViewOpen] = useState(false);
  const [trackOrderNumber, setTrackOrderNumber] = useState<string | null>(null);
  const openOrdersView = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    setTrackOrderNumber(null);
    setOrdersViewOpen(true);
  };
  const handleOrderPlaced = (orderNumber: string) => {
    setCartItems([]);
    setAdded(new Set());
    setCheckoutOpen(false);
    setTrackOrderNumber(orderNumber);
    setOrdersViewOpen(true);
  };
  // Everything the homepage renders, in ONE request.
  //
  // This used to be four calls (products, categories, site-settings,
  // featured-reviews), and the products one asked for ?limit=500 so the four
  // carousels could be filtered out of it client-side. The products endpoint
  // caps limit at 60, so with a 400-product catalogue any bestseller ranked
  // below 60th silently disappeared from the homepage. /api/homepage queries
  // each carousel directly, in the admin's chosen order, so that can't happen.
  const [homepage, setHomepage] = useState<HomepagePayload | null>(null);
  useEffect(() => {
    let cancelled = false;
    api.homepage
      .get()
      .then((r) => {
        if (!cancelled) setHomepage(r);
      })
      .catch(() => {
        // no backend reachable — every reader below falls back to the
        // built-in placeholder content, exactly as before
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // The full catalogue, needed only by search and "Shop All" — not by the
  // homepage itself any more. Deferred until the browser is idle so it never
  // competes with first paint.
  const [liveProducts, setLiveProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      api.products
        .list({ limit: 60 })
        .then((r) => {
          if (!cancelled && r.products.length > 0) setLiveProducts(r.products.map(dtoToProduct));
        })
        .catch(() => {
          // no backend reachable — keep showing the placeholder catalog
        });
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const handle = idle ? idle(load, { timeout: 2000 }) : window.setTimeout(load, 400);
    return () => {
      cancelled = true;
      const cancelIdle = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (idle && cancelIdle) cancelIdle(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, []);

  // A section falls back to its placeholder array only while the homepage
  // payload is still loading or the admin has flagged nothing into it, so the
  // page is never empty during setup.
  const sectionOr = (key: HomepageSectionKey, fallback: Product[]) => {
    const live = homepage?.sections[key];
    return live && live.length > 0 ? live.map(cardDtoToProduct) : fallback;
  };

  const allProducts = liveProducts ?? ALL_PRODUCTS;
  const topPicks = sectionOr("topPicks", TOP_PICKS);
  const featuredProducts = sectionOr("shopByTrend", FEATURED_PRODUCTS);
  const newArrivals = sectionOr("newArrivals", NEW_ARRIVALS);
  const spotlightPicks = sectionOr("spotlight", SPOTLIGHT_PICKS);

  const heroImages = homepage?.images.hero ?? [];
  const heritageBannerImages = homepage?.images.heritageBanner ?? [];
  const storeVisitBannerImages = homepage?.images.storeVisitBanner ?? [];

  // Site-wide copy the product detail page reads. Any key can be missing
  // until the admin sets it — every reader below falls back to hardcoded copy.
  const siteSettings: Record<string, string> = {
    materials_care: homepage?.settings.materials_care || "",
    shipping_returns: homepage?.settings.shipping_returns || "",
  };

  // Admin-managed "Shop by Category" tiles, falling back to the hardcoded
  // FEATURED_TILES list until the admin adds any.
  const liveCategories = homepage && homepage.categories.length > 0 ? homepage.categories : null;

  const homepageReviews =
    homepage && homepage.featuredReviews.length > 0
      ? homepage.featuredReviews.map((r) => ({ name: r.reviewer_name, rating: r.rating, text: r.comment }))
      : REVIEWS;

  const [productListView, setProductListView] = useState<{ title: string; products: Product[] } | null>(null);
  const openCategoryView = (categoryName: string) => {
    setProductListView({
      title: categoryName,
      products: allProducts.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase()),
    });
  };
  const openGroupView = (group: { label: string; items: string[] }) => {
    const items = group.items.map((i) => i.toLowerCase());
    setProductListView({
      title: group.label,
      products: allProducts.filter((p) => items.includes(p.category.toLowerCase())),
    });
  };
  const [legalView, setLegalView] = useState<"privacy" | "terms" | null>(null);
  const [profileViewOpen, setProfileViewOpen] = useState(false);
  const [allCollectionsOpen, setAllCollectionsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const openProduct = (p: Product) => setSelectedProduct(p);
  const [cartItems, setCartItems] = useState<CartItemDto[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItemDto[]>([]);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const wishlist = new Set(wishlistItems.map((i) => i.product_name));
  const prevAuthUserRef = useRef<typeof user>(null);
  useEffect(() => {
    if (!ready) return;
    const wasGuest = !prevAuthUserRef.current;
    prevAuthUserRef.current = user;
    if (user) {
      // logging in: push any locally-added guest cart/wishlist items to the account first
      // (so nothing added before logging in gets lost), then load the account's real,
      // persisted cart & wishlist from the backend.
      const sync = async () => {
        if (wasGuest && (cartItems.length || wishlistItems.length)) {
          await Promise.allSettled([
            ...cartItems.map((i) =>
              api.cart.add({ productName: i.product_name, productPrice: i.product_price, quantity: i.quantity, productImage: i.product_image || undefined })
            ),
            ...wishlistItems.map((i) =>
              api.wishlist.add({ productName: i.product_name, productPrice: i.product_price, productImage: i.product_image || undefined })
            ),
          ]);
        }
        const [cart, wl] = await Promise.all([api.cart.list(), api.wishlist.list()]);
        setCartItems(cart.items);
        setWishlistItems(wl.items);
      };
      sync().catch(() => {
        // backend unreachable (e.g. Artifact CSP sandbox, or offline) — keep whatever local state we have
      });
    } else {
      setCartItems([]);
      setWishlistItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("loading");
    try {
      const res = await api.newsletter.subscribe(newsletterEmail.trim());
      setNewsletterStatus("success");
      setNewsletterMessage(res.alreadySubscribed ? "You're already on the list!" : "You're in! Watch your inbox.");
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterStatus("error");
      setNewsletterMessage(err instanceof ApiError ? err.message : "Couldn't subscribe right now. Please try again.");
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(COLLECTION_GROUPS[0].key);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const topPicksScrollRef = useRef<HTMLDivElement>(null);
  const [topPicksScrollProgress, setTopPicksScrollProgress] = useState(0);
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const [featuredScrollProgress, setFeaturedScrollProgress] = useState(0);
  const spotlightScrollRef = useRef<HTMLDivElement>(null);
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const scrollRow = (ref: { current: HTMLDivElement | null }, dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };
  const scrollCategories = (dir: number) => scrollRow(categoryScrollRef, dir);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [slide, setSlide] = useState(0);
  const [spotlightActive, setSpotlightActive] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ name: string; bg: string } | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    if (activeVideo) {
      const id = requestAnimationFrame(() => setVideoVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [activeVideo]);

  const closeVideo = () => {
    setVideoVisible(false);
    setTimeout(() => setActiveVideo(null), 300);
  };
  const instaScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = spotlightScrollRef.current;
    if (!container) return;

    // every card now has the SAME fixed flex-basis (the "grow" is a pure transform:
    // scale on the inner card, which never changes the layout box) — so the target
    // card's box position can be computed analytically without waiting on any layout
    // transition at all, and the scroll + scale-up start perfectly together.
    const vw = window.innerWidth;
    const cardFrac = vw >= 768 ? 0.2 : vw >= 640 ? 0.3 : 0.44;
    const gap = vw >= 640 ? 32 : 8; // gap-8 (sm+) / gap-2 (mobile)
    const containerWidth = container.clientWidth;
    const cardWidth = containerWidth * cardFrac;

    const offsetLeft = spotlightActive * (cardWidth + gap);
    const target = Math.max(0, offsetLeft - (containerWidth - cardWidth) / 2);

    // drive the scroll manually with the SAME duration + easing curve as the tile's
    // width transition (duration-500 ease-out) instead of the browser's native
    // "smooth" scroll — mismatched timing between the two is what caused the jitter,
    // syncing them makes the grow + slide read as one single smooth motion.
    const start = container.scrollLeft;
    const distance = target - start;
    const duration = 500;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let startTime: number | undefined;
    let frame: number;

    const step = (now: number) => {
      if (startTime === undefined) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      container.scrollLeft = start + distance * easeOutCubic(t);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [spotlightActive]);

  useEffect(() => {
    // auto-advance the Spotlight carousel every 5s; resets on any change (including a
    // manual prev/next click or tapping a tile), so it's always "5s since the last move".
    const id = setInterval(() => {
      setSpotlightActive((i) => (i + 1) % spotlightPicks.length);
    }, 5000);
    return () => clearInterval(id);
  }, [spotlightActive]);

  useEffect(() => {
    // mobile-only: default "Your Next Obsession" scroll so the 2nd tile starts centered,
    // with the 1st and 3rd tiles peeking in half on either side.
    const el = videoScrollRef.current;
    if (!el || window.innerWidth >= 640) return;
    const applyOffset = () => {
      const containerWidth = el.clientWidth;
      const cardWidth = containerWidth * 0.43;
      const gap = 20; // gap-5
      const secondCardCenter = cardWidth + gap + cardWidth / 2;
      const target = Math.max(0, secondCardCenter - containerWidth / 2);
      // scroll-smooth (CSS scroll-behavior) hijacks direct scrollLeft assignment in some
      // browsers, animating it (and sometimes losing the jump entirely) — force an instant
      // jump for this initial positioning, then hand behavior back to the CSS class.
      const prevBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = target;
      el.style.scrollBehavior = prevBehavior;
    };
    // run after layout/paint has fully settled (fonts/images can still shift widths a frame later)
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(applyOffset);
      (el as any)._raf2 = raf2;
    });
    return () => {
      cancelAnimationFrame(raf1);
      if ((el as any)._raf2) cancelAnimationFrame((el as any)._raf2);
    };
  }, []);

  const reviewScrollRef = useRef<HTMLDivElement>(null);
  const [reviewActive, setReviewActive] = useState(0);

  useEffect(() => {
    const container = reviewScrollRef.current;
    if (!container) return;
    if (window.innerWidth < 640) return; // mobile: auto-scroll marquee effect handles positioning instead

    const vw = window.innerWidth;
    const cardFrac = vw >= 768 ? 0.18 : vw >= 640 ? 0.3 : 0.85;
    const gap = 32; // gap-8
    const containerWidth = container.clientWidth;
    const cardWidth = containerWidth * cardFrac;

    const offsetLeft = reviewActive * (cardWidth + gap);
    const target = Math.max(0, offsetLeft - (containerWidth - cardWidth) / 2);

    const start = container.scrollLeft;
    const distance = target - start;
    const duration = 500;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let startTime: number | undefined;
    let frame: number;

    const step = (now: number) => {
      if (startTime === undefined) startTime = now;
      const t = Math.min(1, (now - startTime) / duration);
      container.scrollLeft = start + distance * easeOutCubic(t);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [reviewActive]);

  useEffect(() => {
    // mobile-only: continuous slow auto-scroll marquee, looping seamlessly.
    const el = reviewScrollRef.current;
    if (!el || window.innerWidth >= 640) return;

    let frame: number;
    let halfWidth = 0;
    let pos = el.scrollLeft; // track position as a float; el.scrollLeft itself rounds to an int,
    // so accumulating sub-pixel increments directly on it would never move

    const measure = () => {
      halfWidth = el.scrollWidth / 2;
    };

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(measure);
    });

    const speed = 0.18; // px per frame, even slower

    const step = () => {
      if (halfWidth > 0) {
        pos += speed;
        if (pos >= halfWidth) {
          pos -= halfWidth;
        }
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // mobile-only: same default-centering treatment as "Your Next Obsession" —
    // 2nd tile starts centered, 1st/3rd peek in half on either side.
    const el = instaScrollRef.current;
    if (!el || window.innerWidth >= 640) return;
    const applyOffset = () => {
      const containerWidth = el.clientWidth;
      const cardWidth = containerWidth * 0.43;
      const gap = 20; // gap-5
      const secondCardCenter = cardWidth + gap + cardWidth / 2;
      const target = Math.max(0, secondCardCenter - containerWidth / 2);
      const prevBehavior = el.style.scrollBehavior;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = target;
      el.style.scrollBehavior = prevBehavior;
    };
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(applyOffset);
      (el as any)._raf2 = raf2;
    });
    return () => {
      cancelAnimationFrame(raf1);
      if ((el as any)._raf2) cancelAnimationFrame((el as any)._raf2);
    };
  }, []);

  const [offerIndex, setOfferIndex] = useState(0);
  const [currency, setCurrency] = useState<CurrencyOption>(CURRENCIES[0]);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);
  const currencyMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currencyMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target as Node)) {
        setCurrencyMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [currencyMenuOpen]);
  const [storySlide, setStorySlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStorySlide((s) => (s + 1) % STORY_SLIDES.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setOfferIndex((i) => (i + 1) % OFFERS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const toggleWishlist = (name: string) => {
    const isWishlisted = wishlistItems.some((i) => i.product_name === name);
    if (isWishlisted) {
      setWishlistItems((prev) => prev.filter((i) => i.product_name !== name));
      if (user) api.wishlist.removeByName(name).catch(() => {});
      return;
    }
    const product = allProducts.find((p) => p.name === name);
    if (!product) return;
    const image = product.images?.[0] || null;
    setWishlistItems((prev) => [...prev, { id: -Date.now(), product_name: name, product_price: product.price, product_image: image }]);
    if (user) {
      api.wishlist
        .add({ productName: name, productPrice: product.price, productImage: image || undefined })
        .then((r) => setWishlistItems(r.items))
        .catch(() => {});
    }
  };

  const addToBag = (name: string) => {
    if (added.has(name)) return;
    setAdded((prev) => new Set(prev).add(name));
    const product = allProducts.find((p) => p.name === name);
    if (!product) return;
    // Note: images are populated on `product` for every product, from either the
    // live catalog or the placeholder fallback — pull the first one through here
    // and to the backend so the cart drawer and account cart both show a real
    // product photo instead of the old blank-icon placeholder.
    const image = product.images?.[0] || null;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product_name === name);
      if (existing) {
        return prev.map((i) => (i.product_name === name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: -Date.now(), product_name: name, product_price: product.price, product_image: image, quantity: 1 }];
    });
    if (user) {
      api.cart
        .add({ productName: name, productPrice: product.price, productImage: image || undefined })
        .then((r) => setCartItems(r.items))
        .catch(() => {});
    }
  };

  // Used by the product detail page's quantity selector — unlike addToBag (which only
  // ever adds one unit, and only once per button, for the compact product-card button),
  // this adds an explicit quantity and can be called again to add more.
  const addProductWithQuantity = (product: Product, quantity: number) => {
    setAdded((prev) => new Set(prev).add(product.name));
    const image = product.images?.[0] || null;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product_name === product.name);
      if (existing) {
        return prev.map((i) => (i.product_name === product.name ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id: -Date.now(), product_name: product.name, product_price: product.price, product_image: image, quantity }];
    });
    if (user) {
      api.cart
        .add({ productName: product.name, productPrice: product.price, quantity, productImage: image || undefined })
        .then((r) => setCartItems(r.items))
        .catch(() => {});
    }
  };

  const updateCartQuantity = (item: CartItemDto, quantity: number) => {
    if (quantity < 1) {
      removeCartItem(item);
      return;
    }
    setCartItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity } : i)));
    if (user && item.id > 0) {
      api.cart.updateQuantity(item.id, quantity).catch(() => {});
    }
  };

  const removeCartItem = (item: CartItemDto) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    setAdded((prev) => {
      const next = new Set(prev);
      next.delete(item.product_name);
      return next;
    });
    if (user && item.id > 0) {
      api.cart.remove(item.id).catch(() => {});
    }
  };

  const moveWishlistItemToCart = (item: WishlistItemDto) => {
    addToBag(item.product_name);
    toggleWishlist(item.product_name);
  };

  useEffect(() => {
    // Guard against page-wide horizontal overflow at the html/body level instead of on an
    // inner wrapper div. Using overflow-x: clip (not hidden) avoids a CSS quirk where setting
    // only one of overflow-x/overflow-y forces the other to compute as "auto" — which would
    // turn html/body into a distinct scroll container and break `position: sticky` on the
    // header. `clip` doesn't establish a scrollable box, so it's exempt from that promotion.
    document.documentElement.style.overflowX = "clip";
    document.body.style.overflowX = "clip";
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
    <div className="min-h-screen bg-background text-foreground">
      {/* Offer strip — fixed position, text cycles (no scroll/marquee) */}
      <div className="relative flex h-9 items-center justify-center overflow-hidden bg-olive-600 px-6 text-olive-50">
        <span key={offerIndex} className="animate-offer-fade text-center text-xs font-medium tracking-wide sm:text-[13px]">
          ✦ {OFFERS[offerIndex]}
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-8 md:py-4">
          <div className="flex items-center gap-6">
            <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <nav className="hidden items-center gap-7 font-serif text-[15px] md:flex">
              <a href="#top" className="text-foreground/80 transition-colors hover:text-olive-500">Home</a>
              <div className="relative" ref={currencyMenuRef}>
                <button
                  type="button"
                  aria-label="Select country and currency"
                  onClick={() => setCurrencyMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-olive-500"
                >
                  <img src={flagUrl(currency.flagCode)} alt="" className="h-3.5 w-5 rounded-[2px] object-cover shadow-sm" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                  <span className="font-serif text-[15px]">{currency.country} ({currency.code})</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${currencyMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {currencyMenuOpen && (
                  <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-64 overflow-y-auto rounded-xl border border-border bg-card py-2 shadow-xl">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.country}
                        type="button"
                        onClick={() => {
                          setCurrency(c);
                          setCurrencyMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm transition-colors ${
                          currency.country === c.country ? "bg-olive-50 font-semibold text-olive-600" : "text-foreground/75 hover:bg-olive-50/60"
                        }`}
                      >
                        <img src={flagUrl(c.flagCode)} alt="" className="h-3.5 w-5 rounded-[2px] object-cover shadow-sm" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                        <span className="flex-1">{c.country}</span>
                        <span className="text-xs text-foreground/50">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <a href="#top" className="select-none whitespace-nowrap text-center font-serif italic tracking-tight text-olive-600 md:justify-self-center">
            <span className="block text-lg sm:text-xl md:text-3xl">Beauty of Beads</span>
          </a>

          <div className="flex items-center justify-end gap-4 sm:gap-6">
            <nav className="hidden items-center gap-7 font-serif text-[15px] md:flex">
              <div className="group relative">
                <button className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-olive-500">
                  Collections <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute right-0 top-full z-50 flex overflow-hidden rounded-xl border border-border bg-card opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="w-56 divide-y divide-border/60 border-r border-border bg-olive-50/50 py-2">
                    {COLLECTION_GROUPS.map((g) => (
                      <button
                        key={g.key}
                        onMouseEnter={() => setActiveGroup(g.key)}
                        className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wide transition-colors ${
                          activeGroup === g.key ? "bg-card text-olive-500" : "text-foreground/70 hover:bg-card/70"
                        }`}
                      >
                        {g.label} <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                  <div className="w-52 p-5">
                    <ul className="space-y-2 text-sm">
                      <li
                        className="cursor-pointer font-semibold text-olive-500 hover:text-olive-600"
                        onClick={() => {
                          const group = COLLECTION_GROUPS.find((g) => g.key === activeGroup);
                          if (group) openGroupView(group);
                        }}
                      >
                        Shop All
                      </li>
                      {COLLECTION_GROUPS.find((g) => g.key === activeGroup)?.items.map((l) => (
                        <li
                          key={l}
                          className="cursor-pointer text-foreground/75 hover:text-olive-500"
                          onClick={() => openCategoryView(l)}
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <a href="#contact" className="text-foreground/80 transition-colors hover:text-olive-500">Contact Us</a>
            </nav>
            <div className="flex items-center gap-4">
              <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)} className="flex items-center justify-center border-none bg-transparent p-0">
                <Search className="h-[18px] w-[18px] cursor-pointer text-foreground/70 hover:text-olive-500 sm:h-5 sm:w-5" />
              </button>
              <button
                type="button"
                aria-label="Wishlist"
                onClick={() => setWishlistPanelOpen(true)}
                className="relative flex items-center gap-1.5 border-none bg-transparent p-0"
              >
                <Heart className={`h-[18px] w-[18px] cursor-pointer ${wishlist.size > 0 ? "fill-olive-500 text-olive-500" : "text-foreground/70"} hover:text-olive-500 sm:h-5 sm:w-5`} />
                {wishlist.size > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-olive-500 text-[10px] text-white">
                    {wishlist.size}
                  </span>
                )}
              </button>
              <button
                type="button"
                aria-label="Cart"
                onClick={() => setCartPanelOpen(true)}
                className="relative flex items-center gap-1.5 border-none bg-transparent p-0"
              >
                <ShoppingCart className="h-[18px] w-[18px] cursor-pointer text-foreground/70 hover:text-olive-500 sm:h-5 sm:w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-olive-500 text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              {!ready ? (
                // Session check (GET /api/auth/me) still in flight — show a neutral,
                // non-committal placeholder instead of the "logged out" icon so an
                // already-signed-in visitor never sees a guest icon flash to an avatar
                // a moment later, which is what read as "the page just reloaded".
                <span
                  aria-hidden="true"
                  className="h-[18px] w-[18px] animate-pulse rounded-full bg-foreground/10 sm:h-5 sm:w-5"
                />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label={`Account: ${user.name}`}
                      title={user.name}
                      className="flex items-center justify-center border-none bg-transparent p-0"
                    >
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-olive-500 text-[10px] font-semibold uppercase text-white transition-colors duration-200 sm:h-5 sm:w-5">
                        {user.name.trim().charAt(0) || "U"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 rounded-sm border-border bg-card p-1.5 font-sans shadow-xl">
                    <DropdownMenuItem
                      onSelect={() => setProfileViewOpen(true)}
                      className="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground/80 focus:bg-olive-50 focus:text-olive-600"
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={openOrdersView}
                      className="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground/80 focus:bg-olive-50 focus:text-olive-600"
                    >
                      Order History
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => logout()}
                      className="cursor-pointer rounded-sm px-3 py-2 text-sm text-foreground/80 focus:bg-olive-50 focus:text-olive-600"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  type="button"
                  aria-label="Log in"
                  title="Log in"
                  onClick={openAuthModal}
                  className="flex items-center justify-center border-none bg-transparent p-0"
                >
                  <User className="h-[18px] w-[18px] cursor-pointer text-foreground/70 transition-colors duration-200 hover:text-olive-500 sm:h-5 sm:w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-3 font-serif text-base md:hidden">
            <a href="#top" className="py-2" onClick={() => setMenuOpen(false)}>Home</a>
            <div className="py-2">
              <button
                type="button"
                className="flex w-full items-center justify-between py-2 text-left"
                onClick={() => setMobileCurrencyOpen((v) => !v)}
              >
                <span className="flex items-center gap-2">
                  <img src={flagUrl(currency.flagCode)} alt="" className="h-3.5 w-5 rounded-[2px] object-cover shadow-sm" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                  {currency.country} ({currency.code})
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileCurrencyOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileCurrencyOpen && (
                <div className="max-h-64 overflow-y-auto rounded-sm border border-border">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.country}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setMobileCurrencyOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm ${
                        currency.country === c.country ? "bg-olive-50 font-semibold text-olive-600" : "text-foreground/75"
                      }`}
                    >
                      <img src={flagUrl(c.flagCode)} alt="" className="h-3.5 w-5 rounded-[2px] object-cover shadow-sm" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                      <span className="flex-1">{c.country}</span>
                      <span className="text-xs text-foreground/50">{c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className="flex items-center justify-between py-2 text-left"
              onClick={() => {
                setAllCollectionsOpen(true);
                setMenuOpen(false);
              }}
            >
              Collections <ChevronRight className="h-4 w-4 text-foreground/40" />
            </button>
            <a href="#contact" className="py-2" onClick={() => setMenuOpen(false)}>Contact Us</a>
            {ready && (
              <button
                type="button"
                className="mt-2 w-full rounded-sm border border-foreground/20 py-2.5 text-center text-sm font-sans font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
                onClick={() => {
                  setMenuOpen(false);
                  if (user) {
                    logout();
                  } else {
                    openAuthModal();
                  }
                }}
              >
                {user ? `Log Out (${user.name.split(" ")[0]})` : "Log In"}
              </button>
            )}
          </nav>
        )}
      </header>

      {/* Hero — auto-sliding */}
      <section id="top" className="relative overflow-hidden">
        <div className="relative h-[calc(100vh-13rem)] min-h-[340px] w-full sm:h-auto sm:aspect-[21/9]">
          {/* Admin-uploaded hero images take over completely when present;
              the decorative bead strands are only the pre-setup fallback. */}
          {heroImages.length > 0 ? (
            <ImageSlideshow images={heroImages} alt="Beauty of Beads" showControls intervalMs={5000} />
          ) : (
            <>
              {HERO_SLIDES.map((s, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
                >
                  <BeadStrand colors={s.colors} bg={s.bg} size={20} />
                </div>
              ))}
              <button
                aria-label="Previous slide"
                onClick={() => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next slide"
                onClick={() => setSlide((s) => (s + 1) % HERO_SLIDES.length)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-2 px-6">
            <a
              href="#top-picks"
              className="inline-flex items-center gap-2 rounded-sm border border-olive-50 bg-transparent px-7 py-3 text-sm font-medium text-olive-50 transition-colors hover:border-black hover:bg-black"
            >
              Shop <ArrowRight className="h-4 w-4" />
            </a>
            {heroImages.length === 0 && (
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-olive-500" : "w-1.5 bg-olive-500/40"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured category tiles — every category, horizontal scroll, full-bleed */}
      <section id="category" className="w-full pb-0 pt-8">
        <div className="relative mb-2 flex items-center justify-center px-5 sm:mb-4 md:px-8">
          <h2 className="font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Shop by Category</h2>
          <div className="absolute right-5 hidden gap-2 sm:flex md:right-8">
            <button
              aria-label="Scroll categories left"
              onClick={() => scrollCategories(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-olive-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Scroll categories right"
              onClick={() => scrollCategories(1)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-olive-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          ref={categoryScrollRef}
          className="scrollbar-hide flex w-full gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 sm:pb-10 sm:pt-6"
        >
          {liveCategories
            ? liveCategories.map((c, i) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => openCategoryView(c.name)}
                  className="group relative z-0 flex flex-shrink-0 origin-top basis-[calc(25%-1.125rem)] flex-col items-center gap-2.5 border-none bg-transparent text-center transition-transform duration-300 hover:z-20 hover:scale-110 sm:basis-[calc(20%-1.2rem)] md:basis-[calc(16.666%-1.25rem)]"
                >
                  <div className="aspect-square w-full max-w-[7.5rem] overflow-hidden rounded-full ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt={c.name} loading="lazy" decoding="async" className="h-full w-full object-cover" draggable={false} />
                    ) : (
                      <BeadStrand colors={TILE_PALETTE[i % TILE_PALETTE.length].colors} bg={TILE_PALETTE[i % TILE_PALETTE.length].bg} size={8} />
                    )}
                  </div>
                  <span className="font-serif text-[13px] leading-tight sm:text-sm">{c.name}</span>
                </button>
              ))
            : FEATURED_TILES.map((t) => (
                <button
                  type="button"
                  key={t.name}
                  onClick={() => openCategoryView(t.name)}
                  className="group relative z-0 flex flex-shrink-0 origin-top basis-[calc(25%-1.125rem)] flex-col items-center gap-2.5 border-none bg-transparent text-center transition-transform duration-300 hover:z-20 hover:scale-110 sm:basis-[calc(20%-1.2rem)] md:basis-[calc(16.666%-1.25rem)]"
                >
                  <div className="aspect-square w-full max-w-[7.5rem] overflow-hidden rounded-full ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
                    <BeadStrand colors={t.colors} bg={t.bg} size={8} />
                  </div>
                  <span className="font-serif text-[13px] leading-tight sm:text-sm">{t.name}</span>
                </button>
              ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="top-picks" className="bg-olive-50 pb-8 pt-1 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-3 flex items-center justify-center px-5 sm:mb-8 md:px-8">
            <h2 className="font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Best Sellers</h2>
            <div className="absolute right-5 hidden gap-2 sm:flex md:right-8">
              <button
                aria-label="Scroll best sellers left"
                onClick={() => scrollRow(topPicksScrollRef, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-card"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Scroll best sellers right"
                onClick={() => scrollRow(topPicksScrollRef, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-card"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={topPicksScrollRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const maxScroll = el.scrollWidth - el.clientWidth;
              setTopPicksScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
            }}
            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-5 pb-2 pt-3"
          >
            {topPicks.map((p) => (
              <div
                key={p.name}
                className="basis-[calc((100%-1.25rem)/2)] flex-shrink-0 md:basis-[calc((100%-2.5rem)/3)] lg:basis-[calc((100%-3.75rem)/4)]"
                style={{ minWidth: 0 }}
              >
                <ProductCard p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={openProduct} />
              </div>
            ))}
          </div>
          <div className="relative mx-auto mt-5 h-1 w-20 overflow-hidden rounded-full bg-border sm:hidden">
            <div
              className="absolute left-0 top-0 h-full w-7 rounded-full bg-olive-600 transition-transform duration-150 ease-out"
              style={{ transform: `translateX(${topPicksScrollProgress * (80 - 28)}px)` }}
            />
          </div>
          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              type="button"
              onClick={() => setProductListView({ title: "Best Sellers", products: topPicks })}
              className="rounded-sm bg-olive-600 px-5 py-2 text-xs font-medium uppercase tracking-wide text-background transition-colors hover:bg-black sm:px-8 sm:py-3 sm:text-sm"
            >
              View All
            </button>
          </div>
        </div>
      </section>

      {/* Heritage banner image */}
      <section className="relative overflow-hidden">
        <div className="relative flex aspect-[16/7] w-full items-center justify-center sm:aspect-[21/6]">
          {heritageBannerImages.length > 0 ? (
            <ImageSlideshow images={heritageBannerImages} alt="" intervalMs={6000} />
          ) : (
            <BeadStrand colors={["#4B5540", "#6B7658", "#DDBB6E", "#F1E4D3", "#833E20"]} bg="linear-gradient(120deg,#2E3524,#4B5540)" size={22} />
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="pb-6 pt-3 sm:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-3 flex items-center justify-center px-5 sm:mb-8 md:px-8">
            <h2 className="font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Shop by Trend</h2>
            <div className="absolute right-5 hidden gap-2 sm:flex md:right-8">
              <button
                aria-label="Scroll featured products left"
                onClick={() => scrollRow(featuredScrollRef, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-card"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Scroll featured products right"
                onClick={() => scrollRow(featuredScrollRef, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-card"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div
            ref={featuredScrollRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const maxScroll = el.scrollWidth - el.clientWidth;
              setFeaturedScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
            }}
            className="scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-5 pb-2 pt-3"
          >
            {featuredProducts.map((p) => (
              <div
                key={p.name}
                className="basis-[calc((100%-1.25rem)/2)] flex-shrink-0 md:basis-[calc((100%-2.5rem)/3)] lg:basis-[calc((100%-3.75rem)/4)]"
                style={{ minWidth: 0 }}
              >
                <ProductCard p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={openProduct} />
              </div>
            ))}
          </div>
          <div className="relative mx-auto mt-5 h-1 w-20 overflow-hidden rounded-full bg-border sm:hidden">
            <div
              className="absolute left-0 top-0 h-full w-7 rounded-full bg-olive-600 transition-transform duration-150 ease-out"
              style={{ transform: `translateX(${featuredScrollProgress * (80 - 28)}px)` }}
            />
          </div>
          <div className="mt-6 flex justify-center sm:mt-8">
            <button
              type="button"
              onClick={() => setProductListView({ title: "Shop by Trend", products: featuredProducts })}
              className="rounded-sm bg-olive-600 px-5 py-2 text-xs font-medium uppercase tracking-wide text-background transition-colors hover:bg-black sm:px-8 sm:py-3 sm:text-sm"
            >
              View All
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="bg-olive-50 pb-16 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="relative mb-8 flex items-center justify-center px-5 md:px-8">
            <h2 className="font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-7 px-5 pt-4 sm:grid-cols-4 sm:gap-y-5 md:px-8">
            {newArrivals.slice(0, 3).map((p) => (
              <div key={p.name} className="relative">
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-olive-600 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-olive-50 shadow-sm">
                  New Arrival
                </span>
                <ProductCard p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={openProduct} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setProductListView({ title: "New Arrivals", products: newArrivals })}
              className="group relative -mx-1 col-span-1 flex h-[325px] flex-col justify-end self-start overflow-hidden rounded-none border-none p-0 sm:mx-0 sm:h-full sm:min-h-[340px] sm:self-auto"
            >
              <BeadStrand colors={["#833E20", "#C1653A", "#DDBB6E", "#F1E4D3", "#6B7658", "#4B5540"]} bg="linear-gradient(150deg,#3A2E22,#6B4A2E)" size={20} />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 border-t border-white/40 bg-black/20 py-3 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-olive-600">
                Shop All <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Perfect Match — spotlight carousel */}
      <section id="spotlight" className="relative overflow-hidden bg-olive-400 pb-2 pt-6 sm:pb-4">
        <div className="relative mb-2 flex items-center justify-center px-5 text-center sm:mb-8 md:px-8">
          <h2 className="font-serif text-2xl uppercase tracking-wide text-olive-50 md:text-3xl">
            <span className="sm:hidden">Our </span>
            <span className="hidden sm:inline">Beauty of Beads </span>
            <span className="text-gold-400">Spotlight</span>
          </h2>
        </div>
        <button
          aria-label="Previous spotlight item"
          onClick={() => setSpotlightActive((i) => (i - 1 + spotlightPicks.length) % spotlightPicks.length)}
          className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-olive-50 backdrop-blur-sm transition-colors hover:bg-white/20 md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next spotlight item"
          onClick={() => setSpotlightActive((i) => (i + 1) % spotlightPicks.length)}
          className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-olive-50 backdrop-blur-sm transition-colors hover:bg-white/20 md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div
          ref={spotlightScrollRef}
          className="scrollbar-hide flex w-full items-center gap-2 overflow-x-hidden pb-4 pt-4 sm:gap-8 sm:pb-8 sm:pt-8"
        >
          {spotlightPicks.map((p, i) => {
            const isCenter = i === spotlightActive;
            return (
              <div
                key={p.name}
                className="relative flex-shrink-0 basis-[44%] sm:basis-[30%] md:basis-[20%]"
                style={{ minWidth: 0 }}
              >
                <div
                  onClick={() => setSpotlightActive(i)}
                  className={`relative origin-center cursor-pointer transition-all duration-500 ease-out will-change-transform ${isCenter ? "z-10 scale-[1.015] sm:scale-110" : "z-0 scale-90 opacity-70"}`}
                >
                  {isCenter && (
                    <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 scale-[0.909] whitespace-nowrap rounded-sm bg-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-olive-50 shadow-sm">
                      Trending
                    </span>
                  )}
                  <SpotlightCard p={p} wishlist={wishlist} toggleWishlist={toggleWishlist} added={added} addToBag={addToBag} onOpen={openProduct} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Currently on Sale */}
      <section id="sale" className="bg-white pb-6 pt-8">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="mb-6 text-center font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Currently on Sale</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {SHOP_BY_TYPE.map((c) => {
              const discount = Math.round(((c.mrp - c.price) / c.mrp) * 100);
              const isAdded = added.has(c.name);
              return (
                <div key={c.name} className="group relative">
                  <div className="relative aspect-[3/4] w-full overflow-hidden shadow-xl">
                    <div className="absolute inset-0 opacity-100 transition-opacity duration-500 group-hover:opacity-0">
                      <BeadStrand colors={c.colors} bg={c.bg} size={16} />
                    </div>
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <BeadStrand colors={c.colors} bg={c.bg} size={16} variant="b" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-serif text-[15px] leading-snug">{c.name}</h3>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="font-serif text-lg">{formatPrice(c.price, currency)}</span>
                      <span className="text-xs text-muted-foreground line-through">{formatPrice(c.mrp, currency)}</span>
                      <span className="text-xs font-medium text-olive-600">{discount}% off</span>
                    </div>
                    <button
                      onClick={() => addToBag(c.name)}
                      className={`mt-3 w-full rounded-sm py-2 text-sm font-medium transition-colors ${
                        isAdded ? "bg-olive-400 text-white" : "bg-olive-600 text-background hover:bg-black"
                      }`}
                    >
                      {isAdded ? "Added ✓" : "Add to Bag"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your Next Obsession — edge-to-edge video strip */}
      <section className="relative overflow-hidden bg-white pb-16 pt-6">
        <h2 className="mb-6 text-center font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Your Next Obsession</h2>
        <div className="relative">
          <button
            aria-label="Next videos"
            onClick={() => scrollRow(videoScrollRef, 1)}
            className="absolute right-2 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:bg-olive-600 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            ref={videoScrollRef}
            className="scrollbar-hide flex w-full gap-5 overflow-x-auto scroll-smooth pl-0 sm:pl-5"
          >
            {VIDEO_PICKS.map((v) => (
              <div
                key={v.name}
                className="relative flex-shrink-0 basis-[43%] sm:basis-[24%] md:basis-[16%]"
                style={{ minWidth: 0 }}
              >
                <div
                  onClick={() => setActiveVideo({ name: v.name, bg: v.bg })}
                  className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden"
                >
                  <div className="animate-video-live absolute inset-0" style={{ background: v.bg }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative overflow-hidden bg-olive-400 pb-4 pt-6">
        <h2 className="mb-6 text-center font-serif text-2xl uppercase tracking-wide text-white md:text-3xl">Reviews</h2>
        <button
          aria-label="Next review"
          onClick={() => setReviewActive((i) => (i + 1) % homepageReviews.length)}
          className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div
          ref={reviewScrollRef}
          className="scrollbar-hide flex w-full items-start gap-8 overflow-x-hidden px-5 sm:items-stretch md:px-8"
        >
          {[...homepageReviews, ...homepageReviews].map((r, idx) => (
            <div
              key={`${r.name}-${idx}`}
              className="flex-shrink-0 basis-[calc((100%-2rem)/2)] text-center sm:basis-[30%] md:basis-[18%]"
              style={{ minWidth: 0 }}
            >
              <p className="text-xs font-semibold text-white sm:text-sm">{r.name}</p>
              <div className="mt-1.5 flex items-center justify-center gap-0.5 sm:mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < r.rating ? "fill-gold-400 text-gold-400" : "fill-white/20 text-white/20"}`}
                  />
                ))}
              </div>
              <p className="mx-auto mt-2 max-w-xs text-xs leading-snug text-white/80 sm:mt-3 sm:text-sm sm:leading-relaxed">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Behind Beauty of Beads */}
      <section id="story" className="bg-white py-10 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-4 px-5 sm:gap-10 md:grid-cols-2 md:px-8">
          <div className="relative order-2 aspect-[4/3] w-full overflow-hidden shadow-xl md:order-1 md:aspect-auto md:h-full">
            {STORY_SLIDES.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ${i === storySlide ? "opacity-100" : "opacity-0"}`}
              >
                <BeadStrand colors={s.colors} bg={s.bg} size={18} />
              </div>
            ))}
          </div>
          {/* mobile: this wrapper is `contents` so the heading/paragraph inside become direct
              grid siblings of the image above, letting `order` interleave them (heading, image, paragraph).
              desktop (md:): wrapper becomes a real flex column again, restoring the original layout exactly. */}
          <div className="contents md:order-2 md:flex md:flex-col md:items-center md:justify-center md:text-center">
            <h2 className="order-1 text-center font-serif text-2xl uppercase tracking-wide md:order-none md:text-3xl">
              Story Behind
              <br className="sm:hidden" /> <span className="text-olive-600">Beauty of Beads</span>
            </h2>
            <div className="order-3 mt-1 max-w-md space-y-4 text-center text-sm leading-relaxed text-foreground/80 sm:mt-5 md:order-none md:text-[15px]">
              <p>What started during lockdown as a little bit of fun slowly became something close to my heart. At just 18, I never imagined that this small idea would become my passion.</p>
              <p>When people started loving what I created, I knew I wanted to give it everything. I took the difficult decision to leave my studies and follow this dream.</p>
              <p>And that little lockdown idea became Beauty of Beads. ❤️</p>
            </div>
          </div>
        </div>
      </section>

      {/* Follow us on Instagram — same tile size/style as Your Next Obsession, centered, max 4 at a time */}
      <section className="bg-white pb-10 pt-4 sm:pb-16 sm:pt-6">
        <h2 className="mb-6 text-center font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Follow us on Instagram</h2>
        <div className="relative mx-auto max-w-5xl px-0 sm:px-5 md:px-8">
          <button
            aria-label="Next instagram videos"
            onClick={() => scrollRow(instaScrollRef, 1)}
            className="absolute right-1 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:bg-olive-600 sm:flex md:right-0"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div
            ref={instaScrollRef}
            className="scrollbar-hide flex w-full gap-5 overflow-x-auto scroll-smooth sm:gap-4"
          >
            {INSTAGRAM_PICKS.map((v) => (
              <div
                key={v.name}
                className="relative flex-shrink-0 basis-[43%] sm:basis-[47%] md:basis-[calc(25%-0.75rem)]"
                style={{ minWidth: 0 }}
              >
                <div
                  onClick={() => setActiveVideo({ name: v.name, bg: v.bg })}
                  className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden"
                >
                  <div className="animate-video-live absolute inset-0" style={{ background: v.bg }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where's Your Order */}
      <section className="bg-white py-6 text-center sm:py-10">
        <h2 className="font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">Where's Your Order?</h2>
        <p className="mt-3 text-base text-foreground/70">
          {user ? (
            <button type="button" onClick={openOrdersView} className="text-olive-600 underline underline-offset-2 transition-colors hover:text-black">
              Track your orders
            </button>
          ) : (
            <>
              <button type="button" onClick={openOrdersView} className="text-olive-600 underline underline-offset-2 transition-colors hover:text-black">
                Log in
              </button>{" "}
              to follow your Beauty of Beads journey.
            </>
          )}
        </p>
      </section>

      {/* Want to meet us in person — store visit banner */}
      <section className="relative overflow-hidden">
        <h2 className="bg-white px-6 pb-4 pt-6 text-center font-serif text-2xl text-foreground sm:hidden">Want to meet us in person?</h2>
        <div className="relative flex aspect-[16/9] w-full items-center justify-center sm:aspect-[21/6]">
          {storeVisitBannerImages.length > 0 ? (
            <ImageSlideshow images={storeVisitBannerImages} alt="" intervalMs={6000} />
          ) : (
            <BeadStrand colors={["#C79A3E", "#833E20", "#DDBB6E", "#F1E4D3"]} bg="linear-gradient(120deg,#3A2E22,#6B4A2E)" size={20} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-3 flex flex-col items-center gap-4 px-6 text-center sm:bottom-6 md:bottom-10">
            <h2 className="hidden font-serif text-3xl text-white sm:block md:text-4xl">Want to meet us in person?</h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-sm bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-foreground shadow-md transition-colors hover:bg-black hover:text-white sm:px-8 sm:py-3.5 sm:text-base"
            >
              Visit Our Store
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="bg-white pb-16 pt-8">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl uppercase tracking-wide text-olive-600 md:text-3xl">FAQs</h2>
          <div className="divide-y divide-border">
            {FAQS.map((f, i) => (
              <div key={f.q} className="py-4">
                <button
                  onClick={() => setOpenFaq((o) => (o === i ? null : i))}
                  className="flex w-full items-center justify-between gap-4 text-left font-serif text-[15px]"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-olive-600 text-background/80">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-6 sm:pt-14 md:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            <div className="text-center md:text-left">
              <picture>
                <source srcSet={logoMarkWebp} type="image/webp" />
                <img
                  src={logoMarkPng}
                  alt="Beauty of Beads"
                  width={269}
                  height={288}
                  loading="lazy"
                  decoding="async"
                  className="mx-auto h-36 w-auto md:mx-0"
                />
              </picture>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-background/60">Handmade with love</p>
              <p className="mx-auto mt-4 max-w-xs text-sm text-background/60 md:mx-0">
                Every piece you see here is more than just jewellery – it's a little piece of passion, made to add beauty to your everyday.
              </p>
              <div className="mt-5 flex justify-center gap-4 md:justify-start">
                <a href="mailto:hello@beautyofbeads.in" aria-label="Email us">
                  <AtSign className="h-4 w-4 cursor-pointer hover:text-background" />
                </a>
                <a href="#reviews" aria-label="See reviews">
                  <ThumbsUp className="h-4 w-4 cursor-pointer hover:text-background" />
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                  <MessageCircle className="h-4 w-4 cursor-pointer hover:text-background" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center md:contents md:text-left">
              <div>
                <p className="mb-3 font-serif text-[13px] uppercase tracking-wide text-background md:text-sm">Shop</p>
                <ul className="space-y-2 text-xs text-background/60 md:text-sm">
                  <li><a href="#top-picks" className="transition-colors hover:text-background">Best Sellers</a></li>
                  <li><a href="#new-arrivals" className="transition-colors hover:text-background">New Arrivals</a></li>
                  <li><a href="#sale" className="transition-colors hover:text-background">Currently on Sale</a></li>
                  <li><a href="#spotlight" className="transition-colors hover:text-background">Beauty of Beads Spotlight</a></li>
                  <li><a href="#featured" className="transition-colors hover:text-background">Shop by Trend</a></li>
                  <li><a href="#category" className="transition-colors hover:text-background">Shop by Category</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-serif text-[13px] uppercase tracking-wide text-background md:text-sm">Help &amp; Info</p>
                <ul className="space-y-2 text-xs text-background/60 md:text-sm">
                  <li className="cursor-pointer hover:text-background" onClick={openOrdersView}>Track Your Order</li>
                  <li className="cursor-pointer hover:text-background" onClick={() => setLegalView("privacy")}>Privacy Policy</li>
                  <li className="cursor-pointer hover:text-background" onClick={() => setLegalView("terms")}>Terms and Conditions</li>
                  <li><a href="#faqs" className="transition-colors hover:text-background">FAQs</a></li>
                  <li>
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-background"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-serif text-[13px] uppercase tracking-wide text-background md:text-sm">About Us</p>
                <ul className="space-y-2 text-xs text-background/60 md:text-sm">
                  <li><a href="#story" className="transition-colors hover:text-background">Our Story</a></li>
                  <li><a href="#reviews" className="transition-colors hover:text-background">Reviews</a></li>
                </ul>
              </div>
            </div>
            <div>
              <p className="mb-3 font-serif text-sm uppercase tracking-wide text-background">Stay Connected</p>
              <p className="mb-3 text-sm text-background/60">Get updates on new collections, offers &amp; more.</p>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus !== "idle") setNewsletterStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className="w-full rounded-sm bg-background/10 px-3 py-2 text-sm text-background placeholder:text-background/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="mt-3 w-full rounded-sm bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide text-olive-600 transition-colors hover:bg-black hover:text-white disabled:opacity-60"
                >
                  {newsletterStatus === "loading" ? "Joining…" : "Join Our Community"}
                </button>
                {newsletterStatus === "success" && <p className="mt-2 text-xs text-background/80">{newsletterMessage}</p>}
                {newsletterStatus === "error" && <p className="mt-2 text-xs text-red-300">{newsletterMessage}</p>}
              </form>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-background/10 pt-8 text-center sm:grid-cols-3 md:grid-cols-6">
            {[
              { Icon: Truck, label: "Free Shipping", sub: "On all orders above ₹3,000" },
              { Icon: ShieldCheck, label: "Secure Payment", sub: "100% safe & trusted checkout" },
              { Icon: Award, label: "Premium Quality", sub: "Handpicked beads & materials" },
              { Icon: Heart, label: "Handcrafted", sub: "Each piece made with love" },
              { Icon: Gift, label: "Perfect for Gifting", sub: "Beautifully packed with love" },
              { Icon: Globe, label: "We Ship Worldwide", sub: "Delivering beauty everywhere" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="h-6 w-6 text-background/70" />
                <p className="text-xs font-semibold uppercase tracking-wide text-background">{label}</p>
                <p className="text-[11px] text-background/50">{sub}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-background/10 px-5 py-5 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-background/50">
              Copyright © {new Date().getFullYear()} Beauty of Beads. All rights reserved. ·{" "}
              <button type="button" className="hover:text-background" onClick={() => setLegalView("privacy")}>
                Privacy Policy
              </button>{" "}
              ·{" "}
              <button type="button" className="hover:text-background" onClick={() => setLegalView("terms")}>
                Terms &amp; Conditions
              </button>
            </p>
            <div className="flex items-center gap-2.5">
              <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-background/50">We Accept</span>
              <PaymentIcon type="visa" />
              <PaymentIcon type="mastercard" />
              <PaymentIcon type="upi" />
              <PaymentIcon type="paytm" />
              <PaymentIcon type="gpay" />
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-background/40">Made by Brandora WebWorks</p>
        </div>
      </footer>

      {/* Video lightbox — tap a muted tile to grow it and play with sound */}
      {activeVideo && (
        <div
          onClick={closeVideo}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 transition-opacity duration-300 ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative aspect-[3/4] w-full max-w-sm overflow-hidden shadow-2xl transition-transform duration-300 ${
              videoVisible ? "scale-100" : "scale-90"
            }`}
          >
            <div className="animate-video-live absolute inset-0" style={{ background: activeVideo.bg }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            <button
              aria-label="Close video"
              onClick={closeVideo}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
              <Volume2 className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
    <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    <CartPanel
      open={cartPanelOpen}
      onOpenChange={setCartPanelOpen}
      items={cartItems}
      currency={currency}
      onUpdateQuantity={updateCartQuantity}
      onRemove={removeCartItem}
      onCheckout={() => {
        if (!user) {
          setCartPanelOpen(false);
          openAuthModal();
          return;
        }
        setCartPanelOpen(false);
        setCheckoutOpen(true);
      }}
      allProducts={allProducts}
      onOpenProduct={openProduct}
    />
    <WishlistPanel
      open={wishlistPanelOpen}
      onOpenChange={setWishlistPanelOpen}
      items={wishlistItems}
      currency={currency}
      onRemove={(item) => toggleWishlist(item.product_name)}
      onMoveToCart={moveWishlistItemToCart}
    />
    {productListView && (
      <AllProductsView
        title={productListView.title}
        products={productListView.products}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        added={added}
        addToBag={addToBag}
        onOpenProduct={openProduct}
        onBack={() => setProductListView(null)}
      />
    )}
    <SearchOverlay
      open={searchOpen}
      onClose={() => setSearchOpen(false)}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      added={added}
      addToBag={addToBag}
      onOpenProduct={openProduct}
      allProducts={allProducts}
    />
    <CheckoutModal
      open={checkoutOpen}
      onOpenChange={setCheckoutOpen}
      items={cartItems}
      currency={currency}
      prefilledName={user?.name || ""}
      prefilledPhone={user?.phone || ""}
      onPlaced={handleOrderPlaced}
    />
    <OrdersView
      open={ordersViewOpen}
      onClose={() => setOrdersViewOpen(false)}
      initialOrderNumber={trackOrderNumber}
      currency={currency}
    />
    {legalView && <LegalView type={legalView} onBack={() => setLegalView(null)} />}
    <ProfileView open={profileViewOpen} onClose={() => setProfileViewOpen(false)} />
    <AllCollectionsView
      open={allCollectionsOpen}
      onBack={() => setAllCollectionsOpen(false)}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      added={added}
      addToBag={addToBag}
      onOpenProduct={openProduct}
      allProducts={allProducts}
      onOpenGroup={(group) => {
        setAllCollectionsOpen(false);
        openGroupView(group);
      }}
    />
    {selectedProduct && (
      <ProductDetailView
        product={selectedProduct}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        added={added}
        addToBag={addToBag}
        addProductWithQuantity={addProductWithQuantity}
        allProducts={allProducts}
        siteSettings={siteSettings}
        onOpen={openProduct}
        onBack={() => setSelectedProduct(null)}
        onBuyNow={(p, qty) => {
          addProductWithQuantity(p, qty);
          setSelectedProduct(null);
          setCheckoutOpen(true);
        }}
        cartCount={cartCount}
        onOpenCart={() => setCartPanelOpen(true)}
        onViewAllRelated={(title, products) => {
          setSelectedProduct(null);
          setProductListView({ title, products });
        }}
      />
    )}
    </CurrencyContext.Provider>
  );
}
