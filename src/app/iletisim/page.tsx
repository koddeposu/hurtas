"use client";

import { LeadForm } from '@/components/form';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<Phone size={32} />}
              label="Bizi Arayın"
              value="+90 (264) xxx xx xx"
              sub="Hafta içi: 09:00 - 18:00"
              delay={0.1}
            />
            <ContactCard
              icon={<Mail size={32} />}
              label="E-Posta Gönderin"
              value="destek@aktasprefabrik.com"
              sub="7/24 Yanıt Garantisi"
              delay={0.2}
            />
            <ContactCard
              icon={<MapPin size={32} />}
              label="Merkez Ofisimiz"
              value="Erenler, Sakarya"
              sub="Tesislerimize Kahveye Bekleriz"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <section className=" bg-white">
        <div className="relative">
          <LeadForm />
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          >
            <div className="text-[15rem] font-black text-[#49202d]">EST.</div>
          </motion.div>
        </div>
      </section>

      {/* --- GOOGLE MAPS (YENİ NESİL FULL WIDTH) --- */}
      <section className="h-[500px] w-full bg-slate-100 grayscale hover:grayscale-0 transition-all duration-1000 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193397.3551579737!2d30.2520625!3d40.7719625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb6599b45e7f1b%3A0xc392e2133a8a3a0d!2sSakarya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
        <div className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-2xl max-w-xs border border-[#49202d]/10">
          <h4 className="font-black text-[#49202d] mb-2 uppercase text-xs tracking-widest">Yol Tarifi</h4>
          <p className="text-slate-500 text-sm mb-4">Üretim tesislerimizi ziyaret etmek için konum alabilirsiniz.</p>
          <button className="flex items-center gap-2 text-[#49202d] font-bold text-xs group">
            HARİTALARDA AÇ <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

const ContactCard = ({ icon, label, value, sub, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="group p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-[#49202d]/5 hover:-translate-y-2 transition-all duration-500"
  >
    <div className="mb-6 w-16 h-16 bg-[#49202d]/5 text-[#49202d] rounded-2xl flex items-center justify-center group-hover:bg-[#49202d] group-hover:text-white transition-colors duration-500">
      {icon}
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <h3 className="text-lg font-bold text-[#49202d] mb-1">{value}</h3>
    <p className="text-slate-400 text-sm font-medium">{sub}</p>
  </motion.div>
);

export default ContactPage;
