"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CONTACT_INFO, CONTACT_PHONES } from "@/lib/contact";
import {
  ALL_PRODUCTS_PATH,
  getCategoryDisplayName,
  getCategoryHref,
  getTopLevelCategories,
} from "@/lib/productRoutes";
import {
  ArrowUpRight,
  Building2,
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  title: string | null;
  slug: string;
  order: number;
}

interface FooterProps {
  categories?: Category[];
}

const pageLinks = [
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Arge", href: "/arge" },
  { name: "Ürünler", href: ALL_PRODUCTS_PATH },
  { name: "Blog", href: "/blog" },
  { name: "Projelerimiz", href: "/projelerimiz" },
  { name: "İletişim", href: "/iletisim" },
];

const FOOTER_PRODUCTS = [
  "Beton Boru",
  "Parke Taşı",
  "Bordür",
  "Menhol",
  "Yağmur Oluğu",
];

const Footer = ({ categories = [] }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (
    text: string,
    type: "address" | "phone" | "email",
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "address") {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  const productLinks =
    categories.length > 0
      ? getTopLevelCategories(categories).slice(0, 5).map((category) => ({
          name: getCategoryDisplayName(category),
          href: getCategoryHref(categories, category),
        }))
      : FOOTER_PRODUCTS.map((name) => ({
          name,
          href: `${ALL_PRODUCTS_PATH}?q=${encodeURIComponent(name)}`,
        }));

  return (
    <footer className="safe-area-footer bg-[#0d1f36] px-4 pt-10 pb-8 font-[family-name:var(--font-poppins)] text-white sm:px-6 lg:px-8 lg:pt-14">
      <div className="mx-auto max-w-7xl">
        <section className="border border-white/15 bg-[#10243d]">
          <div className="grid gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
                Proje Tedariki
              </p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black tracking-tight text-white sm:text-3xl">
                Beton ürün ihtiyacınızı netleştirelim.
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-300">
                Altyapı, üst yapı ve çevre düzenleme ürünleri için doğru adet,
                doğru ürün ve planlı sevkiyat.
              </p>
            </div>

            <a
              href={`tel:${CONTACT_INFO.primaryPhone.href}`}
              className="inline-flex min-h-12 w-fit items-center justify-center gap-2 border border-[#d6a94a] bg-[#d6a94a] px-5 text-xs font-black uppercase tracking-[0.14em] text-[#152f51] transition-colors hover:bg-transparent hover:text-[#f4d78d] ads-phone-call"
            >
              <Phone className="h-4 w-4" />
              Hemen Ara
            </a>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10 border-x border-b border-white/15 px-4 py-10 sm:px-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-6">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-[#d6a94a]/45 bg-[#d6a94a] text-[#152f51]">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-black tracking-tight text-white">
                  {CONTACT_INFO.companyName}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d6a94a]">
                  Beton Elemanları
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-slate-300">
              Altyapı ve üst yapı beton elemanlarında dayanıklı üretim,
              anlaşılır ürün seçimi ve düzenli tedarik yaklaşımıyla çalışıyoruz.
            </p>
          </div>

          <nav className="lg:col-span-2" aria-label="Footer kurumsal linkleri">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d6a94a]">
              Kurumsal
            </h4>
            <ul className="mt-5 space-y-3">
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Footer ürün linkleri">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d6a94a]">
              Ürünler
            </h4>
            <ul className="mt-5 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-white"
                  >
                    {item.name}
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#d6a94a]" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d6a94a]">
              İletişim
            </h4>
            <div className="mt-5 space-y-4">
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                copied={copiedAddress}
                copyLabel="Adresi kopyala"
                onCopy={() =>
                  copyToClipboard(CONTACT_INFO.address.full, "address")
                }
              >
                <p className="text-sm font-medium leading-6 text-slate-300">
                  {CONTACT_INFO.address.street}
                  <br />
                  {CONTACT_INFO.address.note}
                  <br />
                  {CONTACT_INFO.address.short}
                </p>
              </ContactRow>

              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                copied={copiedPhone}
                copyLabel="Telefon numarasını kopyala"
                onCopy={() =>
                  copyToClipboard(
                    CONTACT_PHONES.map((phone) => phone.display).join(" / "),
                    "phone",
                  )
                }
              >
                <div className="space-y-1">
                  {CONTACT_PHONES.map((phone) => (
                    <a
                      key={phone.href}
                      href={`tel:${phone.href}`}
                      className="block text-sm font-black text-white transition-colors hover:text-[#f4d78d]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </ContactRow>

              <ContactRow
                icon={<Mail className="h-4 w-4" />}
                copied={copiedEmail}
                copyLabel="E-posta adresini kopyala"
                onCopy={() => copyToClipboard(CONTACT_INFO.email, "email")}
              >
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm font-bold text-slate-200 transition-colors hover:text-[#f4d78d]"
                  onClick={(event) => event.stopPropagation()}
                >
                  {CONTACT_INFO.email}
                </a>
              </ContactRow>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-x border-b border-white/15 px-4 py-5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 sm:px-5 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>
            © {currentYear} {CONTACT_INFO.companyName}. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/kvkk" className="transition-colors hover:text-white">
              KVKK
            </Link>
            <Link href="/iletisim" className="transition-colors hover:text-white">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface ContactRowProps {
  icon: React.ReactNode;
  copied: boolean;
  copyLabel: string;
  onCopy: () => void;
  children: React.ReactNode;
}

function ContactRow({
  icon,
  copied,
  copyLabel,
  onCopy,
  children,
}: ContactRowProps) {
  return (
    <div className="group relative cursor-pointer" onClick={onCopy}>
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-[#d6a94a]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">{children}</div>
        <button
          type="button"
          aria-label={copyLabel}
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-transparent text-slate-500 transition-colors hover:border-white/15 hover:bg-white/5 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[#d6a94a]" />
          ) : (
            <Copy className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {copied ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-9 left-0 border border-[#d6a94a]/35 bg-[#10243d] px-3 py-1 text-xs font-bold text-[#f4d78d] shadow-[0_16px_34px_-24px_rgba(0,0,0,0.8)]"
          >
            Kopyalandı
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default Footer;
