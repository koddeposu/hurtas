"use client";
import { motion } from 'framer-motion';


const DotGrid = ({ color }: { color: string }) => (
  <div className="grid grid-cols-6 gap-2 opacity-40">
    {[...Array(24)].map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

const PatternCircle = ({ color1, color2 }: { color1: string, color2: string }) => (
  <div className="relative w-32 h-32">
    {/* Çizgili Daire */}
    <svg className="absolute inset-0 w-full h-full rotate-45" viewBox="0 0 100 100">
      <defs>
        <pattern id="stripes" width="10" height="10" patternUnits="userSpaceOnUse" stroke={color1} strokeWidth="2">
          <line x1="0" y1="0" x2="0" y2="10" />
        </pattern>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#stripes)" />
    </svg>
    <div
      className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-60 mix-blend-multiply blur-sm"
      style={{ backgroundColor: color2 }}
    />
  </div>
);

export const MissionVision = () => {
  return (
    <section className="relative  font-[family-name:var(--font-poppins)] ">

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#165b39]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#49202d]/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto  max-w-7xl ">

        <div className="grid lg:grid-cols-12 gap-5 md:gap-16 items-center lg:mb-28 relative">

          <div className="lg:col-span-6 relative">
            <div className="absolute -top-10 -left-10 z-0">
              <DotGrid color="#49202d" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                className="w-full h-[300px] md:h-[450px] object-cover"
                alt="Mission"
              />
              <div className="absolute bottom-8 right-0 w-24 h-32 bg-[#165b39] opacity-90 rounded-l-3xl shadow-xl flex items-center justify-center">
                <span className="text-white font-black text-2xl -rotate-90">01</span>
              </div>
            </motion.div>
          </div>

          {/* Sağ: Metin */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              MİSYON <br /> <span style={{ color: '#165b39' }}>UMUZ.</span>
            </h2>
            <div className="w-16 h-1 bg-[#49202d] rounded-full" />
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
              "Prefabrik yaşamı sadece bir çözüm değil, yüksek bir mühendislik sanatı olarak konumluyoruz."
            </p>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Doğaya saygılı, hızla kurulan ve her milimetresi hesaplanmış yapılarımızla; konforun en güvenli halini inşa etmek temel amacımızdır.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 md:gap-16 items-center relative mt-20 lg:mt-0">
          <div className="lg:col-span-6 order-2 lg:order-1 lg:text-right flex flex-col items-end space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              VİZYON <br /> <span style={{ color: '#49202d' }}>UMUZ.</span>
            </h2>
            <div className="w-16 h-1 bg-[#165b39] rounded-full" />
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
              "Geleceğin dünyasında, modüler inşaatın global sınırlarını biz belirliyoruz."
            </p>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Sürdürülebilir, akıllı ve estetik yapılarımızla, Sakarya'dan tüm dünyaya ilham veren mimari projeler ihraç etmeyi hedefliyoruz.
            </p>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <div className="absolute -top-16 -right-10 z-0 scale-125">
              <PatternCircle color1="#165b39" color2="#49202d" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                className="w-full h-[450px] object-cover"
                alt="Vision"
              />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
