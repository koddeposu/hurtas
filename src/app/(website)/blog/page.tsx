import { Metadata } from "next";
import { getBlogPostsPaginated, getLatestBlogPosts } from "@/actions/blogActions";
import { getCategories } from "@/actions/categoryActions";
import { formatMessage, getDictionary, getMetadataAlternates } from "@/lib/i18n";
import { getCurrentLocale } from "@/lib/i18n-server";
import { BlogPageClient } from "./blog-client";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const page = parseInt(params.page || "1", 10);
  const title =
    page > 1
      ? formatMessage(dict.blog.pageTitle, { page })
      : dict.seo.blogTitle;

  return {
    title,
    description: dict.seo.blogDescription,
    alternates: getMetadataAlternates(
      page > 1 ? `/blog?page=${page}` : "/blog",
      locale,
    ),
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
