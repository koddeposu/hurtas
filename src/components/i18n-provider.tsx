"use client";

import {
  DEFAULT_LOCALE,
  getDictionary,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { createContext, useCallback, useContext } from "react";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useDictionary() {
  return getDictionary(useLocale());
}

export function useLocalizedPath() {
  const locale = useLocale();

  return useCallback((path: string) => localizePath(path, locale), [locale]);
}
