import { getBlogPostBySlug } from "@/actions/blogActions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { ShareButtons } from "./share-buttons";
import { convertJsonToHtml } from "@/lib/tiptap-utils";

async function getPostData(slug: string) {
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    return null;
  }

  return { post };
}

function getSuggestedLinks(category?: string | null) {
  const lowerCategory = category?.toLowerCase() ?? "";

  if (lowerCategory.includes("çelik")) {
    return [
      {
        title: "Çelik Ev Modelleri",
        description:
          "Çelik konstrüksiyon ev çözümlerini ve güncel model seçeneklerini inceleyin.",
        href: "/prefabrik-evler/celik-ev",
      },
      {
        title: "Çelik Ev Projelerimiz",
        description:
          "Tamamlanan çelik ev ve modern yaşam alanı uygulamalarını keşfedin.",
        href: "/projelerimiz",
      },
    ];
  }

  if (lowerCategory.includes("tek kat")) {
    return [
      {
        title: "Tek Katlı Prefabrik Evler",
        description:
          "Tek katlı prefabrik ev fiyatları ve modelleri için kategori sayfasına geçin.",
        href: "/prefabrik-evler/tek-katli",
      },
      {
        title: "Prefabrik Ev Projelerimiz",
        description:
          "Tamamlanan tek katlı ve farklı planlı uygulama örneklerini inceleyin.",
        href: "/projelerimiz",
      },
    ];
  }

  if (lowerCategory.includes("çift kat") || lowerCategory.includes("dubleks")) {
    return [
      {
        title: "Çift Katlı Prefabrik Evler",
        description:
          "Dubleks prefabrik ev modelleri ve fiyat seçeneklerini karşılaştırın.",
        href: "/prefabrik-evler/cift-katli",
      },
      {
        title: "Dubleks Proje Örnekleri",
        description:
          "Geniş yaşam planına sahip referans projeleri inceleyerek fikir alın.",
        href: "/projelerimiz",
      },
    ];
  }

  return [
    {
      title: "Prefabrik Ev Modelleri",
      description:
        "Tek katlı, çift katlı ve çelik ev kategorilerini tek sayfada karşılaştırın.",
      href: "/prefabrik-evler",
    },
    {
      title: "Projelerimizi İnceleyin",
      description:
        "Tamamlanan prefabrik ev, çelik ev ve dubleks uygulamalarına göz atın.",
      href: "/projelerimiz",
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    return {
      title: "Blog | CT Prefabrik",
    };
  }

  const { post } = data;

  return {
    title: `${post.title} | CT Prefabrik Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  const { post } = data;
  const suggestedLinks = getSuggestedLinks(post.category);

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Background Vectors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/3 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(#49202d 0.5px, transparent 0.5px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Bloga Dön
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-primary/5 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold border-b border-slate-100 pb-8">
            {post.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} dk</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <article className="container mx-auto max-w-4xl px-4">
        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-lg mb-8">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            fill
            preload
            fetchPriority="high"
            loading="eager"
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="blog-content text-slate-600">
          {post.content && (
            <div dangerouslySetInnerHTML={{ __html: convertJsonToHtml(post.content) }} />
          )}
        </div>

        <section className="mt-14 rounded-[2rem] border border-slate-200 bg-[#f8f7f3] p-6 md:p-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
              İlgili Bağlantılar
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              Bu İçeriği Okuduktan Sonra Buraya Geçin
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600 md:text-base">
              Blog içeriğini ürün kategorileri ve referans projelerle birlikte
              incelemek, karar verme sürecini hızlandırır. Aşağıdaki bağlantılar
              sizi ilgili kategori ve proje sayfalarına taşır.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {suggestedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_20px_44px_-34px_rgba(15,23,42,0.18)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-secondary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* --- SHARE / FOOTER --- */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-900 font-bold text-lg">
            Bu yazıyı paylaş:
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>
    </main>
  );
}
