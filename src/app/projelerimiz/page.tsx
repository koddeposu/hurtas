"use client";

import { motion } from 'framer-motion';
import { CheckCircle, CheckCircle2, Home, MapPin, Play, Ruler } from 'lucide-react';
import Image from 'next/image';

// Sizin görselleriniz
import { default as image1 } from '@/assets/hero/home-page-1.webp';
import image2 from '@/assets/hero/home-page-2.webp';
import image3 from '@/assets/hero/home-page-3.webp';
const projects = [
  { id: 1, img: image1, title: "Sapanca Modern", area: "145m²", room: "3+1", loc: "Sakarya" },
  { id: 2, img: image2, title: "Kartepe Loft", area: "110m²", room: "2+1", loc: "Kocaeli" },
  { id: 3, img: image3, title: "Erenler Villa", area: "190m²", room: "4+1", loc: "Sakarya" },
  { id: 4, img: image2, title: "Serdivan Konsept", area: "125m²", room: "3+1", loc: "Sakarya" },
  { id: 5, img: image3, title: "Kocaeli Trend", area: "95m²", room: "2+1", loc: "Kocaeli" },
  { id: 6, img: image1, title: "Arifiye Bahçe", area: "160m²", room: "3+1", loc: "Sakarya" },
];

const ProjectsPage = () => {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center flex-col w-full">

      <section className='w-full bg-[#fdfdfd] mb-28'>
        {/* --- ARKA PLAN VEKTÖREL DETAYLAR --- */}
        {/* Sağ üstteki o yumuşak dairesel vektör */}
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#49202d]/[0.03] rounded-full blur-3xl pointer-events-none  min-h-[90vh]" />

        {/* Sol alttaki teknik çizim çizgileri (Grid Vector) */}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-[0.02] pointer-events-none  min-h-[90vh]"
          style={{ backgroundImage: 'linear-gradient(#49202d 1px, transparent 1px), linear-gradient(90deg, #49202d 1px, transparent 1px)', size: '100px 100px', backgroundSize: '60px 60px' }}
        />

      </section>
      <section className="relative flex items-center   w-full  max-w-[1280px]">
        <div className="container  relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

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
                  Sınırları Aşan <br />
                  <span className="text-secondary/90">Yapılar</span>
                </h1>
                <p className="mt-6 text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
                  Sadece bir ev değil, doğayla barışık, yüksek mühendislik içeren ve estetiği merkeze alan modüler yaşamlar kuruyoruz.

                </p>
              </motion.div>

              {/* Buton Grubu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >

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
            <div className="lg:col-span-6 relative h-[600px] flex items-center justify-center">

              {/* Ana Görsel (Dinamik Köşeli) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2 }}
                className="relative w-[85%] h-[80%] z-10"
              >
                <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-[12px] border-white">
                  <Image src={image1} alt="Lüks Proje" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#49202d]/20 to-transparent" />
                </div>
              </motion.div>

              {/* Floating Card 1: Vektörel İkonlu */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-0 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white z-20 flex items-center gap-5"
              >
                <div className="w-14 h-14 bg-[#49202d] rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Ruler size={28} />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">Hassas Ölçüm</div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Milimetrik Çelik Yapı</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Minimalist Onay */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-xl border border-white z-20 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <span className="font-bold text-slate-800 tracking-tight pr-4">Depreme Dayanıklı</span>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <div className='max-w-[1280px] w-full mt-20'>
        {/* --- 3 COLUMN PROJECT GRID --- */}
        <section className="pb-32">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-[250px] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-sm"
                >
                  {/* ANA FOTOĞRAF */}
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* HOVER EFEKTİ: Bilgilerin olduğu katman */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#49202d]/60 via-[#49202d]/10 to-transparent  transition-all duration-500 p-8 flex flex-col justify-end">

                    {/* Teknik Özellikler (Hover anında yukarıdan süzülür) */}
                    <div className="translate-y-10 ">
                      <div className="flex gap-6 mb-6">
                        <div className="flex flex-col items-center gap-1">
                          <Ruler className="text-white/60" size={18} />
                          <span className="text-white font-bold text-sm">{project.area}</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/20" />
                        <div className="flex flex-col items-center gap-1">
                          <Home className="text-white/60" size={18} />
                          <span className="text-white font-bold text-sm">{project.room}</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/20" />
                        <div className="flex flex-col items-center gap-1">
                          <MapPin className="text-white/60" size={18} />
                          <span className="text-white font-bold text-sm">{project.loc}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


      </div>

    </main>
  );
};

export default ProjectsPage;
