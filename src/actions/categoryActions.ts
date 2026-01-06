"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { category } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";

// Generate unique ID
function generateId() {
  return crypto.randomUUID();
}

// Generate slug from name
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getCategories() {
  const categories = await db.select().from(category).orderBy(category.order);
  return categories;
}

export async function getCategoryById(id: string) {
  const result = await db
    .select()
    .from(category)
    .where(eq(category.id, id))
    .limit(1);
  return result[0] ?? null;
}

export async function createCategory(data: {
  name: string;
  description?: string;
  order?: number;
}) {
  await requireAuth();

  const id = generateId();
  const slug = slugify(data.name);

  await db.insert(category).values({
    id,
    name: data.name,
    slug,
    description: data.description ?? null,
    order: data.order ?? 0,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { id, slug };
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    description?: string;
    order?: number;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = slugify(data.name);
  }
  if (data.description !== undefined) {
    updateData.description = data.description;
  }
  if (data.order !== undefined) {
    updateData.order = data.order;
  }

  await db.update(category).set(updateData).where(eq(category.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { success: true };
}

export async function deleteCategory(id: string) {
  await requireAuth();

  await db.delete(category).where(eq(category.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { success: true };
}

export async function updateCategoriesOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(category)
      .set({ order: item.order })
      .where(eq(category.id, item.id));
  }

  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { success: true };
}
