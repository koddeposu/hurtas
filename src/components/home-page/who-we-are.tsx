"use client";
import HeroImage from "@/assets/who-we-are.webp";
import { motion } from "framer-motion";
import { ArrowRight, PencilRuler, ShieldCheck, Trees, Zap } from "lucide-react";
import Image from "next/image";
export const WhoWeAre = () => {
  return (
    <section className="lg:px-6 font-[family-name:var(--font-poppins)] text-slate-800">
      <div className="container mx-auto max-w-7xl">
        {/* Üst Başlık Grubu */}
        <div className="mb-7 flex flex-col justify-between gap-4 lg:mb-12 lg:flex-row lg:items-end lg:gap-8">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-secondary"></span>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs">
                Akıllı Mimari
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight leading-[1.1] md:text-5xl">
              Geleneksel Yapıdan <br />
              <span className="text-slate-400">Daha Fazlası.</span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-sm text-sm font-medium leading-6 text-slate-500"
          >
            CT Prefabrik ruhundan ilham alarak, insaat surecini bir
            &quot;yuk&quot; olmaktan cikarip, 30 gunde anahtar teslim bir
            &quot;sanat eserine&quot;
            dönüştürüyoruz.
          </motion.p>
        </div>

        {/* Yumuşak Box Grid (Bento Mix) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-6">
          {/* ANA GÖRSEL KUTUSU (Sol - 8 Col) */}
          <div className="md:col-span-8 flex flex-col rounded-[2.5rem] border border-slate-100 bg-[#F8FAFC] p-4 shadow-sm">
            <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={HeroImage}
                alt="prefabrik-ev"
                fill
                loading="lazy"
                quality={55}
                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  30 GÜNDE TESLİM
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-6">
              <div>
                <h3 className="mb-1 text-lg font-bold italic lg:text-xl">
                  Milimetrik Hassasiyet
                </h3>
                <p className="text-sm text-slate-400">
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
            <div className="relative flex-1 overflow-hidden rounded-[2.5rem] border border-slate-50 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full opacity-50" />
              <ShieldCheck className="relative z-10 mb-5 h-9 w-9 text-secondary" />
              <h4 className="mb-2 text-lg font-bold">Statik Güven</h4>
              <p className="text-sm font-medium leading-6 text-slate-500">
                Yüksek dayanımlı çelik gövdelerimizle, sismik güvenlikte
                standartların üzerine çıkıyoruz.
              </p>
            </div>

            {/* Doğa Kutusu */}
            <motion.div
              whileHover="hover"
              className="group flex flex-1 cursor-pointer flex-col justify-end rounded-[2.5rem] bg-[#EDF5F2] p-8"
            >
              <Trees className="mb-4 h-9 w-9 text-emerald-700 transition-transform group-hover:scale-110" />
              <h4 className="mb-1 text-lg font-bold text-emerald-900">
                Ekolojik Yaşam
              </h4>
              <p className="text-emerald-700/60 text-xs font-bold uppercase tracking-widest">
                Geri Dönüştürülebilir Yapı
              </p>
            </motion.div>
          </div>

          {/* ALT SATIR: HIZLI BİLGİ KUTULARI */}
          <div className="md:col-span-4 flex items-center gap-5 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.5rem] bg-slate-50">
              <Zap className="text-amber-400 fill-amber-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tighter text-slate-900">
                HIZ
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Zaman Tasarrufu
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex items-center gap-5 rounded-[2.5rem] bg-slate-900 p-8 text-white">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.5rem] bg-white/10">
              <PencilRuler className="text-white" size={24} />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tighter">MİMARİ</div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Estetik Çözümler
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center rounded-[2.5rem] bg-secondary p-8 text-center text-white">
            <div className="text-3xl font-black tracking-tighter">50+</div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              Yıllık Tecrübe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
