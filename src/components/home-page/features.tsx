"use client";
import { motion } from 'framer-motion';
import { Gem, Ruler, Shield, Smile, Star, Zap } from 'lucide-react';

export const Features = () => {
  const features = [
    { id: "01", title: "Sektöründe Öncü", icon: <Star size={20} />, color: "#165b39" },
    { id: "02", title: "Güvenilir Yapı", icon: <Shield size={20} />, color: "#49202d" },
    { id: "03", title: "Yüksek Kalite", icon: <Gem size={20} />, color: "#165b39" },
    { id: "04", title: "Modern Tasarımlar", icon: <Ruler size={20} />, color: "#49202d" },
    { id: "05", title: "Fiyat Performans", icon: <Zap size={20} />, color: "#165b39" },
    { id: "06", title: "Mutlu Müşteriler", icon: <Smile size={20} />, color: "#49202d" },
  ];

  return (
    <section className="relative py-32  overflow-hidden font-[family-name:var(--font-poppins)]">

      {/* Arka Plan Büyük Yazı Efekti (Mimari Dergi Hissi) */}
      <div className="absolute top-10 left-[-5%] text-[15vw] font-black text-slate-50 select-none leading-none z-0">
        AKTAŞ
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* SOL TARAF: Sabit Başlık Alanı (Dikey Çizgili) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#165b39]" />
                <span className="text-[#165b39] font-bold text-xs uppercase tracking-[0.4em]">Ayrıcalıklarımız</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black tracking-tighter  text-slate-900 leading-[1.1] mb-8">
                Neden <br />
                <span style={{ color: '#49202d' }}>AKTAŞ</span> Prefabrik?
              </h2>

              <div className="relative pl-8 border-l-2 border-slate-100 space-y-6">
                <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                  "Güven ve kalite üzerine inşa edilmiş bir gelecek sunuyoruz."
                </p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Geleneksel yapıların hantallığından uzak, modern yaşamın tüm ihtiyaçlarını karşılayan bütünsel bir deneyim.
                </p>
              </div>
            </motion.div>
          </div>

          {/* SAĞ TARAF: Merdiven Tipi (Staggered) Özellik Listesi */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
              {features.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`group relative pt-12 ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
                >
                  {/* Sayısal Gösterge ve İnce Çizgi */}
                  <div className="absolute top-0 left-0 flex items-center gap-4 w-full">
                    <span
                      className="text-4xl font-black opacity-10 group-hover:opacity-100 transition-all duration-500"
                      style={{ color: item.color }}
                    >
                      {item.id}
                    </span>
                    <div className="h-[1px] flex-grow bg-slate-100 group-hover:bg-slate-200 transition-all" />
                  </div>

                  {/* Soft Box İçerik */}
                  <div className="bg-white rounded-tr-[3rem] rounded-bl-[3rem] p-8 border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Aktaş Standartları
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Dekoratif Yan Çizgiler (Technical Drawing Style) */}
      <div className="absolute right-0 top-0 h-full w-24 border-l border-slate-50 hidden xl:block" />
    </section>
  );
};
