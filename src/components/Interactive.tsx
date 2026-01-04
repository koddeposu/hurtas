"use client";
import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  Compass,
  Lightbulb,
  Mountain,
} from 'lucide-react';
import { useState } from 'react';

export const Interactive = () => {
  const [activeStep, setActiveStep] = useState(0);



  const storySteps = [
    { id: "01", title: "Değerlerimiz", desc: "Dürüstlük bizim temel taşıyıcı kolonumuzdur. Her projede şeffaf maliyet ve sarsılmaz etik kurallarla ilerliyoruz.", icon: <Compass />, color: "#165b39" },
    { id: "02", title: "Yaklaşımımız", desc: "İnşaatın gürültüsünü değil, mühendisliğin sessiz zarafetini seviyoruz. Fabrikada milimetrik, sahada kusursuz.", icon: <Lightbulb />, color: "#49202d" },
    { id: "03", title: "Başarılarımız", desc: "Geçmişte yükselen 500+ konut, gelecekteki başarımızın sadece birer teknik çizimidir.", icon: <Award />, color: "#165b39" },
    { id: "04", title: "Geleceğe Bakış", desc: "Kendi enerjisini üreten, karbon ayak izi sıfır olan modüler şehirler kurmak için bugünden kod yazıyoruz.", icon: <Mountain />, color: "#49202d" }
  ];

  return (
    <section className="relative">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-5 md:gap-24 items-start">
          <div className="lg:sticky lg:top-32 space-y-4 md:space-y-8">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
              PREFABRİK ÇELİK YAPIDA <br />
              <span style={{ color: '#165b39' }}>HİKAYEMİZİN KATMANLARI</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-sm leading-relaxed italic">
              Prefabrik çelik yapı projelerimizi bir binanın yükselişi gibi adım adım kurguladık.
            </p>

            <div className="flex flex-col gap-4 pt-2 md:pt-10">
              {storySteps.map((step, i) => (
                <button
                  key={i} onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-6 p-4 rounded-2xl transition-all duration-500 ${activeStep === i ? 'bg-slate-50 translate-x-4 shadow-sm' : 'opacity-30 hover:opacity-100'}`}
                >
                  <span className="text-xl font-black italic" style={{ color: activeStep === i ? step.color : '#ccc' }}>{step.id}</span>
                  <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-auto  md:min-h-[500px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 50, rotateY: 30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: -30 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="bg-white p-8 md:p-16  rounded-[2rem] md:rounded-[2rem] shadow-2xl border border-slate-50 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl"
                  style={{ backgroundColor: storySteps[activeStep].color }}
                />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 md:mb-10 shadow-lg" style={{ backgroundColor: storySteps[activeStep].color }}>
                  {storySteps[activeStep].icon}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-6">{storySteps[activeStep].title}</h3>
                <p className="text-md md:text-xl text-slate-500 font-medium leading-relaxed italic">
                  {storySteps[activeStep].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

