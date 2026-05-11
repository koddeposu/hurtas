"use client";

import { Input } from "@/components/ui/input";
import {
  useDictionary,
  useLocale,
  useLocalizedPath,
} from "@/components/i18n-provider";
import { blogPost, category } from "@/db/schema";
import { getDateLocale } from "@/lib/i18n";
import {
  getCategoryDisplayName,
  getCategoryHref,
} from "@/lib/productRoutes";
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

function formatDate(date: Date | null, locale: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EmptyState() {
  const dict = useDictionary();

  return (
    <div className="flex flex-col items-center justify-center rounded-[1rem] border border-slate-300 bg-white px-6 py-24 text-center shadow-[0_18px_38px_-28px_rgba(15,23,42,0.12)]">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-xl bg-slate-100">
        <PencilLine size={40} className="text-slate-300" />
      </div>
      <h3 className="mb-4 text-2xl font-black text-slate-900">
        {dict.blog.emptyTitle}
      </h3>
      <p className="max-w-md text-slate-500">
        {dict.blog.emptyDescription}
      </p>
    </div>
  );
}

function SearchResultsEmpty({ query }: { query: string }) {
  const dict = useDictionary();

  return (
    <div className="flex flex-col items-center justify-center rounded-[1rem] border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100">
        <Search size={32} className="text-slate-400" />
      </div>
      <h3 className="mb-3 text-2xl font-black text-slate-900">
        {dict.blog.noResultTitle}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
        &quot;{query}&quot; {dict.blog.noResultDescription}
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
  const dict = useDictionary();

  return (
    <div className="rounded-[3px] border border-slate-300 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)]">
      <div className="mb-3">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#152f51]">
          {dict.blog.searchTitle}
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
          placeholder={dict.blog.searchPlaceholder}
          className="h-12 rounded-[3px] border-slate-300 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400"
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
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
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
    <div className="mt-20 flex flex-wrap items-center justify-center gap-3 rounded-[3px]  px-4 py-4 shadow-[0_16px_30px_-24px_rgba(15,23,42,0.1)]">
      {hasPrevPage && (
        <Link
          href={localizedPath(getPageUrl(currentPage - 1))}
          className="inline-flex items-center gap-2 rounded-[3px] border border-slate-300 px-4 py-3 font-bold text-[#152f51] transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          <ArrowLeft size={18} /> {dict.common.previous}
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
            href={localizedPath(getPageUrl(page))}
            className={`flex h-12 w-12 items-center justify-center rounded-[3px] border font-bold transition-all ${
              currentPage === page
                ? "bg-primary text-white border-primary"
                : "border-slate-300 text-slate-400 hover:bg-primary hover:text-white hover:border-primary"
            }`}
          >
            {page}
          </Link>
        ),
      )}

      {hasNextPage && (
        <Link
          href={localizedPath(getPageUrl(currentPage + 1))}
          className="inline-flex items-center gap-2 rounded-[3px] border border-slate-300 px-4 py-3 font-bold text-[#152f51] transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          {dict.common.next} <ArrowRight size={18} />
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
  const locale = useLocale();
  const dict = useDictionary();
  const localizedPath = useLocalizedPath();
  const dateLocale = getDateLocale(locale);
  const { posts, totalPages, currentPage, hasNextPage, hasPrevPage } = data;
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase(getDateLocale(locale));
  const hasActiveSearch = normalizedQuery.length > 0;

  const filteredPosts = hasActiveSearch
    ? posts.filter((post) =>
        [post.title, post.excerpt, post.category].some((value) =>
          value.toLocaleLowerCase(getDateLocale(locale)).includes(normalizedQuery),
        ),
      )
    : posts;

  const filteredCategories = hasActiveSearch
    ? prefabricCategories.filter((item) =>
        [
          item.name,
          item.nameEn ?? "",
          item.nameAr ?? "",
          item.title ?? "",
          item.titleEn ?? "",
          item.titleAr ?? "",
          item.description ?? "",
          item.descriptionEn ?? "",
          item.descriptionAr ?? "",
        ].some((value) =>
          value.toLocaleLowerCase(getDateLocale(locale)).includes(normalizedQuery),
        ),
      )
    : prefabricCategories;

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-white py-12 lg:py-16">
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
                          href={localizedPath(`/blog/${post.slug}`)}
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
                            className="group flex h-full cursor-pointer flex-col bg-white will-change-transform"
                          >
                            <div className="relative mb-6 h-[300px] overflow-hidden rounded-[3px] shadow-sm transition-shadow duration-300 group-hover:shadow-[0_24px_44px_-24px_rgba(15,23,42,0.2)]">
                              <Image
                                src={post.imageUrl}
                                alt={post.imageAlt || post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>

                            <div className="flex flex-1 flex-col px-2 pb-2">
                              <div className="mb-4 flex items-center gap-4 text-xs font-bold text-slate-400">
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={14} />
                                  {formatDate(
                                    post.publishedAt || post.createdAt,
                                    dateLocale,
                                  )}
                                </div>
                                {post.readTime && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock size={14} />
                                    {post.readTime} {dict.common.minutes}
                                  </div>
                                )}
                              </div>

                              <h3 className="mb-4 text-2xl font-black leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[#152f51]">
                                {post.title}
                              </h3>

                              <p className="mb-6 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
                                {post.excerpt}
                              </p>

                              <div className="mt-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#152f51] transition-all duration-300 group-hover:gap-4">
                                {dict.blog.readMore} <ChevronRight size={16} />
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

                  <div className="rounded-[3px] border border-slate-300 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.14)]">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-lg font-black text-slate-900">
                        {dict.blog.recentTitle}
                      </h2>
                      <span className="text-[11px] font-black uppercase tracking-[0.24em] text-slate-400">
                        {dict.blog.newLabel}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <Link
                          key={post.id}
                          href={localizedPath(`/blog/${post.slug}`)}
                          className="group flex items-center gap-4 rounded-[3px] border border-slate-300 p-3 transition-colors hover:border-[#152f51]/20 hover:bg-slate-50"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[3px]">
                            <Image
                              src={post.imageUrl}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="mb-2 text-[11px] font-medium  tracking-[0.10em] text-[#152f51]">
                              {post.category}
                            </p>
                            <h3 className="line-clamp-2 text-sm font-black leading-snug text-slate-900">
                              {post.title}
                            </h3>
                            <p className="mt-2 text-xs font-medium text-slate-400">
                              {formatDate(
                                post.publishedAt || post.createdAt,
                                dateLocale,
                              )}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[3px] border border-slate-300 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.14)]">
                    <div className="mb-5">
                      <h2 className="text-lg font-black text-slate-900">
                        {dict.blog.categoriesTitle}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                        {dict.blog.categoriesDescription}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((item) => (
                          <Link
                            key={item.id}
                            href={localizedPath(
                              getCategoryHref(prefabricCategories, item),
                            )}
                            className="group flex items-center justify-between rounded-[3px] border border-slate-300 px-4 py-4 text-sm font-bold text-slate-700 transition-colors hover:border-[#152f51]/20 hover:bg-slate-50 hover:text-[#152f51]"
                          >
                            <span>{getCategoryDisplayName(item, locale)}</span>
                            <ChevronRight
                              size={16}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        ))
                      ) : (
                        <p className="rounded-[0.75rem] border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">
                          {dict.blog.categoryNoResult}
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
