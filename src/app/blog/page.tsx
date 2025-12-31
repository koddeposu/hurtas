"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronRight, Clock, PencilLine, Sparkles } from 'lucide-react';
import Image from 'next/image';

// Örnek Blog Görselleri (Kendi assetlerinle değiştir)
import BlogImg1 from '@/assets/hero/home-page-1.webp';
import BlogImg2 from '@/assets/hero/home-page-2.webp';
import BlogImg3 from '@/assets/hero/home-page-3.webp';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Prefabrik Evlerde Isı Yalıtımı Nasıl Sağlanır?",
    excerpt: "Kış aylarında sıcak, yaz aylarında serin bir yaşam alanı için prefabrik yapılarda kullanılan modern yalıtım teknolojilerini keşfedin.",
    date: "24 Aralık 2024",
    readTime: "5 dk",
    category: "Teknik Bilgiler",
    image: BlogImg1,
  },
  {
    id: 2,
    title: "2024 Modern Villa Tasarım Trendleri",
    excerpt: "Minimalist çizgiler, sürdürülebilir malzemeler ve akıllı ev sistemlerinin prefabrik mimariyle buluştuğu yeni nesil tasarımlar.",
    date: "18 Aralık 2024",
    readTime: "4 dk",
    category: "Mimari",
    image: BlogImg2,
  },
  {
    id: 3,
    title: "Çelik Konstrüksiyon mu, Prefabrik mi?",
    excerpt: "Ev yaptırmadan önce bilmeniz gereken temel farklar, avantajlar ve maliyet karşılaştırmaları hakkında detaylı rehber.",
    date: "10 Aralık 2024",
    readTime: "7 dk",
    category: "Rehber",
    image: BlogImg3,
  },
  // Alt kısım için örnek çoğaltma
  { id: 4, title: "Ruhsat Süreçleri Hakkında Bilmeniz Gerekenler", excerpt: "Arsanıza prefabrik ev yaptırırken izlemeniz gereken yasal prosedürler.", date: "05 Aralık 2024", readTime: "6 dk", category: "Yasal Süreç", image: BlogImg1 },
  { id: 5, title: "Küçük Alanlarda Büyük Konfor: Tiny House", excerpt: "Minimalist yaşamı sevenler için fonksiyonel ve şık mobil ev çözümleri.", date: "01 Aralık 2024", readTime: "4 dk", category: "Yaşam", image: BlogImg2 },
  { id: 6, title: "Prefabrik Evlerin Bakımı Nasıl Yapılır?", excerpt: "Yapınızın ömrünü uzatacak pratik bakım ve temizlik önerileri.", date: "28 Kasım 2024", readTime: "3 dk", category: "Bakım", image: BlogImg3 },
];

const BlogPage = () => {
  return (
    <main className=" min-h-screen">

      <section className="relative pt-24 md:pt-40 pb-24  overflow-hidden bg-white">

        {/* --- ARKA PLAN VEKTÖREL SÜSLER (Kibar ve Şekilli) --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          {/* Soft Vektör Daire */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#49202d]/[0.02] rounded-full blur-[120px]" />
          {/* Teknik Çizim Grid Noktaları */}
          <div className="absolute inset-0 opacity-[0.15]"
            style={{ backgroundImage: 'radial-gradient(#49202d 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center">

            {/* Üst Küçük Rozet */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#49202d]/5 border border-[#49202d]/10 mb-12"
            >
              <PencilLine size={14} className="text-[#49202d]" />
              <span className="text-[#49202d] text-[10px] font-black uppercase tracking-[0.3em]">CT Akademi & Blog</span>
            </motion.div>

            {/* Ana Başlık: Karakterli ve Güçlü */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(3.5rem,10vw,8rem)] font-black text-slate-900 leading-[0.85] tracking-[-0.05em]"
            >
              OKU, <span className="text-slate-200">ÖĞREN</span> <br />
              <span className="text-[#49202d] italic font-serif font-light">İlham Al.</span>
            </motion.h1>

            {/* Alt Metin ve Vektörel Çizgi */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 relative"
            >
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
                Prefabrik yapılardan modern mimariye, teknik ipuçlarından yaşam rehberlerine kadar her şey burada.
              </p>

              {/* El Yazısı Stilinde Vektör (Opsiyonel: SVG olarak eklenebilir) */}
              <div className="absolute -bottom-6 right-0 md:-right-12 hidden md:block opacity-20 rotate-12">
                <Sparkles size={48} className="text-[#49202d]" />
              </div>
            </motion.div>

            {/* Etkileşim İkonu */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-20 flex flex-col items-center gap-3"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#49202d] to-transparent" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Aşağı Kaydır</span>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- BLOG GRID (3 COLUMN) --- */}
      <section className="pb-32 ">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {BLOG_POSTS.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Görsel Alanı */}
                <div className="relative h-[300px] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Kategori Etiketi */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                    <span className="text-[10px] font-black text-[#49202d] uppercase tracking-widest">{post.category}</span>
                  </div>
                </div>

                {/* İçerik Alanı */}
                <div className="px-2">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-[#49202d] transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed mb-6 font-medium">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[#49202d] font-black text-xs tracking-widest uppercase group-hover:gap-4 transition-all">
                    Devamını Oku <ChevronRight size={16} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sayfalama (Pagination) - Opsiyonel */}
          <div className="mt-24 flex justify-center items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#49202d] hover:text-white transition-all font-bold">1</button>
            <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-[#49202d] hover:text-white transition-all font-bold text-slate-400">2</button>
            <button className="flex items-center gap-2 pl-4 text-[#49202d] font-bold">Sonraki <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default BlogPage;
