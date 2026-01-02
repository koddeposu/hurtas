"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, MoveRight, Plus } from 'lucide-react';
import { useState } from 'react';

// --- ÖZEL VEKTÖREL BİLEŞENLER ---

// Teknik Çapraz (Crosshair) Vektörü
export const Crosshair = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-20">
    <line x1="12" y1="0" x2="12" y2="24" stroke={color} strokeWidth="0.5" />
    <line x1="0" y1="12" x2="24" y2="12" stroke={color} strokeWidth="0.5" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="0.5" />
  </svg>
);

// Milimetrik Cetvel Vektörü
const TechnicalRuler = ({ color }: { color: string }) => (
  <div className="flex items-end gap-1 opacity-20 h-4">
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="w-[1px] bg-current"
        style={{ height: i % 5 === 0 ? '100%' : '50%', color: color }}
      />
    ))}
  </div>
);

const FAQ = () => {
  const [activeId, setActiveId] = useState<number | null>(0);

  const questions = [
    {
      id: 0,
      q: "Prefabrik ev satın alma süreci nasıl işliyor?",
      a: "İlk olarak ihtiyaçlarınıza uygun model seçilir. Ardından projenin onayı, üretim ve teslimat süreci başlar. Araziniz hazırsa, kurulum ve montaj işlemi kısa sürede tamamlanır.",
      tag: "STRUCTURAL_SAFETY"
    },
    {
      id: 1,
      q: "Prefabrik evlerin teslim süresi ne kadar?",
      a: "Projenin büyüklüğüne göre değişmekle birlikte, üretim süreci ortalama 2-4 hafta, kurulum süreci ise 3-7 gün arasında tamamlanmaktadır.",
      tag: "PERMIT_PROCESS"
    },
    {
      id: 2,
      q: "Prefabrik evlerin ömrü ne kadar?",
      a: "Kaliteli malzeme ve doğru kurulumla prefabrik evlerin ömrü 40-50 yıla kadar çıkabilmektedir. Düzenli bakım yapıldığında daha uzun süre kullanılabilir.",
      tag: "TIMELINE_EST"
    },
    {
      id: 3,
      q: "Kurulum yapılacak arazi nasıl olmalı?",
      a: "Arazinin eğimsiz veya hafif eğimli olması, zeminin sert ve taşıyıcı özellikte olması gerekir. Gerekli altyapılar (su, elektrik, kanalizasyon) hazır olmalıdır.",
      tag: "TIMELINE_EST"
    },
    {
      id: 4,
      q: "Kredi veya taksitli ödeme seçenekleri var mı?",
      a: "Evet, anlaşmalı bankalar aracılığıyla kredi ile ödeme imkânı sunuyoruz. Ayrıca bazı projelerimizde esnek taksitlendirme seçenekleri de mevcuttur. Detaylar için satış ekibimizle iletişime geçebilirsiniz.",
      tag: "TIMELINE_EST"
    }
  ];

  return (
    <section className="relative  overflow-hidden">

      {/* ARKA PLAN DEKORASYONU: Nokta Matrisi */}
      <div className="absolute top-20 right-20 opacity-10 rotate-12">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#165b39]" />
          ))}
        </div>
      </div>

      <div className="container mx-auto  max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* SOL: BAŞLIK ALANI (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Crosshair color="#49202d" />
                <span className="text-[#49202d] font-black text-xs uppercase tracking-[0.5em]">Sıkça Sorulanlar</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                AKLINIZA <br /> <span style={{ color: '#165b39' }}>TAKILANLAR.</span>
              </h2>
              <div className="mt-10 flex items-center gap-6">
                <TechnicalRuler color="#165b39" />
                <p className="text-slate-400 font-medium italic text-sm">Teknik Sorular & Yanıtlar</p>
              </div>
            </motion.div>
          </div>

          {/* SAĞ: AKORDİYON ALANI */}
          <div className="lg:col-span-7 space-y-6">
            {questions.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden transition-all duration-500 border ${activeId === faq.id
                  ? 'bg-white border-[#165b39]/20 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)]'
                  : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                  } rounded-[2rem]`}
              >
                {/* Teknik Etiket (Hover'da beliren numara) */}
                <div className="absolute top-4 right-8 text-[8px] font-mono text-slate-200 tracking-[0.3em] uppercase">
                  Ref_ID: 00{i + 1}
                </div>

                <button
                  onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                  className="w-full p-8 md:p-10 flex justify-between items-center text-left relative z-10"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="text-xs font-black italic opacity-20 group-hover:opacity-100 transition-opacity"
                      style={{ color: activeId === faq.id ? '#165b39' : '#49202d' }}
                    >
                      {activeId === faq.id ? 'Aktif' : 'Soru'}
                    </span>
                    <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-500 ${activeId === faq.id ? 'text-[#165b39]' : 'text-slate-800'
                      }`}>
                      {faq.q}
                    </span>
                  </div>

                  <div className={`shrink-0 ml-4 p-2 rounded-full transition-all duration-500 ${activeId === faq.id ? 'bg-[#165b39] text-white rotate-180' : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100'
                    }`}>
                    {activeId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="px-10 pb-10 relative">
                        {/* İç Teknik Çizgi */}
                        <div className="w-full h-[1px] bg-slate-100 mb-6" />

                        <div className="flex gap-6">
                          <div className="hidden md:block pt-1">
                            <MoveRight size={16} className="text-[#49202d]" />
                          </div>
                          <p className="text-slate-500 text-lg leading-relaxed font-medium italic">
                            {faq.a}
                          </p>
                        </div>

                        {/* Alt Teknik Detay (Vektör) */}
                        <div className="mt-8 flex justify-between items-center opacity-30">
                          <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 bg-[#165b39] rounded-full" />
                            <div className="w-8 h-1.5 bg-[#49202d] rounded-full" />
                          </div>
                          <span className="text-[8px] font-mono tracking-widest uppercase">{faq.tag}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Büyük Dekoratif Filigran */}
      <div className="absolute -bottom-20 -left-20 text-[20vw] font-black text-slate-50 select-none -z-10 leading-none">
        FAQ
      </div>
    </section>
  );
};

export default FAQ;
