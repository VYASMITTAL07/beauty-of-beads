type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: Window["fbq"];
  }
}

// Meta Pixel IDs are public identifiers; customer and payment details never
// belong in this file.
export const META_PIXEL_ID = "990893900023756";

let initializedPixelId: string | null = null;

export function initializeMetaPixel(pixelId: string) {
  const id = pixelId.trim();
  if (typeof window === "undefined" || !/^\d+$/.test(id) || initializedPixelId === id) return;

  let fbq = window.fbq;
  if (!fbq) {
    const queueingFbq: MetaPixelFunction = function (...args: unknown[]) {
      if (queueingFbq.callMethod) queueingFbq.callMethod(...args);
      else queueingFbq.queue.push(args);
    } as MetaPixelFunction;
    queueingFbq.queue = [];
    queueingFbq.loaded = true;
    queueingFbq.version = "2.0";
    fbq = queueingFbq;
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  fbq("set", "autoConfig", false, id);
  fbq("init", id);
  fbq("track", "PageView");
  initializedPixelId = id;
}

export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
  eventId?: string,
) {
  const fbq = typeof window !== "undefined" ? window.fbq : undefined;
  if (!fbq || !initializedPixelId) return;

  if (eventId) {
    fbq("track", eventName, parameters ?? {}, { eventID: eventId });
  } else if (parameters) {
    fbq("track", eventName, parameters);
  } else {
    fbq("track", eventName);
  }
}
