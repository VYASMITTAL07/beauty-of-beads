import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown, Trash2, Plus, Upload, Search, X, GripVertical } from "lucide-react";
import {
  adminApi,
  AdminApiError,
  mediaUrl,
  IMAGE_CAPS,
  type AdminCategory,
  type AdminHomepage,
  type AdminPickerProduct,
  type HomepageImageSlot,
  type ImageVariant,
  type HomepageSectionKey,
} from "../adminApi";

type Notify = { onError: (m: string) => void; onSuccess: (m: string) => void };

// Vertical anchor presets, phrased as what the viewer keeps rather than a
// percentage nobody can picture.
const FOCUS_LABELS: Record<string, string> = {
  "0%": "Very top",
  "20%": "Near the top",
  "35%": "Slightly above centre",
  "50%": "Centre",
  "65%": "Slightly below centre",
  "80%": "Near the bottom",
  "100%": "Very bottom",
};

// The Website Editor mirrors the storefront homepage from top to bottom. The
// order and titles come from the server (lib/homepage.js HOMEPAGE_LAYOUT), so
// adding a section there shows up here without touching this file.
export default function WebsiteEditorSection({ onError, onSuccess }: Notify) {
  const [data, setData] = useState<AdminHomepage | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    adminApi.homepage
      .get()
      .then(setData)
      .catch((e) => {
        onError(e instanceof AdminApiError ? e.message : "Couldn't load the homepage layout");
        setLoadFailed(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-w-0">
      <h1 className="font-serif text-xl text-olive-600 sm:text-2xl">Website Editor</h1>
      <p className="mt-1 text-sm text-foreground/60">
        Every section of the storefront homepage, in the order it appears. Changes here go live immediately.
      </p>

      {data && (
        <ImageOptimiser
          data={data}
          onDone={() => adminApi.homepage.get().then(setData).catch(() => {})}
          onError={onError}
          onSuccess={onSuccess}
        />
      )}

      {!data && !loadFailed && <p className="mt-6 text-sm text-foreground/50">Loading the homepage…</p>}
      {loadFailed && <p className="mt-6 text-sm text-red-600">Couldn't load the homepage layout. Please refresh.</p>}

      {data && (
        <div className="mt-5 flex flex-col gap-4">
          {data.layout.map((entry, i) => (
            <SectionCard key={entry.key} index={i + 1} title={entry.title} help={entry.help}>
              {entry.kind === "images" && (
                <ImageSlotEditor
                  slot={entry.key as HomepageImageSlot}
                  images={data.images[entry.key as HomepageImageSlot] || []}
                  mobileImages={data.imagesMobile?.[entry.key as HomepageImageSlot] || []}
                  focus={data.focus?.[entry.key as HomepageImageSlot] || "50%"}
                  focusChoices={data.focusChoices || []}
                  fit={data.fit?.[entry.key as HomepageImageSlot] || "cover"}
                  fitRange={data.fitRange || { min: 20, max: 100 }}
                  onFitChange={(f) =>
                    setData((d) => (d ? { ...d, fit: { ...d.fit, [entry.key as HomepageImageSlot]: f } } : d))
                  }
                  onFocusChange={(f) =>
                    setData((d) => (d ? { ...d, focus: { ...d.focus, [entry.key as HomepageImageSlot]: f } } : d))
                  }
                  max={data.maxImagesPerSlot}
                  onChange={(images, variant) =>
                    setData((d) => {
                      if (!d) return d;
                      const key = entry.key as HomepageImageSlot;
                      return variant === "mobile"
                        ? { ...d, imagesMobile: { ...d.imagesMobile, [key]: images } }
                        : { ...d, images: { ...d.images, [key]: images } };
                    })
                  }
                  onError={onError}
                  onSuccess={onSuccess}
                />
              )}
              {entry.kind === "categories" && (
                <CategoriesEditor
                  categories={data.categories}
                  onChange={(categories) => setData((d) => (d ? { ...d, categories } : d))}
                  onError={onError}
                  onSuccess={onSuccess}
                />
              )}
              {entry.kind === "products" && (
                <ProductSectionEditor
                  sectionKey={entry.key as HomepageSectionKey}
                  title={entry.title}
                  products={data.sections[entry.key as HomepageSectionKey] || []}
                  allProducts={data.allProducts}
                  onChange={(products) =>
                    setData((d) => (d ? { ...d, sections: { ...d.sections, [entry.key as HomepageSectionKey]: products } } : d))
                  }
                  onError={onError}
                  onSuccess={onSuccess}
                />
              )}
            </SectionCard>
          ))}

          <SiteCopyCard onError={onError} onSuccess={onSuccess} />
        </div>
      )}
    </div>
  );
}

// One-click re-compression for images uploaded before compression existed.
//
// Uploads are shrunk in the browser now, but everything already in R2 was
// stored at full export size — on this site that was 6.4MB across the homepage
// (a 1.6MB banner, a 1.9MB banner, and 3.0MB of category tiles each drawn as a
// 120px circle). Those files cannot shrink themselves, and re-uploading them by
// hand is dozens of rounds of the same clicking, so this fetches each one,
// re-encodes it at the right size for where it is actually used, and swaps the
// URL over.
//
// Safe to run repeatedly: an image already at or below its cap comes back no
// smaller and is left alone.
function ImageOptimiser({
  data,
  onDone,
  onError,
  onSuccess,
}: Notify & { data: AdminHomepage; onDone: () => void }) {
  const [progress, setProgress] = useState<{ done: number; total: number; label: string } | null>(null);

  // Everything that can be re-compressed, with the cap for where it is shown.
  // Videos are skipped outright — re-encoding one isn't possible in the
  // browser, and simply fetching it would pull megabytes for nothing.
  const skip = (u: string) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(u);
  const jobs = useMemo(() => {
    const list: { kind: "image-slot" | "category"; slot?: HomepageImageSlot; variant?: ImageVariant; index?: number; id?: number; url: string; cap: number; label: string }[] = [];
    for (const slot of Object.keys(data.images) as HomepageImageSlot[]) {
      (data.images[slot] || []).forEach((url, index) => {
        if (skip(url)) return;
        list.push({ kind: "image-slot", slot, variant: "desktop", index, url, cap: IMAGE_CAPS.banner, label: slot });
      });
      (data.imagesMobile?.[slot] || []).forEach((url, index) => {
        if (skip(url)) return;
        list.push({ kind: "image-slot", slot, variant: "mobile", index, url, cap: IMAGE_CAPS.banner, label: `${slot} (mobile)` });
      });
    }
    for (const c of data.categories) {
      if (c.imageUrl) list.push({ kind: "category", id: c.id, url: c.imageUrl, cap: IMAGE_CAPS.thumbnail, label: c.name });
    }
    return list;
  }, [data]);

  const run = async () => {
    if (jobs.length === 0) return;
    if (!confirm(`Re-compress ${jobs.length} image(s)? They stay the same pictures — this only makes them faster to download. Safe to run more than once.`)) return;

    let before = 0;
    let after = 0;
    let changed = 0;
    const failures: string[] = [];

    // Slot images are rewritten per slot+variant, so collect the new URLs and
    // save each list once at the end rather than after every single image.
    const slotResults = new Map<string, string[]>();
    for (const slot of Object.keys(data.images) as HomepageImageSlot[]) {
      slotResults.set(`${slot}|desktop`, [...(data.images[slot] || [])]);
      slotResults.set(`${slot}|mobile`, [...(data.imagesMobile?.[slot] || [])]);
    }

    try {
      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        setProgress({ done: i, total: jobs.length, label: job.label });
        try {
          const res = await fetch(mediaUrl(job.url));
          if (!res.ok) throw new Error(`could not fetch (${res.status})`);
          const blob = await res.blob();
          if (!blob.type.startsWith("image/")) continue;
          before += blob.size;

          const ext = blob.type.split("/")[1] || "jpg";
          const original = new File([blob], `image.${ext}`, { type: blob.type });
          const { url } = await adminApi.products.upload(original, job.cap);

          if (job.kind === "category" && job.id != null) {
            await adminApi.categories.update(job.id, { imageUrl: url });
          } else if (job.slot && job.variant && job.index != null) {
            const key = `${job.slot}|${job.variant}`;
            const arr = slotResults.get(key);
            if (arr) arr[job.index] = url;
          }
          changed += 1;

          // Measure what the visitor will now download.
          const check = await fetch(mediaUrl(url), { method: "HEAD" });
          const len = Number(check.headers.get("content-length") || 0);
          after += len || blob.size;
        } catch (e) {
          failures.push(`${job.label}: ${e instanceof Error ? e.message : "failed"}`);
        }
      }

      // Persist each slot's rewritten list.
      for (const [key, urls] of slotResults) {
        const [slot, variant] = key.split("|") as [HomepageImageSlot, ImageVariant];
        const originalList = variant === "mobile" ? data.imagesMobile?.[slot] || [] : data.images[slot] || [];
        if (urls.length === 0 || urls.join("|") === originalList.join("|")) continue;
        try {
          await adminApi.homepage.setImages(slot, urls, variant);
        } catch (e) {
          failures.push(`${slot} (${variant}): ${e instanceof AdminApiError ? e.message : "couldn't save"}`);
        }
      }

      const savedKb = Math.max(0, Math.round((before - after) / 1024));
      onSuccess(
        changed === 0
          ? "Nothing needed re-compressing."
          : `Re-compressed ${changed} image(s) — every visitor now downloads about ${savedKb}KB less.`
      );
      // Failures are surfaced rather than swallowed, so a silent no-op is
      // never mistaken for success.
      if (failures.length) onError(`${failures.length} image(s) failed: ${failures.slice(0, 3).join("; ")}`);
      onDone();
    } finally {
      setProgress(null);
    }
  };

  if (jobs.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 rounded-md border border-olive-300 bg-olive-50/60 p-4">
      <Button type="button" disabled={!!progress} onClick={() => void run()} className="bg-olive-600 hover:bg-black">
        {progress ? `Optimising ${progress.done + 1} of ${progress.total}…` : `Optimise all images (${jobs.length})`}
      </Button>
      <span className="min-w-[12rem] flex-1 text-xs leading-relaxed text-foreground/60">
        {progress
          ? progress.label
          : "Re-compresses every hero, banner and category image that was uploaded before automatic compression was added. Same pictures, far faster to load."}
      </span>
    </div>
  );
}

function SectionCard({
  index,
  title,
  help,
  children,
}: {
  index: number;
  title: string;
  help: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <section className="overflow-hidden rounded-md border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-olive-50/50 sm:px-5"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-100 text-[11px] font-semibold text-olive-600">
          {index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-base text-olive-600">{title}</span>
          <span className="mt-0.5 block text-xs leading-relaxed text-foreground/50">{help}</span>
        </span>
        {open ? (
          <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-foreground/40" />
        ) : (
          <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-foreground/40" />
        )}
      </button>
      {open && <div className="border-t border-border px-4 py-4 sm:px-5">{children}</div>}
    </section>
  );
}

// Small reusable move-up / move-down / delete control strip. Drag-and-drop
// would need a dependency and is fiddly on touch; explicit buttons work the
// same on a phone and a laptop.
function OrderControls({
  index,
  total,
  onMove,
  onRemove,
  busy,
  removeLabel,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
  busy: boolean;
  removeLabel: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        disabled={index === 0 || busy}
        onClick={() => onMove(index, index - 1)}
        aria-label="Move up"
        className="flex h-7 w-7 items-center justify-center rounded-sm border border-border text-foreground/60 transition-colors hover:bg-olive-50 disabled:opacity-30"
      >
        <ChevronUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={index === total - 1 || busy}
        onClick={() => onMove(index, index + 1)}
        aria-label="Move down"
        className="flex h-7 w-7 items-center justify-center rounded-sm border border-border text-foreground/60 transition-colors hover:bg-olive-50 disabled:opacity-30"
      >
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={onRemove}
        aria-label={removeLabel}
        className="flex h-7 w-7 items-center justify-center rounded-sm border border-border text-clay-500 transition-colors hover:bg-clay-50 disabled:opacity-30"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

// A slot that holds a LIST of images (the hero and the two full-bleed
// banners). Each used to be a single image with one upload button.
function ImageSlotEditor({
  slot,
  images,
  mobileImages,
  focus,
  focusChoices,
  onFocusChange,
  fit,
  fitRange,
  onFitChange,
  max,
  onChange,
  onError,
  onSuccess,
}: Notify & {
  slot: HomepageImageSlot;
  images: string[];
  mobileImages: string[];
  focus: string;
  focusChoices: string[];
  onFocusChange: (focus: string) => void;
  fit: string;
  fitRange: { min: number; max: number };
  onFitChange: (fit: string) => void;
  max: number;
  onChange: (images: string[], variant: ImageVariant) => void;
}) {
  const [busy, setBusy] = useState(false);
  // Only the hero takes a video — a full-bleed banner behind page content is
  // not somewhere a moving background belongs.
  const allowsVideo = slot === "hero";
  const accept = allowsVideo ? "image/*,video/mp4,video/webm" : "image/*";
  const isVideo = (u: string) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(u);
  // Which set is being edited. A wide banner cannot be cropped down to a phone
  // without losing its text, so a slot can carry a separate mobile version;
  // leaving it empty just reuses the desktop images.
  const [variant, setVariant] = useState<ImageVariant>("desktop");
  const current = variant === "mobile" ? mobileImages : images;

  const persist = async (next: string[], message: string) => {
    setBusy(true);
    try {
      const r = await adminApi.homepage.setImages(slot, next, variant);
      onChange(r.images, variant);
      onSuccess(message);
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save these images");
    } finally {
      setBusy(false);
    }
  };

  const uploadFiles = async (files: FileList) => {
    const room = max - current.length;
    if (room <= 0) {
      onError(`This section can hold at most ${max} images.`);
      return;
    }
    const chosen = Array.from(files).slice(0, room);
    if (chosen.length < files.length) onError(`Only ${room} more image${room === 1 ? "" : "s"} could be added.`);

    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const file of chosen) {
        const { url } = await adminApi.products.upload(file);
        uploaded.push(url);
      }
      const next = [...current, ...uploaded];
      const r = await adminApi.homepage.setImages(slot, next, variant);
      onChange(r.images, variant);
      onSuccess(uploaded.length === 1 ? "Image added and published" : `${uploaded.length} images added and published`);
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const replaceAt = async (index: number, file: File) => {
    setBusy(true);
    try {
      const { url } = await adminApi.products.upload(file);
      const next = [...current];
      next[index] = url;
      const r = await adminApi.homepage.setImages(slot, next, variant);
      onChange(r.images, variant);
      onSuccess("Image replaced");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const pct = fit === "cover" ? 100 : Number(fit.replace("%", "")) || 100;

  const saveFit = async (next: string) => {
    onFitChange(next);
    try {
      await adminApi.homepage.setFit(slot, next);
      onSuccess("Zoom updated");
    } catch (err) {
      onError(err instanceof AdminApiError ? err.message : "Couldn't save the zoom");
    }
  };

  const tabClass = (v: ImageVariant) =>
    `rounded-sm px-3 py-1.5 text-xs transition-colors ${
      variant === v ? "bg-olive-100 font-medium text-olive-600" : "text-foreground/60 hover:bg-olive-50"
    }`;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex rounded-sm border border-border bg-background p-0.5">
          <button type="button" onClick={() => setVariant("desktop")} className={tabClass("desktop")}>
            Laptop
          </button>
          <button type="button" onClick={() => setVariant("mobile")} className={tabClass("mobile")}>
            Mobile{mobileImages.length > 0 ? ` (${mobileImages.length})` : ""}
          </button>
        </div>
        <span className="text-xs text-foreground/45">
          {variant === "mobile"
            ? "Optional. Leave empty and phones will use the laptop images."
            : allowsVideo
              ? "Shown on laptops and tablets. A video works here too — it plays muted on loop."
              : "Shown on laptops and tablets."}
        </span>
      </div>

      {current.length === 0 && (
        <p className="mb-3 text-sm text-foreground/50">
          {variant === "mobile"
            ? "No mobile image — phones will use the laptop images."
            : "No images yet — the storefront shows its built-in artwork."}
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {current.map((url, i) => (
          <li key={`${url}-${i}`} className="flex items-center gap-3 rounded-sm border border-border/70 p-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[11px] text-foreground/40">
              <GripVertical className="h-3.5 w-3.5" />
            </span>
            {isVideo(url) ? (
              <video
                src={mediaUrl(url)}
                muted
                playsInline
                preload="metadata"
                className="h-14 w-20 shrink-0 rounded-sm bg-black object-cover sm:h-16 sm:w-28"
              />
            ) : (
              <img src={mediaUrl(url)} alt="" loading="lazy" className="h-14 w-20 shrink-0 rounded-sm object-cover sm:h-16 sm:w-28" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">
                {i === 0 ? "Shown first" : `Slide ${i + 1}`}
                {isVideo(url) && <span className="ml-1 text-foreground/45">· video</span>}
              </p>
              <label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-xs text-olive-600 hover:underline">
                <Upload className="h-3 w-3" />
                Replace
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  disabled={busy}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void replaceAt(i, f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
            <OrderControls
              index={i}
              total={current.length}
              busy={busy}
              removeLabel="Remove image"
              onMove={(from, to) => void persist(move(current, from, to), "Image order updated")}
              onRemove={() => void persist(current.filter((_, idx) => idx !== i), "Image removed")}
            />
          </li>
        ))}
      </ul>

      {current.length > 0 && focusChoices.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-sm border border-border/70 p-2.5">
          <span className="text-xs font-medium text-foreground">Framing</span>
          <select
            value={focus}
            disabled={busy}
            onChange={async (e) => {
              const next = e.target.value;
              onFocusChange(next);
              try {
                await adminApi.homepage.setFocus(slot, next);
                onSuccess("Framing updated");
              } catch (err) {
                onError(err instanceof AdminApiError ? err.message : "Couldn't save the framing");
              }
            }}
            className="rounded-sm border border-border bg-background px-2 py-1.5 text-xs"
          >
            {focusChoices.map((f) => (
              <option key={f} value={f}>
                {FOCUS_LABELS[f] || f}
              </option>
            ))}
          </select>
          <span className="min-w-[10rem] flex-1 text-xs leading-relaxed text-foreground/50">
            This frame is wider than it is tall, so part of the picture is cropped. Pick which part stays.
          </span>

          <div className="flex w-full flex-wrap items-center gap-3 border-t border-border/60 pt-2.5">
            <span className="text-xs font-medium text-foreground">Zoom</span>

            <label className="flex items-center gap-1.5 text-xs text-foreground/70">
              <input
                type="checkbox"
                checked={fit === "cover"}
                disabled={busy}
                onChange={(e) => void saveFit(e.target.checked ? "cover" : "65%")}
              />
              Fill the frame
            </label>

            {fit !== "cover" && (
              <div className="flex min-w-[14rem] flex-1 items-center gap-2">
                <input
                  type="range"
                  min={fitRange.min}
                  max={fitRange.max}
                  step={1}
                  value={pct}
                  disabled={busy}
                  onChange={(e) => onFitChange(`${e.target.value}%`)}
                  onMouseUp={(e) => void saveFit(`${(e.target as HTMLInputElement).value}%`)}
                  onTouchEnd={(e) => void saveFit(`${(e.target as HTMLInputElement).value}%`)}
                  onKeyUp={(e) => void saveFit(`${(e.target as HTMLInputElement).value}%`)}
                  className="min-w-0 flex-1"
                />
                <span className="w-12 shrink-0 text-right text-xs tabular-nums text-foreground">{pct}%</span>
              </div>
            )}

            <span className="w-full text-xs leading-relaxed text-foreground/50">
              {fit === "cover"
                ? "Crops whatever doesn't fit. Good when the picture is roughly the same shape as the frame."
                : `Shows ${pct}% of the picture's height, with a blurred copy behind filling the sides.`}
            </span>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label
          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-olive-400 px-3 py-2 text-xs font-medium text-olive-600 transition-colors hover:bg-olive-50 ${
            busy || current.length >= max ? "pointer-events-none opacity-40" : ""
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
          {busy ? "Working…" : "Add image"}
          <input
            type="file"
            accept={accept}
            multiple
            className="hidden"
            disabled={busy || current.length >= max}
            onChange={(e) => {
              if (e.target.files?.length) void uploadFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        <span className="text-xs text-foreground/45">
          {current.length} of {max} used{current.length > 1 ? " · they cross-fade automatically on the site" : ""}
        </span>
      </div>
    </div>
  );
}

function CategoriesEditor({
  categories,
  onChange,
  onError,
  onSuccess,
}: Notify & { categories: AdminCategory[]; onChange: (c: AdminCategory[]) => void }) {
  const [busy, setBusy] = useState(false);
  const [newName, setNewName] = useState("");

  const saveOrder = async (next: AdminCategory[]) => {
    onChange(next); // optimistic — the list re-renders instantly
    setBusy(true);
    try {
      const r = await adminApi.homepage.setCategoryOrder(next.map((c) => c.id));
      onChange(r.categories);
      onSuccess("Category order updated");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save the category order");
    } finally {
      setBusy(false);
    }
  };

  const updateField = async (c: AdminCategory, patch: Partial<{ name: string; imageUrl: string }>) => {
    setBusy(true);
    try {
      const r = await adminApi.categories.update(c.id, patch);
      onChange(categories.map((x) => (x.id === c.id ? r.category : x)));
      onSuccess("Category updated");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't update the category");
    } finally {
      setBusy(false);
    }
  };

  const uploadCover = async (c: AdminCategory, file: File) => {
    setBusy(true);
    try {
      const { url } = await adminApi.products.upload(file, IMAGE_CAPS.thumbnail);
      const r = await adminApi.categories.update(c.id, { imageUrl: url });
      onChange(categories.map((x) => (x.id === c.id ? r.category : x)));
      onSuccess("Cover image updated");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const addCategory = async () => {
    const name = newName.trim();
    if (!name) return;
    setBusy(true);
    try {
      const r = await adminApi.categories.create({ name, sortOrder: categories.length });
      onChange([...categories, r.category]);
      setNewName("");
      onSuccess("Category added");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't add the category");
    } finally {
      setBusy(false);
    }
  };

  const removeCategory = async (c: AdminCategory) => {
    setBusy(true);
    try {
      await adminApi.categories.remove(c.id);
      onChange(categories.filter((x) => x.id !== c.id));
      onSuccess("Category removed");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't remove the category");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {categories.length === 0 && <p className="mb-3 text-sm text-foreground/50">No categories yet.</p>}

      <ul className="flex flex-col gap-2">
        {categories.map((c, i) => (
          <li key={c.id} className="flex flex-wrap items-center gap-3 rounded-sm border border-border/70 p-2">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-olive-50 ring-1 ring-border">
              {c.imageUrl ? (
                <img src={mediaUrl(c.imageUrl)} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-[10px] text-foreground/35">No pic</span>
              )}
            </div>

            <div className="min-w-[9rem] flex-1">
              <Input
                defaultValue={c.name}
                disabled={busy}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v && v !== c.name) void updateField(c, { name: v });
                }}
                className="h-8 text-sm"
              />
              <label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-xs text-olive-600 hover:underline">
                <Upload className="h-3 w-3" />
                {c.imageUrl ? "Replace cover" : "Upload cover"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={busy}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void uploadCover(c, f);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <OrderControls
              index={i}
              total={categories.length}
              busy={busy}
              removeLabel="Delete category"
              onMove={(from, to) => void saveOrder(move(categories, from, to))}
              onRemove={() => void removeCategory(c)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-end gap-2">
        <div className="min-w-[10rem] flex-1">
          <Label htmlFor="new-category" className="text-xs">
            New category
          </Label>
          <Input
            id="new-category"
            value={newName}
            disabled={busy}
            placeholder="e.g. Hair Chains"
            onChange={(e) => setNewName(e.target.value)}
            className="mt-1 h-9"
          />
        </div>
        <Button type="button" disabled={busy || !newName.trim()} onClick={() => void addCategory()} className="h-9 bg-olive-600 hover:bg-black">
          Add
        </Button>
      </div>
    </div>
  );
}

// One flag-driven carousel: which products are in it, and in what order.
// Membership and order save together in a single request so a section is
// never left half-applied.
function ProductSectionEditor({
  sectionKey,
  title,
  products,
  allProducts,
  onChange,
  onError,
  onSuccess,
}: Notify & {
  sectionKey: HomepageSectionKey;
  title: string;
  products: AdminPickerProduct[];
  allProducts: AdminPickerProduct[];
  onChange: (p: AdminPickerProduct[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const chosenIds = useMemo(() => new Set(products.map((p) => p.id)), [products]);
  const candidates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts
      .filter((p) => !chosenIds.has(p.id))
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 40);
  }, [allProducts, chosenIds, query]);

  const persist = async (next: AdminPickerProduct[], message: string) => {
    onChange(next); // optimistic
    setBusy(true);
    try {
      const r = await adminApi.homepage.setSection(sectionKey, next.map((p) => p.id));
      onChange(r.products);
      onSuccess(message);
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : `Couldn't save ${title}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {products.length === 0 && (
        <p className="mb-3 text-sm text-foreground/50">
          No products in this section yet — the storefront shows placeholder items until you add some.
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {products.map((p, i) => (
          <li key={p.id} className="flex items-center gap-3 rounded-sm border border-border/70 p-2">
            <span className="w-5 shrink-0 text-center text-[11px] font-semibold text-foreground/35">{i + 1}</span>
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-sm bg-olive-50">
              {p.image && <img src={mediaUrl(p.image)} alt="" loading="lazy" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
              <p className="truncate text-xs text-foreground/45">
                {p.category} · ₹{p.price}
                {!p.active && <span className="ml-1 text-clay-500">· inactive</span>}
              </p>
            </div>
            <OrderControls
              index={i}
              total={products.length}
              busy={busy}
              removeLabel="Remove from this section"
              onMove={(from, to) => void persist(move(products, from, to), `${title} order updated`)}
              onRemove={() => void persist(products.filter((x) => x.id !== p.id), `Removed from ${title}`)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-3">
        {!pickerOpen ? (
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={() => setPickerOpen(true)}
            className="h-9 border-olive-400 text-olive-600 hover:bg-olive-50"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add product
          </Button>
        ) : (
          <div className="rounded-sm border border-border/70 p-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 shrink-0 text-foreground/40" />
              <Input
                autoFocus
                value={query}
                placeholder="Search your catalogue…"
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 flex-1 text-sm"
              />
              <button
                type="button"
                aria-label="Close"
                onClick={() => {
                  setPickerOpen(false);
                  setQuery("");
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-foreground/50 hover:bg-olive-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="mt-2 max-h-64 overflow-y-auto">
              {candidates.length === 0 && <li className="px-1 py-3 text-sm text-foreground/45">No matching products.</li>}
              {candidates.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void persist([...products, p], `Added to ${title}`)}
                    className="flex w-full items-center gap-3 rounded-sm px-1 py-2 text-left transition-colors hover:bg-olive-50 disabled:opacity-50"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-sm bg-olive-50">
                      {p.image && <img src={mediaUrl(p.image)} alt="" loading="lazy" className="h-full w-full object-cover" />}
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm">{p.name}</span>
                      <span className="block truncate text-xs text-foreground/45">
                        {p.category} · ₹{p.price}
                      </span>
                    </span>
                    <Plus className="h-4 w-4 shrink-0 text-olive-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Site-wide copy that isn't tied to a homepage section — shown on every
// product page.
function SiteCopyCard({ onError, onSuccess }: Notify) {
  const [materialsCare, setMaterialsCare] = useState("");
  const [shippingReturns, setShippingReturns] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.siteSettings
      .get()
      .then((r) => {
        setMaterialsCare(r.settings.materials_care || "");
        setShippingReturns(r.settings.shipping_returns || "");
      })
      .catch((e) => onError(e instanceof AdminApiError ? e.message : "Couldn't load site copy"))
      .finally(() => setLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.siteSettings.update({ materials_care: materialsCare, shipping_returns: shippingReturns });
      onSuccess("Product page copy updated");
    } catch (e) {
      onError(e instanceof AdminApiError ? e.message : "Couldn't save the copy");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-md border border-border bg-background">
      <div className="px-4 py-4 sm:px-5">
        <h2 className="font-serif text-base text-olive-600">Product page copy</h2>
        <p className="mt-0.5 text-xs text-foreground/50">
          Shown on every product page, unless a product overrides it with its own text.
        </p>
      </div>
      <form onSubmit={save} className="border-t border-border px-4 py-4 sm:px-5">
        {!loaded ? (
          <p className="text-sm text-foreground/50">Loading…</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="materials-care" className="text-xs">
                Materials &amp; care
              </Label>
              <Textarea
                id="materials-care"
                value={materialsCare}
                onChange={(e) => setMaterialsCare(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="shipping-returns" className="text-xs">
                Shipping &amp; returns
              </Label>
              <Textarea
                id="shipping-returns"
                value={shippingReturns}
                onChange={(e) => setShippingReturns(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={saving} className="self-start bg-olive-600 hover:bg-black">
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
