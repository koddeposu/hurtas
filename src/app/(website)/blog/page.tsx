import { Metadata } from "next";
import { getBlogPostsPaginated, getLatestBlogPosts } from "@/actions/blogActions";
import { getCategories } from "@/actions/categoryActions";
import { BlogPageClient } from "./blog-client";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const title =
    page > 1 ? `Blog - Sayfa ${page} | Hürtaş Beton` : "Blog | Hürtaş Beton";

  return {
    title,
    description:
      "Beton boru, parke taşı, bordür ve altyapı beton ürünleri hakkında ürün seçimi, tedarik ve uygulama rehberleri.",
    alternates: {
      canonical:
        page > 1
          ? `https://www.hurtasbeton.com/blog?page=${page}`
          : "https://www.hurtasbeton.com/blog",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));

  const [data, recentPosts, prefabricCategories] = await Promise.all([
    getBlogPostsPaginated({
      page,
      limit: 9,
      publishedOnly: true,
    }),
    getLatestBlogPosts(4),
    getCategories(),
  ]);

  return (
    <BlogPageClient
      data={data}
      recentPosts={recentPosts}
      prefabricCategories={prefabricCategories}
    />
  );
}
