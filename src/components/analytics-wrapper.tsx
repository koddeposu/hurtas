// src/components/analytics-wrapper.tsx
"use client";

import { usePageTracking } from "@/hooks/use-analytics";

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  usePageTracking();
  return <>{children}</>;
}
