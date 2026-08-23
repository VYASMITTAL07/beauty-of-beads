import { useEffect } from "react";

// Locks background scrolling while a full-screen overlay is open.
//
// Every overlay used to inline its own save/restore:
//
//   const prev = document.body.style.overflowY;
//   document.body.style.overflowY = "hidden";
//   return () => { document.body.style.overflowY = prev; };
//
// which is not nestable. Opening an order's detail from inside Order History
// meant the second overlay captured `prev` as "hidden" (already set by the
// first), so closing both restored "hidden" and the page stayed frozen —
// the "home page gets stuck" bug.
//
// A single module-level counter fixes that: only the first lock records the
// real original value, and only the last release puts it back.
let lockCount = 0;
let originalOverflowY = "";

function acquire() {
  if (lockCount === 0) {
    originalOverflowY = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
  }
  lockCount += 1;
}

function release() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflowY = originalOverflowY;
  }
}

/**
 * @param active whether this overlay currently wants the lock. Passing false
 *   (e.g. a modal that renders while closed) is a no-op rather than a lock.
 */
export function useBodyScrollLock(active = true) {
  useEffect(() => {
    if (!active) return;
    acquire();
    return release;
  }, [active]);
}
