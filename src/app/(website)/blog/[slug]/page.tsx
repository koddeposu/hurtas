import { getBlogPostBySlug } from "@/actions/blogActions";
import { getCategories } from "@/actions/categoryActions";
import { getProductsPreview } from "@/actions/productActions";
import { convertJsonToHtml } from "@/lib/tiptap-utils";
import type { DBProductPreview } from "@/types/product";
import type { JSONContent } from "@tiptap/core";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Home,
  Layers3,
  Package,
  Ruler,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButtons } from "./share-buttons";

async function getPostData(slug: string) {
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    return null;
  }

  return { post };
}

function getContentSections(content: string | null) {
  if (!content) return [];

  try {
    const json = JSON.parse(content) as JSONContent;
    const nodes = Array.isArray(json.content) ? json.content : [];

    if (nodes.length <= 3) {
      return [convertJsonToHtml(content)].filter(Boolean);
    }

    const cut1 = Math.max(1, Math.floor(nodes.length / 3));
    const cut2 = Math.max(cut1 + 1, Math.floor((nodes.length * 2) / 3));
    const slices = [
      nodes.slice(0, cut1),
      nodes.slice(cut1, cut2),
      nodes.slice(cut2),
    ];

    return slices
      .map((slice) =>
        slice.length > 0
          ? convertJsonToHtml(
              JSON.stringify({
                ...json,
                content: slice,
              }),
            )
          : "",
      )
      .filter(Boolean);
  } catch {
    return [convertJsonToHtml(content)].filter(Boolean);
  }
}

function formatPrice(price: string | null) {
  if (!price || price === "null") return null;
  return new Intl.NumberFormat("tr-TR").format(Number(price));
}

function normalizeRoom(room: string | null | undefined) {
  return (room ?? "").replace(/\s+/g, "").toLowerCase();
}

function hasRoomType(room: string | null | undefined, types: string[]) {
  const normalizedRoom = normalizeRoom(room);
  return types.some((type) => normalizedRoom.includes(normalizeRoom(type)));
}

function takeUniqueProducts(
  products: DBProductPreview[],
  limit: number,
  excludeIds: Set<string> = new Set(),
) {
  const selected: DBProductPreview[] = [];
  const seenIds = new Set(excludeIds);

  for (const item of products) {
    if (seenIds.has(item.id)) continue;
    selected.push(item);
    seenIds.add(item.id);

    if (selected.length >= limit) break;
  }

  return selected;
}

