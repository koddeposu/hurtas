"use client";
import Image1 from '@/assets/hero/home-page-1.webp';
import Image2 from '@/assets/hero/home-page-2.webp';
import Image3 from '@/assets/hero/home-page-3.webp';
import { motion } from 'framer-motion';
import { ArrowRight, Bath, BedDouble, Maximize, Star } from 'lucide-react';
import Image from 'next/image';
export const BestSellingHouses = () => {
  const houses = [
    {
      id: 1,
      name: "Modern Prestij Villası",
      image: Image1,
      rooms: "4 Oda",
      baths: "2 Banyo",
      area: "132m²",
      isBestSeller: true
    },
    {
      id: 2,
      name: "Ekolojik Doğa Evi",
      image: Image2,
      rooms: "3 Oda",
      baths: "1 Banyo",
      area: "95m²",
      isBestSeller: true
    },
    {
      id: 3,
      name: "Panoramik Loft",
      image: Image3,
      rooms: "4 Oda",
      baths: "2 Banyo",
      area: "150m²",
      isBestSeller: true
    },
    {
      id: 1,
      name: "Modern Prestij Villası",
      image: Image1,
      rooms: "4 Oda",
      baths: "2 Banyo",
      area: "132m²",
      isBestSeller: true
    },
    {
      id: 2,
      name: "Ekolojik Doğa Evi",
      image: Image2,
      rooms: "3 Oda",
      baths: "1 Banyo",
      area: "95m²",
      isBestSeller: true
    },
    {
      id: 3,
      name: "Panoramik Loft",
      image: Image3,
      rooms: "4 Oda",
      baths: "2 Banyo",
      area: "150m²",
      isBestSeller: true
    },
    {
      id: 1,
      name: "Modern Prestij Villası",
      image: Image1,
      rooms: "4 Oda",
      baths: "2 Banyo",
      area: "132m²",
      isBestSeller: true
    },
    {
      id: 2,
      name: "Ekolojik Doğa Evi",
      image: Image2,
      rooms: "3 Oda",
      baths: "1 Banyo",
      area: "95m²",
      isBestSeller: true
    },
    {
      id: 3,
      name: "Panoramik Loft",
      image: Image3,
      rooms: "4 Oda",
      baths: "2 Banyo",
      area: "150m²",
      isBestSeller: true
    },
  ];

  return (
    <section className="py-24 font-[family-name:var(--font-poppins)] overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Başlık Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none" style={{ color: '#165b39' }}>
              EN ÇOK TERCİH EDİLEN <br />
              <span style={{ color: '#49202d' }}>PREFABRİK EVLERİMİZ</span>
            </h2>
            <div className="w-20 h-1 mt-6 rounded-full" style={{ backgroundColor: '#165b39' }} />
          </motion.div>

          <p className="text-slate-400 font-medium text-sm md:text-right max-w-xs uppercase tracking-widest">
            Yüzlerce aileye yuva olan, en popüler tasarımlarımız.
          </p>
        </div>

        {/* Kartlar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {houses.map((house, index) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -12 }}
              className="group relative bg-white rounded-[3rem] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-slate-50 transition-all duration-500"
            >
              {/* Image Area */}
              <div className="relative h-[300px] overflow-hidden rounded-[2.5rem]">
                <Image
                  src={house.image}
                  alt={house.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Dikey En Çok Satan Etiketi (Sol Tarafta) */}
                {house.isBestSeller && (
                  <div className="absolute top-8 left-0 flex items-center transform -translate-x-1">
                    <div
                      className="py-3 px-2 rounded-r-xl shadow-lg flex flex-col items-center gap-2"
                      style={{ backgroundColor: '#49202d' }}
                    >
                      <Star size={14} className="text-white fill-white" />
                      <span className="text-white text-[10px] font-black uppercase tracking-tighter [writing-mode:vertical-lr] rotate-180">
                        EN ÇOK SATAN
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* İçerik Alanı */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-[#165b39] transition-colors">
                  {house.name}
                </h3>

                {/* Özellikler (Soft Grid) */}
                <div className="grid grid-cols-3 gap-2 mb-8">
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <BedDouble size={18} className="text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{house.rooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <Bath size={18} className="text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{house.baths}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <Maximize size={18} className="text-slate-400 mb-1" />
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{house.area}</span>
                  </div>
                </div>

                {/* Buton Alanı */}
                <button
                  className="w-full py-4 rounded-[1.5rem] flex items-center justify-center gap-3 font-bold text-sm transition-all shadow-lg group-hover:shadow-emerald-900/10 text-white"
                  style={{ backgroundColor: '#165b39' }}
                >
                  İNCELE
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tümünü Gör Butonu (Opsiyonel) */}
        <div className="mt-20 text-center">
          <button className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-300 hover:text-[#49202d] transition-colors">
            TÜM MODELLERİ KEŞFEDİN
          </button>
        </div>
      </div>
    </section>
  );
};

