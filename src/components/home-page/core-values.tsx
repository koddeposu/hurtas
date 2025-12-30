"use client";
import { motion } from 'framer-motion';
import { Hammer, Leaf, Users, Wrench } from 'lucide-react';

export const CoreValues = () => {
  const values = [
    {
      title: "Yerinde Kurulum",
      desc: "Hızlı ve titiz montaj.",
      icon: <Hammer size={28} />,
      brandColor: "#49202d",
      lightBg: "bg-[#49202d]/5",
      borderColor: "group-hover:border-[#49202d]/30"
    },
    {
      title: "Deneyimli Ustalar",
      desc: "Uzman kadro, tam güven.",
      icon: <Users size={28} />,
      brandColor: "#165b39",
      lightBg: "bg-[#165b39]/5",
      borderColor: "group-hover:border-[#165b39]/30"
    },
    {
      title: "Kolay Bakım",
      desc: "Zahmetsiz ve uzun ömürlü.",
      icon: <Wrench size={28} />,
      brandColor: "#49202d",
      lightBg: "bg-[#49202d]/5",
      borderColor: "group-hover:border-[#49202d]/30"
    },
    {
      title: "Çevre Dostu",
      desc: "Doğaya saygılı üretim.",
      icon: <Leaf size={28} />,
      brandColor: "#165b39",
      lightBg: "bg-[#165b39]/5",
      borderColor: "group-hover:border-[#165b39]/30"
    }
  ];

  return (
    <section className="font-[family-name:var(--font-poppins)]  overflow-hidden">
      <div className="container mx-auto max-w-7xl">

        {/* Minimalist Başlık */}
        <div className="text-center mb-5 lg:mb-16 space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black tracking-tighter"
            style={{ color: '#165b39' }}
          >
            DEĞERLERİMİZ <span style={{ color: '#49202d' }}>& GÜCÜMÜZ</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            className="h-1 bg-slate-100 mx-auto rounded-full"
          />
        </div>

        {/* Yan Yana Soft Box Yapısı */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`group relative bg-white border border-slate-100 p-4 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] transition-all duration-500 flex gap-4 lg:gap-0 lg:flex-col items-center lg:text-center ${v.borderColor}`}
            >
              {/* Arka Plan Glow (Sadece Hover'da Kendi Renginde) */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 rounded-[1.5rem] lg:rounded-[2.5rem]"
                style={{ backgroundColor: v.brandColor }}
              />

              {/* İkon Alanı */}
              <div
                className={`w-10 h-10 lg:w-20 lg:h-20 ${v.lightBg} rounded-[0.75rem] lg:rounded-[2rem] flex items-center justify-center lg:mb-6 transition-all duration-500 group-hover:scale-110 shadow-sm`}
                style={{ color: v.brandColor }}
              >
                {v.icon}
              </div>
              <div className=''>
                {/* Yazı Alanı */}
                <h3 className="text-md lg:text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {v.title}
                </h3>
                <p className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {v.desc}
                </p>

              </div>



              {/* Kibar Alt Çizgi Detayı (Sadece Hover'da Kendi Renginde) */}
              <motion.div
                className="w-0 h-1 mt-6 rounded-full transition-all duration-500 group-hover:w-10"
                style={{ backgroundColor: v.brandColor }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