function ProductShowcase({
  title,
  description,
  products,
}: {
  title: string;
  description: string;
  products: DBProductPreview[];
}) {
  if (!products.length) return null;

  return (
    <section className="my-12 rounded-[1rem] border border-slate-300 bg-[#f8f7f3] p-5 md:p-6">
      <div className="mb-6 max-w-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary">
          Size Uygun Modeller
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/prefabrik-ev/${product.slug}`}
            className="group overflow-hidden rounded-[0.95rem] border border-slate-300 bg-white shadow-[0_16px_34px_-28px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-400 hover:shadow-[0_24px_46px_-30px_rgba(15,23,42,0.18)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              {product.image ? (
                <Image
                  src={product.image.url}
                  alt={product.image.alt}
                  fill
                  sizes="(min-width: 1280px) 19vw, (min-width: 768px) 42vw, 92vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : null}

              {product.category?.name ? (
                <div className="absolute left-4 top-4 rounded-lg border border-slate-200/80 bg-white/92 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur">
                  {product.category.name}
                </div>
              ) : null}
            </div>

            <div className="p-5">
              <h3 className="text-2xl font-black leading-snug tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-primary">
                {product.name}
              </h3>

              {product.price ? (
                <div className="mt-2 text-base font-bold text-secondary">
                  {formatPrice(product.price)} ₺
                </div>
              ) : null}

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
                    <Ruler size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {product.area} m<sup>2</sup>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-primary">
                    <Home size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {product.room}
                  </span>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-secondary">
                Ürünü İncele
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MobileQuickLinks() {
  return (
    <section className="mb-8 md:hidden">
      {/* 1. Müşteriye Mesaj Veren Başlık Alanı */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <Sparkles className="h-4.5 w-4.5 text-amber-500" />
        <h3 className="text-sm font-bold text-slate-800">
          Hayalindeki Evi Keşfet
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Kart 1: Dubleks Evler */}
        <Link
          href={"/prefabrik-evler/tek-katli-prefabrik-evler"}
          className="group relative overflow-hidden rounded-xl border border-primary/20 bg-white p-3.5 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.08)] transition-all active:scale-95"
        >
          {/* Arka plan efekti */}
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />

          <div className="relative">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Layers3 className="h-5 w-5" />
              </div>
              {/* Psikolojik Tetikleyici Rozet */}
              <span className="flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600">
                POPÜLER
              </span>
            </div>

            <h2 className="text-sm font-extrabold leading-tight text-slate-900">
              Tek Katlı Prefabrik Ev
              <span className="mt-0.5 block text-xs font-medium text-slate-500">
                1+1,2+1,3+1,4+1 modelleri inceleyin
              </span>
            </h2>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary">
              İncele{" "}
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Kart 2: Konteyner Evler */}
        <Link
          href="prefabrik-evler/cift-katli-prefabrik-evler"
          className="group relative overflow-hidden rounded-xl border border-secondary/20 bg-white p-3.5 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.08)] transition-all active:scale-95"
        >
          {/* Arka plan efekti */}
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-secondary/5 transition-transform group-hover:scale-150" />

          <div className="relative">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Package className="h-5 w-5" />
              </div>
              {/* Psikolojik Tetikleyici Rozet */}
              <span className="flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                HIZLI KURULUM
              </span>
            </div>

            <h2 className="text-sm font-extrabold leading-tight text-slate-900">
              Çift Katlı Prefabrik ev (Dublex)
              <span className="mt-0.5 block text-xs font-medium text-slate-500">
                2+1,3+1,4+1,5+1 ve daha fazlası
              </span>
            </h2>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-secondary">
              Tümünü Gör
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
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
  const contentSections = getContentSections(post.content);

  const categories = await getCategories();
  const singleFloorCategory = categories.find((item) =>
    item.name.includes("Tek Kat"),
  );
  const doubleFloorCategory = categories.find((item) =>
    item.name.includes("Çift Kat"),
  );
  const previewProducts = await getProductsPreview(undefined, 90);

  const singleFloorProducts = singleFloorCategory
    ? previewProducts.filter(
        (item) => item.categoryId === singleFloorCategory.id,
      )
    : previewProducts;
  const doubleFloorProducts = doubleFloorCategory
    ? previewProducts.filter(
        (item) => item.categoryId === doubleFloorCategory.id,
      )
    : [];
  const otherProducts = previewProducts.filter(
    (item) =>
      item.categoryId !== singleFloorCategory?.id &&
      item.categoryId !== doubleFloorCategory?.id,
  );

  const firstPrimary = singleFloorProducts.filter((item) =>
    hasRoomType(item.room, ["1+1"]),
  );
  const firstFallback = [
    ...singleFloorProducts.filter((item) => !hasRoomType(item.room, ["1+1"])),
    ...doubleFloorProducts,
    ...otherProducts,
  ];
  const firstBlockProducts = takeUniqueProducts(
    [...firstPrimary, ...firstFallback],
    3,
  );
  const firstUsesFallback = firstBlockProducts.some(
    (item) => !hasRoomType(item.room, ["1+1"]),
  );

  const firstSelectedIds = new Set(firstBlockProducts.map((item) => item.id));
  const secondPrimary = singleFloorProducts.filter((item) =>
    hasRoomType(item.room, ["2+1", "3+1"]),
  );
  const secondFallback = [
    ...singleFloorProducts.filter(
      (item) => !hasRoomType(item.room, ["2+1", "3+1"]),
    ),
    ...doubleFloorProducts,
    ...otherProducts,
  ];
  const secondBlockProducts = takeUniqueProducts(
    [...secondPrimary, ...secondFallback],
    3,
    firstSelectedIds,
  );
  const secondUsesFallback = secondBlockProducts.some(
    (item) => !hasRoomType(item.room, ["2+1", "3+1"]),
  );

  const firstShowcaseTitle = firstUsesFallback
    ? "Tek Katlı ve Çift Katlı Prefabrik Ev Modelleri"
    : "1+1 Tek Katlı Prefabrik Ev Modelleri";
  const firstShowcaseDescription = firstUsesFallback
    ? "1+1 ürün sayısı sınırlı olduğunda, size daha fazla seçenek sunmak için tek katlı ve çift katlı alternatif modelleri birlikte listeliyoruz."
    : "İçerikle birlikte değerlendirebileceğiniz, kompakt yaşam için uygun 1+1 tek katlı prefabrik ev seçeneklerini burada topladık.";

  const secondShowcaseTitle = secondUsesFallback
    ? "2+1, 3+1 ve Alternatif Prefabrik Ev Modelleri"
    : "2+1 ve 3+1 Tek Katlı Prefabrik Ev Modelleri";
  const secondShowcaseDescription = secondUsesFallback
    ? "2+1 ve 3+1 ürün sayısı sınırlı olduğunda, karşılaştırma yapabilmeniz için tek katlı ve çift katlı alternatif modelleri de dahil ediyoruz."
    : "Daha geniş yaşam planı arıyorsanız 2+1 ve 3+1 tek katlı prefabrik ev seçeneklerini de birlikte inceleyin.";

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 md:pt-20 md:pb-10 overflow-hidden">
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

        <div className="container mx-auto max-w-4xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex underline items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
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
          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold pb-6 md:pb-0">
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
      <article className="container mx-auto max-w-4xl ">
        <MobileQuickLinks />

        {/* Featured Image */}
        <div className="relative aspect-video w-full rounded-[1rem] overflow-hidden shadow-lg mb-8">
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
          {contentSections.length > 0 ? (
            <>
              <div dangerouslySetInnerHTML={{ __html: contentSections[0] }} />

              <ProductShowcase
                title={firstShowcaseTitle}
                description={firstShowcaseDescription}
                products={firstBlockProducts}
              />

              {contentSections[1] ? (
                <div dangerouslySetInnerHTML={{ __html: contentSections[1] }} />
              ) : null}

              <ProductShowcase
                title={secondShowcaseTitle}
                description={secondShowcaseDescription}
                products={secondBlockProducts}
              />

              {contentSections[2] ? (
                <div dangerouslySetInnerHTML={{ __html: contentSections[2] }} />
              ) : null}
            </>
          ) : null}
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
