"use client";

import { LeadForm } from '@/components/form';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ContactPageClient() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const copyToClipboard = async (text: string, type: 'phone' | 'email' | 'address') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      }
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 px-6 bg-[#fdfafb] overflow-hidden w-full">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <span className="px-4 py-1.5 rounded-full bg-[#49202d]/10 text-[#49202d] text-xs font-black tracking-widest uppercase mb-6 inline-block">
              Bize Ulaşın
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#49202d] leading-none tracking-tighter mb-8">
              Sizinle Tanışmak <br /> <span className="text-slate-400 italic font-light text-4xl md:text-6xl">İçin Sabırsızlanıyoruz.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* İLETİŞİM KARTLARI - Schema için önemli */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Telefon - Schema ile uyumlu */}
            <div itemScope itemType="https://schema.org/ContactPoint">
              <meta itemProp="telephone" content="+905375183006" />
              <meta itemProp="contactType" content="customer service" />
              <ContactCard
                icon={<Phone size={32} />}
                label="Bizi Arayın"
                value="+90 537 518 30 06"
                sub="Hafta içi: 09:00 - 18:00"
                delay={0.1}
                onCopy={() => copyToClipboard('+905375183006', 'phone')}
                copied={copiedPhone}
              />
            </div>

            {/* E-posta - Schema ile uyumlu */}
            <div itemScope itemType="https://schema.org/ContactPoint">
              <meta itemProp="email" content="info@ctprefabrik.com" />
              <ContactCard
                icon={<Mail size={32} />}
                label="E-Posta Gönderin"
                value="info@ctprefabrik.com"
                sub="7/24 Yanıt Garantisi"
                delay={0.2}
                onCopy={() => copyToClipboard('info@ctprefabrik.com', 'email')}
                copied={copiedEmail}
              />
            </div>

            {/* Adres - Schema ile uyumlu */}
            <div itemScope itemType="https://schema.org/PostalAddress">
              <meta itemProp="streetAddress" content="Soğucak, Kervan/1 Sokak No: 2/4" />
              <meta itemProp="addressLocality" content="Söğütlü" />
              <meta itemProp="addressRegion" content="Sakarya" />
              <meta itemProp="postalCode" content="54160" />
              <meta itemProp="addressCountry" content="TR" />
              <ContactCard
                icon={<MapPin size={32} />}
                label="Merkez Ofisimiz"
                value="Soğucak, Kervan/1 Sokak No: 2/4, 54160 Söğütlü/Sakarya"
                sub="Tesislerimize Kahveye Bekleriz"
                delay={0.3}
                onCopy={() => copyToClipboard('Soğucak, Kervan/1 Sokak No: 2/4, 54160 Söğütlü/Sakarya', 'address')}
                copied={copiedAddress}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5">
        <div className="relative">
          <LeadForm />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          >
            <div className="text-[15rem] font-black text-[#49202d]">2005</div>
          </motion.div>
        </div>
      </section>

      {/* GOOGLE MAPS - Yerel SEO için kritik */}
      <section
        className="h-[500px] w-full bg-slate-100 grayscale hover:grayscale-0 transition-all duration-1000 relative mt-20"
        itemScope
        itemType="https://schema.org/Map"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d188.48880587821307!2d30.50763411393848!3d40.89774357467647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDUzJzUxLjciTiAzMMKwMzAnMjcuOSJF!5e0!3m2!1str!2str!4v1767361404509!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="CT Prefabrik Merkez Ofis Konumu"
          itemProp="hasMap"
        />
        <div className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border border-[#49202d]/10">
          <h4 className="font-black text-[#49202d] mb-2 uppercase text-xs tracking-widest">Yol Tarifi</h4>
          <p className="text-slate-500 text-sm mb-4">Üretim tesislerimizi ziyaret etmek için konum alabilirsiniz.</p>
          <a
            href="https://www.google.com/maps/dir//40.8977436,30.5076341/@40.8977436,30.5076341,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#49202d] font-bold text-xs group"
          >
            HARİTALARDA AÇ <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
}

const ContactCard = ({ icon, label, value, sub, delay, onCopy, copied }: ContactCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="group p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-[#49202d]/5 hover:-translate-y-2 transition-all duration-500 relative"
  >
    <div className="mb-6 w-16 h-16 bg-[#49202d]/5 text-[#49202d] rounded-2xl flex items-center justify-center group-hover:bg-[#49202d] group-hover:text-white transition-colors duration-500">
      {icon}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <div className="relative">
      <h3 className="text-lg font-bold text-[#49202d] mb-1 pr-8">{value}</h3>
      <button
        onClick={onCopy}
        className="absolute right-0 top-0 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label={`${label} kopyala`}
      >
        {copied ? (
          <Check size={18} className="text-secondary" />
        ) : (
          <Copy size={18} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-10 left-0 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
          >
            ✓ Kopyalandı!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <p className="text-slate-400 text-sm font-medium">{sub}</p>
  </motion.div>
);
