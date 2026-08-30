import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element is near the viewport.
 *
 * Used to keep video off the critical path. The homepage carries well over
 * 100MB of clips — a hero, a story block, a store banner and a strip of reels —
 * and a <video> with preload="auto" starts downloading the moment it is in the
 * DOM, whether or not anyone can see it. Attaching the source only once an
 * element is close to view means a visitor who never scrolls past the hero
 * never pays for the rest.
 *
 * `rootMargin` starts the fetch slightly before the element scrolls in, so it
 * is usually ready by the time it is actually on screen.
 */
export function useInViewport<T extends Element>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Without IntersectionObserver, show everything rather than nothing.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
