"use client";
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  Facebook,
  Home,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter
} from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = async (text: string, type: 'address' | 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'address') {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  return (
    <footer className="bg-white pt-20 pb-10 px-6 font-[family-name:var(--font-poppins)]">
      <div className="container mx-auto max-w-7xl">

        {/* Üst CTA Alanı: Yumuşak bir geçiş kutusu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative bg-slate-900 rounded-[3rem] p-8 md:p-12 overflow-hidden mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-900/20"
        >
          {/* Arka plan süsü */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#165b39] opacity-20 blur-[80px] -z-0" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Hayalinizdeki yuvayı <br />
              <span className="text-emerald-500 italic">birlikte inşa edelim.</span>
            </h2>
          </div>

          <button
            className="relative z-10 px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-sm flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-xl active:scale-95"
          >
            TEKLİF ALIN <ArrowUpRight size={20} className="text-[#165b39]" />
          </button>
        </motion.div>

        {/* Ana Footer İçeriği */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* 1. Kolon: Marka & Hakkında */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter" style={{ color: '#165b39' }}>
              <Home className="w-8 h-8" /> CT <span style={{ color: '#49202d' }}>PREFABRİK</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-sm">
              Sakarya CT Prefabrik olarak, modern mimariyi çeliğin gücüyle birleştiriyoruz.
              Sizin için güvenli, hızlı ve sürdürülebilir yaşam alanları tasarlıyoruz.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#165b39] hover:text-white transition-all shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Kolon: Hızlı Linkler */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: '#49202d' }}>Kurumsal</h4>
            <ul className="space-y-4">
              {['Hakkımızda', 'Modellerimiz', 'Süreç', 'Projeler', 'Blog'].map((item) => (
                <li key={item}>
                  <div className="text-sm font-semibold text-slate-500 hover:text-[#165b39] transition-colors">{item}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Kolon: Hizmetler */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: '#49202d' }}>Hizmetler</h4>
            <ul className="space-y-4">
              {['Prefabrik Evler', 'Çelik Yapılar', 'Konteyner', 'Özel Çizim', 'Montaj'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-semibold text-slate-500 hover:text-[#165b39] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Kolon: İletişim */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em]" style={{ color: '#49202d' }}>İletişim</h4>
            <div className="space-y-4">
              {/* Adres */}
              <div className="relative group cursor-pointer" onClick={() => copyToClipboard('Sakarya Prefabrik Üretim Tesisleri, Erenler / Sakarya', 'address')}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 text-[#165b39]">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500">
                      Sakarya Prefabrik Üretim Tesisleri, <br /> Erenler / Sakarya
                    </p>
                  </div>
                  <button

                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedAddress ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {copiedAddress && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-10 left-0 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-10"
                    >
                      ✓ Kopyalandı!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Telefon */}
              <div className="relative group">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => copyToClipboard('+90 537 518 30 06', 'phone')}>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 text-[#165b39]">
                    <Phone size={18} />
                  </div>
                  <p className="text-sm font-bold text-slate-900 flex-1">+90 537 518 30 06</p>
                  <button

                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedPhone ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {copiedPhone && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-10 left-0 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-10"
                    >
                      ✓ Kopyalandı!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div className="relative group cursor-pointer" onClick={() => copyToClipboard('info@ctprefabrik.com', 'email')}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 text-[#165b39]">
                    <Mail size={18} />
                  </div>
                  <p className="text-sm font-medium text-slate-500 flex-1">info@ctprefabrik.com</p>
                  <button

                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedEmail ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-10 left-0 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-10"
                    >
                      ✓ Kopyalandı!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bar: Copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © {currentYear} CT PREFABRİK. TÜM HAKLARI SAKLIDIR.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-[#49202d] transition-colors">KVKK</a>
            <a href="#" className="hover:text-[#49202d] transition-colors">YASAL UYARI</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
