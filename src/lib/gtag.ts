// lib/gtag.ts

export const trackWhatsAppClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    // WhatsApp dönüşümü
    window.gtag("event", "conversion", {
      send_to: "AW-17869486943",
      event_category: "engagement",
      event_label: "whatsapp_click",
    });
  }
};

export const trackPhoneClick = () => {
  if (typeof window !== "undefined" && window.gtag) {
    // Telefon araması dönüşümü
    window.gtag("event", "conversion", {
      send_to: "AW-17869486943",
      event_category: "engagement",
      event_label: "phone_click",
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
