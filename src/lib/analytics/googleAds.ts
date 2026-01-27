"use client";
import { trackButtonClick } from "@/hooks/use-analytics"; // EKLEME
import { trackPhoneClick, trackWhatsAppClick } from "../gtag";

const phoneNumber = "+905375183006";
const whatsappMessage = "Merhaba, CT Prefabrik sitesinden ulaşıyorum.";

export const handleCall = () => {
  // Analytics tracking ekle
  trackButtonClick("telefon-butonu"); // EKLEME

  trackPhoneClick(() => {
    window.location.href = `tel:${phoneNumber}`;
  });

  setTimeout(() => {
    window.location.href = `tel:${phoneNumber}`;
  }, 500);
};

export const handleWhatsApp = () => {
  // Analytics tracking ekle
  trackButtonClick("whatsapp-butonu"); // EKLEME

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, "")}?text=${encodedMessage}`;

  trackWhatsAppClick(() => {
    window.open(whatsappUrl, "_blank");
  });

  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 500);
};
