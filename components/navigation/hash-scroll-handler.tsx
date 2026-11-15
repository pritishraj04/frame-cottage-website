"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function HashScrollInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getTargetElement = (id: string): HTMLElement | null => {
    const cleanId = decodeURIComponent(id.replace(/^#/, "")).trim();
    if (!cleanId) return null;
    try {
      return (
        document.getElementById(cleanId) ||
        document.querySelector(`[id="${CSS.escape(cleanId)}"]`) ||
        document.querySelector(`[name="${CSS.escape(cleanId)}"]`) ||
        null
      );
    } catch {
      return document.getElementById(cleanId);
    }
  };

  const scrollToTarget = (id: string) => {
    const cleanId = decodeURIComponent(id.replace(/^#/, "")).trim();
    if (!cleanId) return;

    if (activeTimerRef.current) {
      clearInterval(activeTimerRef.current);
      activeTimerRef.current = null;
    }

    let attempts = 0;
    const maxAttempts = 24; // 24 * 50ms = 1200ms (1.2s)
    const interval = 50;

    const checkAndScroll = () => {
      const element = getTargetElement(cleanId);
      if (element) {
        if (activeTimerRef.current) {
          clearInterval(activeTimerRef.current);
          activeTimerRef.current = null;
        }
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkAndScroll()) return;

    // Retry polling
    activeTimerRef.current = setInterval(() => {
      attempts++;
      if (checkAndScroll() || attempts >= maxAttempts) {
        if (activeTimerRef.current) {
          clearInterval(activeTimerRef.current);
          activeTimerRef.current = null;
        }
      }
    }, interval);
  };

  // Handle route and searchParams changes (including cross-page navigations with hash)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      scrollToTarget(window.location.hash);
    }
  }, [pathname, searchParams]);

  // Handle hashchange and document-level link clicks
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToTarget(window.location.hash);
      }
    };

    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore right/middle clicks or modified clicks (new tab, etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        const isCurrentPage =
          targetUrl.origin === window.location.origin &&
          targetUrl.pathname === window.location.pathname;

        if (isCurrentPage && targetUrl.hash) {
          const hash = targetUrl.hash;
          e.preventDefault();

          if (window.location.hash !== hash) {
            window.history.pushState(null, "", hash);
          }
          scrollToTarget(hash);
        }
      } catch {
        const parts = href.split("#");
        const pathPart = parts[0];
        const hashPart = parts[1];
        if (hashPart && (!pathPart || pathPart === window.location.pathname)) {
          e.preventDefault();
          const hash = `#${hashPart}`;
          if (window.location.hash !== hash) {
            window.history.pushState(null, "", hash);
          }
          scrollToTarget(hash);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      if (activeTimerRef.current) {
        clearInterval(activeTimerRef.current);
        activeTimerRef.current = null;
      }
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  return null;
}

export function HashScrollHandler() {
  return (
    <Suspense fallback={null}>
      <HashScrollInner />
    </Suspense>
  );
}
