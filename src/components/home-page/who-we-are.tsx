"use client";
import HeroImage from "@/assets/who-we-are.webp";
import { motion } from "framer-motion";
import { ArrowRight, PencilRuler, ShieldCheck, Trees, Zap } from "lucide-react";
import Image from "next/image";
export const WhoWeAre = () => {
  // Akışkan animasyon ayarları
  const cardHover = {
    hover: { y: -8, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="lg:px-6 font-[family-name:var(--font-poppins)] text-slate-800">
      <div className="container mx-auto max-w-7xl">
        {/* Üst Başlık Grubu */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4 lg:gap-8 mb-8 lg:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-secondary"></span>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs">
                Akıllı Mimari
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Geleneksel Yapıdan <br />
              <span className="text-slate-400">Daha Fazlası.</span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 font-medium max-w-sm text-sm leading-relaxed"
          >
            CT Prefabrik ruhundan ilham alarak, inşaat sürecini bir "yük"
            olmaktan çıkarıp, 30 günde anahtar teslim bir "sanat eserine"
            dönüştürüyoruz.
          </motion.p>
        </div>

        {/* Yumuşak Box Grid (Bento Mix) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8">
          {/* ANA GÖRSEL KUTUSU (Sol - 8 Col) */}
          <div className="md:col-span-8 bg-[#F8FAFC] rounded-[3rem] p-4 shadow-sm border border-slate-100 flex flex-col">
            <div className="relative h-[400px] w-full overflow-hidden rounded-[2.5rem]">
              <Image
                src={HeroImage}
                alt="prefabrik-ev"
                fill
                loading="lazy"
                quality={55}
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  30 GÜNDE TESLİM
                </span>
              </div>
            </div>

            <div className="p-8 flex justify-between items-center">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold mb-1 italic">
                  Milimetrik Hassasiyet
                </h3>
                <p className="text-slate-400 text-sm">
                  Fabrika ortamında, hata payı olmadan üretim.
                </p>
              </div>
              <button
                aria-label="prefabrik-evler"
                className="bg-slate-900 text-white p-4 rounded-full hover:bg-emerald-600 transition-colors shadow-lg"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* SAĞ KOLON KUTULARI (4 Col) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            {/* Güven Kutusu */}
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-50 flex-1 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full opacity-50" />
              <ShieldCheck className="text-secondary w-10 h-10 mb-6 relative z-10" />
              <h4 className="text-xl font-bold mb-2">Statik Güven</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Yüksek dayanımlı çelik gövdelerimizle, sismik güvenlikte
                standartların üzerine çıkıyoruz.
              </p>
            </div>

            {/* Doğa Kutusu */}
            <motion.div
              whileHover="hover"
              className="bg-[#EDF5F2] p-10 rounded-[3rem] flex-1 flex flex-col justify-end group cursor-pointer"
            >
              <Trees className="text-emerald-700 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-bold text-emerald-900 mb-1">
                Ekolojik Yaşam
              </h4>
              <p className="text-emerald-700/60 text-xs font-bold uppercase tracking-widest">
                Geri Dönüştürülebilir Yapı
              </p>
            </motion.div>
          </div>

          {/* ALT SATIR: HIZLI BİLGİ KUTULARI */}
          <div className="md:col-span-4 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0">
              <Zap className="text-amber-400 fill-amber-400" size={24} />
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">
                HIZ
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Zaman Tasarrufu
              </p>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-900 p-10 rounded-[3rem] text-white flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
              <PencilRuler className="text-white" size={24} />
            </div>
            <div>
              <div className="text-3xl font-black tracking-tighter">MİMARİ</div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Estetik Çözümler
              </p>
            </div>
          </div>

          <div className="md:col-span-4 bg-secondary p-10 rounded-[3rem] text-white flex flex-col justify-center items-center text-center">
            <div className="text-4xl font-black tracking-tighter">50+</div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              Yıllık Tecrübe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
