import { getBlogPostBySlug } from "@/actions/blogActions";
import { getCategories } from "@/actions/categoryActions";
import { getProductsPreview } from "@/actions/productActions";
import { HomepageCategorySlider } from "@/components/home-page/homepage-category-slider";
import { convertJsonToHtml } from "@/lib/tiptap-utils";
import type { JSONContent } from "@tiptap/core";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Construction,
  Layers3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButtons } from "./share-buttons";

interface CategorySummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

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

    const cut = Math.max(1, Math.floor(nodes.length / 2));
    const slices = [nodes.slice(0, cut), nodes.slice(cut)];

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

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getCategory(categories: CategorySummary[], matchers: string[]) {
  return (
    categories.find((category) =>
      matchers.some((matcher) =>
        category.name.toLocaleLowerCase("tr-TR").includes(
          matcher.toLocaleLowerCase("tr-TR"),
        ),
      ),
    ) ?? null
  );
}

function MobileQuickLinks({
  infrastructureCategory,
  superstructureCategory,
}: {
  infrastructureCategory: CategorySummary | null;
  superstructureCategory: CategorySummary | null;
}) {
  return (
    <section className="mb-8 md:hidden">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-[1px] bg-[#d6a94a]" />
        <h3 className="text-sm font-black text-slate-800">
          Ürün Gruplarını Keşfet
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href={
            infrastructureCategory
              ? `/prefabrik-evler/${infrastructureCategory.slug}`
              : "/prefabrik-evler"
          }
          className="group relative overflow-hidden rounded-[3px] border border-slate-200 bg-white p-4 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.32)] transition-all active:scale-95"
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#152f51] text-white">
            <Construction className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-black leading-tight text-slate-900">
            Altyapı Elemanları
          </h2>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#152f51]">
            İncele
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        <Link
          href={
            superstructureCategory
              ? `/prefabrik-evler/${superstructureCategory.slug}`
              : "/prefabrik-evler"
          }
          className="group relative overflow-hidden rounded-[3px] border border-slate-200 bg-white p-4 shadow-[0_12px_26px_-24px_rgba(15,23,42,0.32)] transition-all active:scale-95"
        >
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-[#d6a94a] text-[#152f51]">
            <Layers3 className="h-5 w-5" />
          </div>
          <h2 className="text-sm font-black leading-tight text-slate-900">
            Üst Yapı Elemanları
          </h2>
          <div className="mt-3 flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#152f51]">
            Tümünü Gör
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </section>
  );
}

function SuggestedLinks({
  infrastructureCategory,
  superstructureCategory,
}: {
  infrastructureCategory: CategorySummary | null;
  superstructureCategory: CategorySummary | null;
}) {
  const links = [
    {
      title: "Altyapı Elemanları",
      description:
        "Beton boru, menhol, baca ve altyapı projeleri için kullanılan ürünleri inceleyin.",
      href: infrastructureCategory
        ? `/prefabrik-evler/${infrastructureCategory.slug}`
        : "/prefabrik-evler",
    },
    {
      title: "Üst Yapı Elemanları",
      description:
        "Parke taşı, bordür ve saha kaplama çözümlerini kategori bazında görün.",
      href: superstructureCategory
        ? `/prefabrik-evler/${superstructureCategory.slug}`
        : "/prefabrik-evler",
    },
  ];

  return (
    <section className="mt-14 border-y border-slate-200 bg-[#f6f8fb] py-7">
      <div className="max-w-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a94a]">
          İlgili Bağlantılar
        </p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-[#152f51] md:text-3xl">
          Ürün kategorilerine hızlı geçiş yapın.
        </h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {links.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-[3px] border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d6a94a]/60 hover:shadow-[0_20px_44px_-34px_rgba(15,23,42,0.22)]"
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
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#152f51] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
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
      title: "Blog | Hürtaş Beton",
    };
  }

  const { post } = data;

  return {
    title: `${post.title} | Hürtaş Beton Blog`,
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
  const [categories, sliderProducts] = await Promise.all([
    getCategories(),
    post.productCategoryId
      ? getProductsPreview(post.productCategoryId, 10)
      : Promise.resolve([]),
  ]);
  const infrastructureCategory = getCategory(categories, ["Altyapı", "Alt Yapı"]);
  const superstructureCategory = getCategory(categories, ["Üst Yapı", "Üstyapı"]);
  const sliderCategory = post.productCategoryId
    ? categories.find((category) => category.id === post.productCategoryId) ??
      null
    : null;
  const contentSections = getContentSections(post.content);
  const firstContent = contentSections[0];
  const restContent = contentSections.slice(1);

  return (
    <main className="min-h-screen bg-[#f4f7fb] pb-20">
      <section className="bg-white py-10 lg:py-14">
        <div className="container mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-center">
          <div>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#152f51] transition-colors hover:text-[#d6a94a]"
            >
              <ArrowLeft className="h-4 w-4" />
              Bloga Dön
            </Link>

            <div className="inline-flex items-center gap-2 rounded-[2px] border border-slate-200 bg-[#f6f8fb] px-3 py-1.5">
              <span className="h-2 w-2 rounded-[1px] bg-[#d6a94a]" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#152f51]">
                {post.category}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-600 md:text-base">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-bold text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#152f51]" />
                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
              </div>
              {post.readTime ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#152f51]" />
                  <span>{post.readTime} dk</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] border border-slate-200 bg-slate-100 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)]">
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
        </div>
      </section>

      <article className="container mx-auto max-w-4xl py-10">
        <MobileQuickLinks
          infrastructureCategory={infrastructureCategory}
          superstructureCategory={superstructureCategory}
        />

        <div className="blog-content text-slate-700">
          {firstContent ? (
            <div dangerouslySetInnerHTML={{ __html: firstContent }} />
          ) : (
            <p className="text-base font-medium leading-8 text-slate-700">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>

      {sliderCategory && sliderProducts.length > 0 ? (
        <section className="container mx-auto max-w-7xl pb-10">
          <HomepageCategorySlider
            title="Ürünleri"
            accent={sliderCategory.name}
            seoLabel="Blog İçeriğine Uygun Ürünler"
            description={`${post.title} içeriğiyle ilgili ${sliderCategory.name.toLocaleLowerCase("tr-TR")} ürünlerini inceleyin.`}
            href={`/prefabrik-evler/${sliderCategory.slug}`}
            products={sliderProducts}
          />
        </section>
      ) : null}

      <article className="container mx-auto max-w-4xl">
        <div className="blog-content text-slate-700">
          {restContent.map((content, index) => (
            <div
              key={`content-section-${index}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ))}
        </div>

        <SuggestedLinks
          infrastructureCategory={infrastructureCategory}
          superstructureCategory={superstructureCategory}
        />

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-8 md:flex-row">
          <div className="text-lg font-black text-slate-900">
            Bu yazıyı paylaş
          </div>
          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </article>
    </main>
  );
}
