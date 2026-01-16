// lib/gtag.ts

export const trackWhatsAppClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    // WhatsApp dönüşümü
    window.gtag("event", "conversion", {
      send_to: "AW-17869545270/zDvHCL7a5uYbELa-7shC",
      event_category: "engagement",
      event_label: "whatsapp_click",
    });
  }
};

export const trackPhoneClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17869545270/zDvHCL7a5uYbELa-7shC",
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
