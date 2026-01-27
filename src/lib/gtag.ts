// lib/gtag.ts

export const trackWhatsAppClick = (callback?: () => void) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17869545270/c6tyCK_3kekbELa-7shC",
      event_callback: callback,
    });
  } else {
    // gtag yoksa bile kullanıcıyı kaybetme
    callback?.();
  }
};

export const trackPhoneClick = (callback?: () => void) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17869545270/c6tyCK_3kekbELa-7shC",
      event_callback: callback,
    });
  } else {
    callback?.();
  }
};
// TypeScript için
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
