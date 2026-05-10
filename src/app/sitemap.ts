import { getBlogPosts } from "@/actions/blogActions";
import { getCategories } from "@/actions/categoryActions";
import { getProductsWithImages } from "@/actions/productActions";
import {
  ALL_PRODUCTS_PATH,
  getCategoryHref,
  getProductCategoryDetailHref,
} from "@/lib/productRoutes";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hurtasbeton.com";

  // Veritabanından ürünleri al
  const dbCategories = await getCategories();
  const dbProducts = await getProductsWithImages();
  const products = dbProducts.map((product) => ({
    url: `${baseUrl}${getProductCategoryDetailHref(product, dbCategories)}`,
    lastModified: product.updatedAt ?? product.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categories = dbCategories.map((category) => ({
    url: `${baseUrl}${getCategoryHref(dbCategories, category)}`,
    lastModified: category.updatedAt ?? category.createdAt,
    changeFrequency: "weekly" as const,
    priority: category.parentId ? 0.75 : 0.85,
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
      url: `${baseUrl}${ALL_PRODUCTS_PATH}`,
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
      url: `${baseUrl}/arge`,
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
    ...categories,
    ...products,
    ...blogPosts,
  ];
}
