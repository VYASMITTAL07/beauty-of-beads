// Shrinks an image in the browser before it is uploaded.
//
// Whatever the admin picks goes straight into R2 and is then served to every
// visitor, so an un-resized export is a permanent tax on page load: the two
// homepage banners were uploaded as 1.6MB and 1.9MB PNGs, together about 3.6MB
// for two pictures. Re-encoding here means nobody has to remember to optimise
// a file first — it just happens.
//
// Videos and anything non-image are passed through untouched.

// Sensible caps per use. An image only needs about twice the pixels it is
// actually drawn at; beyond that the extra bytes are invisible. Category tiles
// in particular render as a 120px circle, so a 2400px file is roughly ten
// times more pixels than any screen can show.
export const IMAGE_CAPS = {
  banner: 2400, // full-bleed hero and banners
  product: 1400, // product cards and the detail gallery
  thumbnail: 400, // category tiles (drawn at 120px), avatars
} as const;

const DEFAULT_MAX_DIMENSION = IMAGE_CAPS.banner;
const QUALITY = 0.85;
// Below this, re-encoding tends to cost more than it saves.
const SKIP_BELOW_BYTES = 150 * 1024;

function canUseCanvas() {
  return typeof document !== "undefined" && typeof createImageBitmap === "function";
}

async function encode(canvas: HTMLCanvasElement, type: string): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, QUALITY));
}

/**
 * Returns a smaller version of `file`, or the original when shrinking it would
 * not help (already small, not an image, animated GIF, or the browser cannot
 * decode it). Never throws — a failed optimisation must not block an upload.
 */
export async function compressImage(file: File, maxDimension: number = DEFAULT_MAX_DIMENSION): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  // SVG is already vector, and a GIF may be animated — re-encoding either
  // through a canvas would damage it.
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  if (file.size < SKIP_BELOW_BYTES && maxDimension >= DEFAULT_MAX_DIMENSION) return file;
  if (!canUseCanvas()) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    // WebP is far smaller than PNG for photographic and flat artwork alike,
    // and the upload endpoint already accepts it. JPEG is the fallback for
    // any browser whose canvas cannot produce WebP.
    let blob = await encode(canvas, "image/webp");
    let type = "image/webp";
    if (!blob || blob.type !== "image/webp") {
      blob = await encode(canvas, "image/jpeg");
      type = "image/jpeg";
    }
    if (!blob) return file;

    // A transparent PNG re-encoded to JPEG would lose its transparency, so
    // keep the original in that case rather than silently wrecking it.
    if (type === "image/jpeg" && file.type === "image/png") return file;

    // If the "optimised" file is no smaller, keep the original.
    if (blob.size >= file.size) return file;

    const ext = type === "image/webp" ? "webp" : "jpg";
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${base}.${ext}`, { type, lastModified: Date.now() });
  } catch {
    return file;
  }
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
