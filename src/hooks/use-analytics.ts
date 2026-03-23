// src/hooks/use-analytics.ts
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const VISITOR_ID_KEY = "ct_visitor_id";

function getVisitorId() {
  const existingId = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existingId) return existingId;

  const newId = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_ID_KEY, newId);
  return newId;
}

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Admin sayfalarını takip etme
    if (pathname?.startsWith("/admin")) return;

    const visitorId = getVisitorId();

    // Sayfa yüklendiğinde track et
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        page: pathname,
        visitorId,
      }),
    }).catch(console.error);
  }, [pathname]);
}

export function trackButtonClick(buttonId: string) {
  const pathname = window.location.pathname;
  const visitorId = getVisitorId();

  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "click",
      buttonId,
      page: pathname,
      visitorId,
    }),
  }).catch(console.error);
}
