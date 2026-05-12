"use client";

import { LeadForm } from "@/components/form";
import { useDictionary } from "@/components/i18n-provider";
import {
  CONTACT_INFO,
  CONTACT_MAP_EMBED_URL,
  CONTACT_MAP_URL,
  CONTACT_PHONES,
} from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function ContactPageClient() {
  const dict = useDictionary();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: "phone" | "email" | "address",
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      }
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Telefon - Schema ile uyumlu */}
            <div itemScope itemType="https://schema.org/ContactPoint">
              {CONTACT_PHONES.map((phone) => (
                <meta
                  key={phone.href}
                  itemProp="telephone"
                  content={phone.href}
                />
              ))}
              <meta itemProp="contactType" content="customer service" />
              <ContactCard
                icon={<Phone size={32} />}
                label={dict.contactPage.phoneLabel}
                value={`${CONTACT_INFO.primaryPhone.display} / ${CONTACT_INFO.mobilePhone.display}`}
                sub={dict.contactPage.weekday}
                delay={0.1}
                onCopy={() =>
                  copyToClipboard(
                    CONTACT_PHONES.map((phone) => phone.display).join(" / "),
                    "phone",
                  )
                }
                copied={copiedPhone}
                copiedText={dict.contactPage.copied}
                copySuffix={dict.contactPage.copy}
              />
            </div>

            {/* E-posta - Schema ile uyumlu */}
            <div itemScope itemType="https://schema.org/ContactPoint">
              <meta itemProp="email" content={CONTACT_INFO.email} />
              <ContactCard
                icon={<Mail size={32} />}
                label={dict.contactPage.emailLabel}
                value={CONTACT_INFO.email}
                sub={dict.contactPage.emailSub}
                delay={0.2}
                onCopy={() => copyToClipboard(CONTACT_INFO.email, "email")}
                copied={copiedEmail}
                copiedText={dict.contactPage.copied}
                copySuffix={dict.contactPage.copy}
              />
            </div>

            {/* Adres - Schema ile uyumlu */}
            <div itemScope itemType="https://schema.org/PostalAddress">
              <meta
                itemProp="streetAddress"
                content={`${CONTACT_INFO.address.street}, ${CONTACT_INFO.address.note}`}
              />
              <meta
                itemProp="addressLocality"
                content={CONTACT_INFO.address.locality}
              />
              <meta
                itemProp="addressRegion"
                content={CONTACT_INFO.address.region}
              />
              <meta itemProp="addressCountry" content="TR" />
              <ContactCard
                icon={<MapPin size={32} />}
                label={dict.contactPage.addressLabel}
                value={CONTACT_INFO.address.full}
                sub={dict.contactPage.addressSub}
                delay={0.3}
                onCopy={() =>
                  copyToClipboard(CONTACT_INFO.address.full, "address")
                }
                copied={copiedAddress}
                copiedText={dict.contactPage.copied}
                copySuffix={dict.contactPage.copy}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5">
        <div className="relative">
          <LeadForm />
        </div>
      </section>

      {/* GOOGLE MAPS - Yerel SEO için kritik */}
      <section
        className="h-[500px] w-full bg-slate-100 grayscale hover:grayscale-0 transition-all duration-1000 relative mt-20"
        itemScope
        itemType="https://schema.org/Map"
      >
        <iframe
          src={CONTACT_MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title={dict.contactPage.mapTitle}
          itemProp="hasMap"
        />
        <div className="absolute top-10 right-10 max-w-xs rounded-[3px] border border-slate-300 bg-white p-6 shadow-[0_20px_44px_-28px_rgba(15,23,42,0.24)]">
          <h4 className="font-black text-[#152f51] mb-2 uppercase text-xs tracking-widest">
            {dict.contactPage.directions}
          </h4>
          <p className="text-slate-500 text-sm mb-4">
            {dict.contactPage.directionsText}
          </p>
          <a
            href={CONTACT_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#152f51] font-bold text-xs group"
          >
            {dict.contactPage.openMaps}{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </section>
    </div>
  );
}

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  delay: number;
  onCopy: () => void;
  copied: boolean;
  copiedText: string;
  copySuffix: string;
}

const ContactCard = ({
  icon,
  label,
  value,
  sub,
  delay,
  onCopy,
  copied,
  copiedText,
  copySuffix,
}: ContactCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="group relative rounded-[3px] border border-slate-300 bg-white p-8 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.18)]"
  >
    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[2px] bg-[#152f51] text-white transition-colors duration-300 group-hover:bg-[#d6a94a] group-hover:text-[#152f51]">
      {icon}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
      {label}
    </p>
    <div className="relative">
      <h3 className="text-lg font-bold text-[#152f51] mb-1 pr-8">{value}</h3>
      <button
        onClick={onCopy}
        className="absolute right-0 top-0 p-1.5 rounded-[2px] hover:bg-slate-100 transition-colors"
        aria-label={`${label} ${copySuffix}`}
      >
        {copied ? (
          <Check size={18} className="text-secondary" />
        ) : (
          <Copy
            size={18}
            className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-10 left-0 whitespace-nowrap rounded-[2px] bg-secondary px-3 py-1 text-xs font-semibold text-[#152f51] shadow-lg"
          >
            {copiedText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <p className="text-slate-400 text-sm font-medium">{sub}</p>
  </motion.div>
);
