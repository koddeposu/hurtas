"use client";
import Image1 from '@/assets/hero/home-page-1.webp';
import Image2 from '@/assets/hero/home-page-2.webp';
import Image3 from '@/assets/hero/home-page-3.webp';
import { MOCK_PRODUCT } from '@/types/product';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from '../ProductCard';
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
          <AnimatePresence mode='popLayout'>
            {MOCK_PRODUCT.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
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

