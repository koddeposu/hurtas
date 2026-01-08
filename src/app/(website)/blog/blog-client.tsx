"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  PencilLine,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogPost } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type BlogPost = InferSelectModel<typeof blogPost>;

interface PaginatedBlogPosts {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface BlogPageClientProps {
  data: PaginatedBlogPosts;
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8">
        <PencilLine size={40} className="text-slate-300" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-4">
        Henüz Blog Yazısı Yok
      </h3>
      <p className="text-slate-500 max-w-md">
        Yakında prefabrik yapılar, mimari trendler ve daha fazlası hakkında ilham
        verici içerikler paylaşılacak.
      </p>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) {
  const getPageUrl = (page: number) => {
    return page === 1 ? "/blog" : `/blog?page=${page}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("ellipsis");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-24 flex justify-center items-center gap-4">
      {hasPrevPage && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center gap-2 pr-4 text-[#49202d] font-bold"
        >
          <ArrowLeft size={18} /> Önceki
        </Link>
      )}

      {getPageNumbers().map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold transition-all ${
              currentPage === page
                ? "bg-primary text-white border-primary"
                : "border-slate-200 text-slate-400 hover:bg-primary hover:text-white hover:border-primary"
            }`}
          >
            {page}
          </Link>
        )
      )}

      {hasNextPage && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center gap-2 pl-4 text-[#49202d] font-bold"
        >
          Sonraki <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}

export function BlogPageClient({ data }: BlogPageClientProps) {
  const { posts, totalPages, currentPage, hasNextPage, hasPrevPage } = data;

  return (
    <main className=" min-h-screen">
      <section className="relative pt-24 md:pt-40 pb-24  overflow-hidden bg-white">
        {/* --- ARKA PLAN VEKTÖREL SÜSLER (Kibar ve Şekilli) --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          {/* Soft Vektör Daire */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[120px]" />
          {/* Teknik Çizim Grid Noktaları */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(#49202d 0.5px, transparent 0.5px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Üst Küçük Rozet */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-[#49202d]/10 mb-12"
            >
              <PencilLine size={14} className="text-[#49202d]" />
              <span className="text-[#49202d] text-[10px] font-black uppercase tracking-[0.3em]">
                CT Akademi & Blog
              </span>
            </motion.div>

            {/* Ana Başlık: Karakterli ve Güçlü */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(3.5rem,10vw,8rem)] font-black text-slate-900 leading-[0.85] tracking-[-0.05em]"
            >
              OKU, <span className="text-slate-200">ÖĞREN</span> <br />
              <span className="text-[#49202d] italic font-serif font-light">
                İlham Al.
              </span>
            </motion.h1>

            {/* Alt Metin ve Vektörel Çizgi */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 relative"
            >
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
                Prefabrik yapılardan modern mimariye, teknik ipuçlarından yaşam
                rehberlerine kadar her şey burada.
              </p>

              {/* El Yazısı Stilinde Vektör (Opsiyonel: SVG olarak eklenebilir) */}
              <div className="absolute -bottom-6 right-0 md:-right-12 hidden md:block opacity-20 rotate-12">
                <Sparkles size={48} className="text-primary" />
              </div>
            </motion.div>

            {/* Etkileşim İkonu */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-20 flex flex-col items-center gap-3"
            >
              <div className="w-px h-20 bg-linear-to-b from-primary to-transparent" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Aşağı Kaydır
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- BLOG GRID (3 COLUMN) --- */}
      <section className="pb-32 ">
        <div className="container mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                {posts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block h-full"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer h-full flex flex-col"
                    >
                      {/* Görsel Alanı */}
                      <div className="relative h-[300px] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm">
                        <Image
                          src={post.imageUrl}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Kategori Etiketi */}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                          <span className="text-[10px] font-black text-[#49202d] uppercase tracking-widest">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* İçerik Alanı */}
                      <div className="px-2 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDate(post.publishedAt || post.createdAt)}
                          </div>
                          {post.readTime && (
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              {post.readTime} dk
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-[#49202d] transition-colors duration-300">
                          {post.title}
                        </h3>

                        <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed mb-6 font-medium">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[#49202d] font-black text-xs tracking-widest uppercase group-hover:gap-4 transition-all">
                          Devamını Oku <ChevronRight size={16} />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
