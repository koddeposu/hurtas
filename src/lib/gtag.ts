export const trackWhatsAppClick = (callback?: () => void) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      button_id: "whatsapp-butonu",
    });
  }

  callback?.();
};

export const trackPhoneClick = (callback?: () => void) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "phone_click",
      button_id: "telefon-butonu",
    });
  }

  callback?.();
};

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}
