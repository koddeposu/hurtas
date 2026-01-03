'use client'

import HeroImage from '@/assets/home-hero.webp';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MousePointer2, Play } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from '../ui/modal';

function AnimatedGradientText() {
  return (
    <div className="flex items-center pt-7">
      <div className="relative">
        <style>{`
          @keyframes shimmer-sweep {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          .shimmer-text {
            /* Ana renk koyu bir Slate, parlama rengi ise beyaz/gümüş */
            background: linear-gradient(
              to right,
              #0f172a 20%,
              #0f172a 40%,
              #10b981 50%,
              #0f172a 60%,
              #0f172a 80%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-sweep 4s linear infinite;
          }
        `}</style>

        <p className="shimmer-text text-lg lg:text-2xl font-black tracking-tighter uppercase">
          "HER EV BİR DEĞER HER MÜŞTERİ BİR REFERANSTIR"
        </p>
      </div>
    </div>
  );
}

export const Hero4 = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  return (
    <section className="relative   pt-5 lg:pt-20 pb-12">
      <Modal isShow={modal} onClose={() => setModal(false)}>
        <div className='h-screen flex items-center justify-center p-5'>
          <div className=" max-h-[600px] max-w-[600px] w-full h-full bg-transparent rounded-xl overflow-hidden">
            <iframe
              title="Prefabrik Ev 3D"
              src="https://sketchfab.com/models/489302e595ce444ab5f696e2db29b763/embed?autospin=1&ui_theme=dark"
              className="w-full h-full bg-transparent"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
        </div>

      </Modal>

      {/* Arka Plan Dekorasyonu (Soft Işıklar) */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />

      <div className="h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

          {/* SOL TARAF: BAŞLIK VE CTA */}
          <div className="lg:col-span-6 space-y-5 lg:space-y-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-2 lg:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-emerald-700 text-[10px] lg:ext-xs font-bold uppercase tracking-widest">30 GÜNDE ANAHTAR TESLİM</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
                Sakarya <br />
                <span className="text-secondary/90">Prefabrik Ev</span>
              </h1>
              <AnimatedGradientText />
              <p className="mt-6 text-md lg:text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                Geleneksel betonarme süreçlerini geride bırakın. Modern mimari, sarsılmaz çelik konstrüksiyon ve estetik tasarımı bir araya getiriyoruz.
              </p>
            </motion.div>

            {/* Buton Grubu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-row lg:flex-wrap gap-4 w-full"
            >
              <button onClick={() => router.push('/projelerimiz')} className="cursor-pointer px-3 py-2 lg:px-8 lg:py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold text-xs lg:text-sm flex items-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 w-full lg:w-fit justify-center">
                Projeleri İncele <ArrowRight size={18} />
              </button>
              <button onClick={() => setModal(true)} className="cursor-pointer px-3 py-2 lg:px-8 lg:py-4 bg-white text-slate-900 border border-slate-100 rounded-[1.5rem] font-bold text-xs lg:text-sm flex items-center gap-3 hover:bg-slate-50 transition-all shadow-sm w-full lg:w-fit justify-center">
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
              className="flex flex-wrap gap-6 lg:pt-4"
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
                <Image src={HeroImage} alt='prefabrik-ev' className='object-cover w-full  lg:h-[550px]' />
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

