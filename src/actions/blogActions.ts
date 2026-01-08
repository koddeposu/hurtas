"use server";

import { eq, desc, asc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { blogPost } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";
import { generateUniqueSlug } from "@/lib/slug";

function generateId() {
  return crypto.randomUUID();
}

export async function getBlogPosts(publishedOnly: boolean = false) {
  let query = db
    .select()
    .from(blogPost)
    .orderBy(asc(blogPost.order), desc(blogPost.createdAt));

  if (publishedOnly) {
    query = query.where(eq(blogPost.isPublished, true)) as typeof query;
  }

  return await query;
}

export async function getBlogPostsPaginated(options: {
  page?: number;
  limit?: number;
  publishedOnly?: boolean;
}) {
  const page = options.page ?? 1;
  const limit = options.limit ?? 9;
  const offset = (page - 1) * limit;
  const publishedOnly = options.publishedOnly ?? true;

  // Count query
  const countResult = publishedOnly
    ? await db
        .select({ count: sql<number>`count(*)` })
        .from(blogPost)
        .where(eq(blogPost.isPublished, true))
    : await db.select({ count: sql<number>`count(*)` }).from(blogPost);

  const totalCount = Number(countResult[0].count);

  // Data query
  const posts = publishedOnly
    ? await db
        .select()
        .from(blogPost)
        .where(eq(blogPost.isPublished, true))
        .orderBy(asc(blogPost.order), desc(blogPost.createdAt))
        .limit(limit)
        .offset(offset)
    : await db
        .select()
        .from(blogPost)
        .orderBy(asc(blogPost.order), desc(blogPost.createdAt))
        .limit(limit)
        .offset(offset);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    posts,
    totalCount,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export async function getBlogPostById(id: string) {
  const result = await db
    .select()
    .from(blogPost)
    .where(eq(blogPost.id, id))
    .limit(1);
  return result[0] ?? null;
}

export async function getBlogPostBySlug(slug: string) {
  const result = await db
    .select()
    .from(blogPost)
    .where(eq(blogPost.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function createBlogPost(data: {
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  imageUrl: string;
  imageAlt?: string;
  readTime?: number;
  isPublished?: boolean;
}) {
  await requireAuth();

  const id = generateId();
  const slug = await generateUniqueSlug("blogPost", data.title);

  await db.insert(blogPost).values({
    id,
    title: data.title,
    slug,
    excerpt: data.excerpt,
    content: data.content ?? null,
    category: data.category,
    imageUrl: data.imageUrl,
    imageAlt: data.imageAlt ?? null,
    readTime: data.readTime ?? null,
    isPublished: data.isPublished ?? false,
    publishedAt: data.isPublished ? new Date() : null,
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  return { id, slug };
}

export async function updateBlogPost(
  id: string,
  data: {
    title?: string;
    excerpt?: string;
    content?: string | null;
    category?: string;
    imageUrl?: string;
    imageAlt?: string | null;
    readTime?: number | null;
    isPublished?: boolean;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
    updateData.slug = await generateUniqueSlug("blogPost", data.title, id);
  }
  if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
  if (data.imageAlt !== undefined) updateData.imageAlt = data.imageAlt;
  if (data.readTime !== undefined) updateData.readTime = data.readTime;

  if (data.isPublished !== undefined) {
    updateData.isPublished = data.isPublished;
    if (data.isPublished) {
      // Get current post to check if already published
      const current = await getBlogPostById(id);
      if (current && !current.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
  }

  await db.update(blogPost).set(updateData).where(eq(blogPost.id, id));

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  return { success: true };
}

export async function deleteBlogPost(id: string) {
  await requireAuth();

  await db.delete(blogPost).where(eq(blogPost.id, id));

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  return { success: true };
}

export async function updateBlogPostsOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(blogPost)
      .set({ order: item.order })
      .where(eq(blogPost.id, item.id));
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  return { success: true };
}
