"use client";
import { trackButtonClick } from "@/hooks/use-analytics"; // EKLEME
import { CONTACT_INFO } from "@/lib/contact";
import { trackPhoneClick, trackWhatsAppClick } from "../gtag";

const callNumber = CONTACT_INFO.primaryPhone.href;
const whatsappNumber = CONTACT_INFO.mobilePhone.href;
const whatsappMessage = "Merhaba, Hürtaş Beton sitesinden ulaşıyorum.";

export const handleCall = () => {
  // Analytics tracking ekle
  trackButtonClick("telefon-butonu"); // EKLEME

  trackPhoneClick(() => {
    window.location.href = `tel:${callNumber}`;
  });

  setTimeout(() => {
    window.location.href = `tel:${callNumber}`;
  }, 500);
};

export const handleWhatsApp = () => {
  // Analytics tracking ekle
  trackButtonClick("whatsapp-butonu"); // EKLEME

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${encodedMessage}`;

  trackWhatsAppClick(() => {
    window.open(whatsappUrl, "_blank");
  });

  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 500);
};
