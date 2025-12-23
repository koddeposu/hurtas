"use client";
import { animate, motion } from 'framer-motion';
import { Award, Home, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (latest) => setCount(Math.floor(latest)),
      ease: "circOut"
    });
    return () => controls.stop();
  }, [value]);

  return <span>{count}{suffix}</span>;
};

export const Stats = () => {
  const stats = [
    {
      label: "TAMAMLANAN DAİRE",
      value: 500,
      suffix: "+",
      icon: <Home size={20} />,
      color: "#165b39",
      desc: "Güvenle Teslim"
    },
    {
      label: "YILLIK TECRÜBE",
      value: 20,
      suffix: "+",
      icon: <Award size={20} />,
      color: "#49202d",
      desc: "Sektörel Birikim"
    },
    {
      label: "ŞEHİRDE HİZMET",
      value: 40,
      suffix: "+",
      icon: <MapPin size={20} />,
      color: "#165b39",
      desc: "Türkiye Genelinde"
    },
    {
      label: "MUTLU MÜŞTERİ",
      value: 2080,
      suffix: "",
      icon: <Users size={20} />,
      color: "#49202d",
      desc: "Büyük Bir Aile"
    }
  ];

  return (
    <section className="relative py-24 bg-white font-[family-name:var(--font-poppins)] overflow-hidden">

      {/* ARKA PLAN VEKTÖRÜ: Nokta Izgarası */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Soft Box Kartı */}
              <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 relative z-10 overflow-hidden">

                {/* Köşe Teknik Vektör (Blueprint Hissi) */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <div className="w-4 h-4 border-t border-r border-slate-900" />
                </div>

                {/* İkon Rozeti */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 shadow-sm"
                  style={{ backgroundColor: `${item.color}10`, color: item.color }}
                >
                  {item.icon}
                </div>

                {/* Sayı ve Başlık */}
                <div className="space-y-1">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
                    <Counter value={item.value} suffix={item.suffix} />
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                    {item.label}
                  </p>
                </div>

                {/* Alt Detay (Kısa Açıklama) */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-slate-100 group-hover:w-10 transition-all duration-500" />
                  <span className="text-[10px] font-bold text-slate-400 italic">
                    {item.desc}
                  </span>
                </div>

                {/* Hover'da ortaya çıkan alt renk çizgisi */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              {/* Arka Plan Dekoratif Sayı (Filigran) */}
              <div className="absolute -bottom-6 -right-2 text-7xl font-black opacity-[0.02] select-none -z-0">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Teknik Çizgi (Aesthetics) */}
        <div className="mt-20 flex items-center justify-between opacity-20">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-[#165b39] rounded-full" />
            <div className="w-12 h-1 bg-[#49202d] rounded-full" />
          </div>
          <span className="text-[8px] font-mono tracking-[1em] uppercase">Aktaş Data Metrics</span>
          <div className="flex gap-1">
            <div className="w-12 h-1 bg-[#165b39] rounded-full" />
            <div className="w-1 h-1 bg-[#49202d] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

