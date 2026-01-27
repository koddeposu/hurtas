// src/hooks/use-analytics.ts
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Admin sayfalarını takip etme
    if (pathname?.startsWith("/admin")) return;

    // Sayfa yüklendiğinde track et
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        page: pathname,
      }),
    }).catch(console.error);
  }, [pathname]);
}

export function trackButtonClick(buttonId: string) {
  const pathname = window.location.pathname;

  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "click",
      buttonId,
      page: pathname,
    }),
  }).catch(console.error);
}
