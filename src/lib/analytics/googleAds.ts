"use client";
import { trackPhoneClick, trackWhatsAppClick } from "../gtag";
const phoneNumber = "+905375183006";
const whatsappMessage = "Merhaba, CT Prefabrik sitesinden ulaşıyorum.";

export const handleCall = () => {
  trackPhoneClick(() => {
    window.location.href = `tel:${phoneNumber}`;
  });

  setTimeout(() => {
    window.location.href = `tel:${phoneNumber}`;
  }, 500);
};

export const handleWhatsApp = () => {
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, "")}?text=${encodedMessage}`;

  trackWhatsAppClick(() => {
    window.open(whatsappUrl, "_blank");
  });

  // Güvenlik fallback (Google cevap vermezse)
  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 500);
};
