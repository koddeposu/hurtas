import { Metadata } from "next";
import { getBlogPostsPaginated } from "@/actions/blogActions";
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
    page > 1 ? `Blog - Sayfa ${page} | CT Prefabrik` : "Blog | CT Prefabrik";

  return {
    title,
    description:
      "Prefabrik yapılardan modern mimariye, teknik ipuçlarından yaşam rehberlerine kadar her şey burada.",
    alternates: {
      canonical:
        page > 1
          ? `https://ctprefabrik.com/blog?page=${page}`
          : "https://ctprefabrik.com/blog",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));

  const data = await getBlogPostsPaginated({
    page,
    limit: 9,
    publishedOnly: true,
  });

  return <BlogPageClient data={data} />;
}
