import { getBlogPosts } from "@/actions/blogActions";
import { getProductsWithImages } from "@/actions/productActions";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ctprefabrik.com";

  // Veritabanından ürünleri al
  const dbProducts = await getProductsWithImages();
  const products = dbProducts.map((product) => ({
    url: `${baseUrl}/prefabrik-ev/${product.slug}`,
    lastModified: product.updatedAt ?? product.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Veritabanından blog yazılarını al
  const dbBlogPosts = await getBlogPosts(true);
  const blogPosts = dbBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Ana sayfalar
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/prefabrik-evler`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projelerimiz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products,
    ...blogPosts,
  ];
}
