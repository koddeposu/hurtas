'use client'
import Image1 from '@/assets/hero/home-page-1.webp';
import Image2 from '@/assets/hero/home-page-2.webp';
import Image3 from '@/assets/hero/home-page-3.webp';
import { default as Image4 } from '@/assets/hero/home-page-4.webp';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, MousePointer2, Play } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';



export const Hero1 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Yazı için scale ve opacity animasyonu
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Görseller için farklı hareket rotaları (Parallax & Scale)
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const img1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const img2Scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1]);

  const img3Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const img4Y = useTransform(scrollYProgress, [0, 1], [0, 250]);

  const images = [
    { src: Image1, pos: "top-10 left-[5%]", motion: { y: img1Y, scale: img1Scale }, size: "w-48 h-64" },
    { src: Image2, pos: "bottom-20 left-[15%]", motion: { y: img2Y, scale: img2Scale }, size: "w-64 h-80" },
    { src: Image3, pos: "top-20 right-[10%]", motion: { y: img3Y, scale: img1Scale }, size: "w-56 h-72" },
    { src: Image4, pos: "bottom-10 right-[5%]", motion: { y: img4Y, scale: img2Scale }, size: "w-72 h-48" },
  ];

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-[#f8f8f8] overflow-hidden">
      {/* --- Orta Kısımdaki Sabit Yazı --- */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="text-center px-4"
        >
          <h2 className="text-sm font-bold tracking-[0.4em] text-gray-400 mb-4 uppercase">Yeni Nesil Yaşam</h2>
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 leading-none">
            MODÜLER<br />MİMARİ
          </h1>
          <p className="mt-6 text-gray-500 font-medium max-w-sm mx-auto">
            Geleceğin evlerini teknoloji ve doğayla buluşturuyoruz.
          </p>
        </motion.div>
      </div>

      {/* --- Etrafta Yüzen Görseller --- */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          style={{ ...img.motion }}
          className={`absolute ${img.pos} ${img.size} z-0 rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-500`}
        >
          <Image
            src={img.src}
            alt="Prefabrik Ev Detay"
            fill
            className="object-cover"
            placeholder="blur"
          />
        </motion.div>
      ))}

      {/* --- Arka Plan Dekoratif Yazı (Opsiyonel) --- */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <span className="text-[25vw] font-bold">AKTAS</span>
      </div>
    </div>
  );
};





export const Hero4 = () => {
  return (
    <section className="relative   pt-20 pb-12 overflow-hidden ">

      {/* Arka Plan Dekorasyonu (Soft Işıklar) */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />

      <div className=" px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* SOL TARAF: BAŞLIK VE CTA */}
          <div className="lg:col-span-6 space-y-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">30 GÜNDE ANAHTAR TESLİM</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Hayallerinizi <br />
                <span className="text-secondary/90">Özgürleştirin.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                Geleneksel betonarme süreçlerini geride bırakın. Modern mimari, sarsılmaz çelik konstrüksiyon ve estetik tasarımı bir araya getiriyoruz.
              </p>
            </motion.div>

            {/* Buton Grubu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold text-sm flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
                Projeleri İncele <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 border border-slate-100 rounded-[1.5rem] font-bold text-sm flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
                <div className="w-8 h-8 bg-secondary/15 rounded-full flex items-center justify-center">
                  <Play size={14} className="text-secondary fill-secondary" />
                </div>
                Canlı Önizleme
              </button>
            </motion.div>

            {/* Hızlı Bilgi Maddeleri */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {['Deprem Dayanımlı', 'A++ Enerji Verimliliği', 'Özel Mimari Çizim'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <CheckCircle size={14} className="text-secondary" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* SAĞ TARAF: YUMUŞAK BOX GÖRSEL VE FLOATING CARDS */}
          <div className="lg:col-span-6 relative">

            {/* Ana Görsel Kutusu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="absolute inset-0 bg-emerald-500/5 rounded-[3.5rem] translate-x-4 translate-y-4 -z-10" />
              <div className="rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border-[8px] border-white">
                <img
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop"
                  alt="Modern Prefabrik Ev"
                  className="w-full h-[550px] object-cover"
                />
              </div>
            </motion.div>

            {/* Yüzen Bilgi Kartı 1 (Hız) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:right-0 z-20 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl shadow-emerald-900/10 border border-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-secondary/40">
                  <MousePointer2 size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Teslim Süresi</p>
                  <p className="text-xl font-bold text-slate-900 tracking-tighter">Sadece 4 Hafta</p>
                </div>
              </div>
            </motion.div>

            {/* Yüzen Bilgi Kartı 2 (Güven) */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 -left-10 z-20 bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white hidden md:block"
            >
              <div className="space-y-2">
                <div className="flex -space-x-3 mb-4">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="avatar" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-secondary border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">+120</div>
                </div>
                <p className="text-sm font-bold italic">"Hayalimdeki evi beklediğimden <br /> daha hızlı teslim aldım."</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Ahmet Y. - Sakarya</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Alt Scroll İkonu */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-slate-100 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-emerald-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

