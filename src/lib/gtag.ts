// lib/gtag.ts

export const trackWhatsAppClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      // BURADAKİ LABEL'I WHATSAPP DÖNÜŞÜMÜNDEN ALIN
      send_to: "AW-17869545270/BURAYA_WHATSAPP_LABELINI_YAZ",
    });
  }
};

export const trackPhoneClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      // BURADAKİ LABEL'I TELEFON DÖNÜŞÜMÜNDEN ALIN
      send_to: "AW-17869545270/BURAYA_TELEFON_LABELINI_YAZ",
      value: 1.0,
      currency: "TRY",
    });
  }
};
// TypeScript için
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
