import { headers } from "next/headers";
import { DEFAULT_LOCALE, normalizeLocale, type Locale } from "@/lib/i18n";

export const LOCALE_HEADER = "x-hurtas-locale";

export async function getCurrentLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  return normalizeLocale(requestHeaders.get(LOCALE_HEADER) ?? DEFAULT_LOCALE);
}
