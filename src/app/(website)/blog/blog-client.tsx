"use client";

import { Input } from "@/components/ui/input";
import { blogPost, category } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  PencilLine,
  Search,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type BlogPost = InferSelectModel<typeof blogPost>;
type PrefabricCategory = InferSelectModel<typeof category>;

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
  recentPosts: BlogPost[];
  prefabricCategories: PrefabricCategory[];
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
        Yakında prefabrik yapılar, mimari trendler ve daha fazlası hakkında
        ilham verici içerikler paylaşılacak.
      </p>
    </div>
  );
}

function SearchResultsEmpty({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-200 bg-white px-6 py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <Search size={32} className="text-slate-400" />
      </div>
      <h3 className="mb-3 text-2xl font-black text-slate-900">
        Sonuc Bulunamadi
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
        &quot;{query}&quot; ile eslesen bir blog yazisi ya da kategori
        bulunamadi.
      </p>
    </div>
  );
}

function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
      <div className="mb-3">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#49202d]">
          Blog Category Arama
        </p>
      </div>

      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Blog veya kategori ara"
          className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>
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
        ),
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

export function BlogPageClient({
  data,
  recentPosts,
  prefabricCategories,
}: BlogPageClientProps) {
  const { posts, totalPages, currentPage, hasNextPage, hasPrevPage } = data;
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase("tr-TR");
  const hasActiveSearch = normalizedQuery.length > 0;

  const filteredPosts = hasActiveSearch
    ? posts.filter((post) =>
        [post.title, post.excerpt, post.category].some((value) =>
          value.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
        ),
      )
    : posts;

  const filteredCategories = hasActiveSearch
    ? prefabricCategories.filter((item) =>
        [item.name, item.description ?? ""].some((value) =>
          value.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
        ),
      )
    : prefabricCategories;

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-white pb-24 pt-24 md:pt-16">
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

      <section className="pb-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10 lg:hidden">
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
          </div>

          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:gap-16">
              <div>
                {filteredPosts.length === 0 ? (
                  <SearchResultsEmpty query={searchQuery} />
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:gap-12">
                      {filteredPosts.map((post, index) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="block h-full"
                        >
                          <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{
                              y: -8,
                              transition: { duration: 0.25, ease: "easeOut" },
                            }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="group flex h-full cursor-pointer flex-col will-change-transform"
                          >
                            <div className="relative mb-8 h-[300px] overflow-hidden rounded-[2.5rem] shadow-sm transition-shadow duration-300 group-hover:shadow-[0_28px_60px_-24px_rgba(15,23,42,0.38)]">
                              <Image
                                src={post.imageUrl}
                                alt={post.imageAlt || post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute left-6 top-6 rounded-2xl bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#49202d]">
                                  {post.category}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-1 flex-col px-2">
                              <div className="mb-4 flex items-center gap-4 text-xs font-bold text-slate-400">
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={14} />
                                  {formatDate(
                                    post.publishedAt || post.createdAt,
                                  )}
                                </div>
                                {post.readTime && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {post.readTime} dk
                                  </div>
                                )}
                              </div>

                              <h3 className="mb-4 text-2xl font-black leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#49202d]">
                                {post.title}
                              </h3>

                              <p className="mb-6 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
                                {post.excerpt}
                              </p>

                              <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#49202d] transition-all duration-300 group-hover:gap-4">
                                Devamını Oku <ChevronRight size={16} />
                              </div>
                            </div>
                          </motion.article>
                        </Link>
                      ))}
                    </div>

                    {!hasActiveSearch && totalPages > 1 && (
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

              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <SearchBox value={searchQuery} onChange={setSearchQuery} />

                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-lg font-black text-slate-900">
                        Son 4 Gonderi
                      </h2>
                      <span className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                        Yeni
                      </span>
                    </div>

                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="group flex items-center gap-4 rounded-[1.5rem] border border-slate-100 p-3 transition-colors hover:border-[#49202d]/15 hover:bg-slate-50"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                            <Image
                              src={post.imageUrl}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#49202d]">
                              {post.category}
                            </p>
                            <h3 className="line-clamp-2 text-sm font-black leading-snug text-slate-900">
                              {post.title}
                            </h3>
                            <p className="mt-2 text-xs font-medium text-slate-400">
                              {formatDate(post.publishedAt || post.createdAt)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)]">
                    <div className="mb-5">
                      <h2 className="text-lg font-black text-slate-900">
                        Prefabrik Ev Kategorilerimiz
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        Modelleri kategori bazinda hizlica inceleyin.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((item) => (
                          <Link
                            key={item.id}
                            href={`/prefabrik-evler/${item.slug}`}
                            className="group flex items-center justify-between rounded-[1.25rem] border border-slate-100 px-4 py-4 text-sm font-bold text-slate-700 transition-colors hover:border-[#49202d]/15 hover:bg-slate-50 hover:text-[#49202d]"
                          >
                            <span>{item.name}</span>
                            <ChevronRight
                              size={16}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        ))
                      ) : (
                        <p className="rounded-[1.25rem] border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                          Aramaniza uygun kategori bulunamadi.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
