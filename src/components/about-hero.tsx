"use client";
import Hero2 from '@/assets/hakkimizda-2.jpg';
import MissionImage from '@/assets/mission.webp';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
const AboutHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll ile değişen değerler
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative   font-[family-name:var(--font-poppins)]">
      <div className="container mx-auto lg:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Arka Plan Dekorasyonu (Soft Işıklar) */}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-secondary/30 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          {/* SOL TARAF: TİPOGRAFİK GİRİŞ */}
          <div className="lg:col-span-6 space-y-8 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-black tracking-[0.5em] text-slate-300 uppercase">CT Genesis</span>
                <div className="flex-grow h-[1px] bg-slate-100" />
              </div>
              <h1 className="text-5xl md:text-[100px] font-black text-slate-900 leading-[0.85] tracking-tighter">
                BİZ <br />
                <span className="text-[#165b39]">KİMİZ</span>
                <span className="text-[#49202d]">?</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative lg:pl-12 lg:border-l-2 lg:border-slate-200 space-y-4 lg:space-y-8"
            >
              <p className="text-lg lg:text-2xl text-slate-500 font-light leading-relaxed">
                <span className="font-bold text-slate-900">14 yıl</span> önce Sakarya'da başlayan serüvenimiz, bugün Türkiye'nin her köşesinde <span className="text-[#165b39] underline decoration-2 underline-offset-8">çelikten yuvalara</span> dönüştü.
              </p>
              <p className="text-slate-400 font-medium max-w-md">
                Geleneksel inşaat yöntemlerini teknoloji ve estetikle harmanlayarak, modüler yaşamın sınırlarını her gün yeniden çiziyoruz.
              </p>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-4 text-[#49202d] font-black text-xs uppercase tracking-widest cursor-pointer"
              >
                Aşağı Kaydırın <ArrowDownRight size={16} />
              </motion.div>
            </motion.div>
          </div>

          {/* SAĞ TARAF: ASİMETRİK GÖRSEL KATMANLARI (Parallax) */}
          <div className="lg:col-span-6 relative h-[300px] md:h-[500px] flex items-center justify-center">

            {/* Büyük Ana Görsel (Yavaş Kayar) */}
            <div
              className="absolute z-20 w-full md:w-[80%] h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]  "
            >

              <Image
                src={Hero2}
                className="w-full h-full object-cover"
                alt="prefabrik-evler"
              />
            </div>

            {/* Küçük Detay Görseli (Hızlı Kayar & Döner) */}
            <div
              className="absolute z-30   top-2/4 -right-4 md:top-1/4 w-[50%] h-[200px] md:h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white"
            >
              <Image
                src={MissionImage}
                className="w-full h-full object-cover"
                alt="prefabrik-evler"
                quality={40}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
