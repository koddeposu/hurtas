import { blogPost } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogPost = InferSelectModel<typeof blogPost>;

interface LatestBlogPostsProps {
  posts: BlogPost[];
}

function formatDate(date: Date | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="font-[family-name:var(--font-poppins)]">
      <div className="mb-7 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-[2px] border border-secondary/15 bg-secondary/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-secondary">
            Hürtaş Beton Blog Yazıları
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-4xl">
            Hürtaş Beton Elemanları
            <span className="text-secondary"> Ürün ve Proje Rehberi</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-500">
            Beton boru, parke taşı, bordür ve altyapı ürünleriyle ilgili
            seçim, tedarik ve uygulama içeriklerimizi inceleyin.
          </p>
        </div>

        <Link
          href="/blog"
          prefetch={false}
          className="inline-flex w-fit items-center gap-2 rounded-[2px] border border-slate-300 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-secondary hover:text-secondary"
        >
          Tümünü Gör
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            prefetch={false}
            className="group overflow-hidden rounded-[3px] border border-slate-300 bg-white shadow-[0_16px_38px_-32px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-400 hover:shadow-[0_22px_48px_-28px_rgba(15,23,42,0.28)]"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt || post.title}
                fill
                quality={50}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(min-width: 1280px) 19vw, (min-width: 768px) 40vw, 92vw"
              />
              <div className="absolute left-4 top-4 rounded-[2px] border border-slate-200/80 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
                {post.category}
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
                {post.readTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {post.readTime} dk
                  </span>
                ) : null}
              </div>

              <h3 className="mt-3 line-clamp-2 text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-primary">
                {post.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-500">
                {post.excerpt}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-secondary">
                Devamını Oku
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
