"use client";
import { trackButtonClick } from "@/hooks/use-analytics";
import { CONTACT_INFO } from "@/lib/contact";
import { trackPhoneClick, trackWhatsAppClick } from "../gtag";

const callNumber = CONTACT_INFO.primaryPhone.href;
const whatsappNumber = CONTACT_INFO.mobilePhone.href;
const whatsappMessage = "Merhaba, Hürtaş Beton sitesinden ulaşıyorum.";

export const handleCall = () => {
  trackButtonClick("telefon-butonu");

  trackPhoneClick(() => {
    window.location.href = `tel:${callNumber}`;
  });
};

export const handleWhatsApp = () => {
  trackButtonClick("whatsapp-butonu");

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${encodedMessage}`;

  trackWhatsAppClick(() => {
    window.open(whatsappUrl, "_blank");
  });
};
