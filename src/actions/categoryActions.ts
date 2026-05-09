"use server";

import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { category } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";
import { generateUniqueSlug } from "@/lib/slug";

// Generate unique ID
function generateId() {
  return crypto.randomUUID();
}

function toNullableText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function getCategories() {
  const categories = await db
    .select()
    .from(category)
    .orderBy(asc(category.order), asc(category.name));
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

export async function getCategoryBySlug(slug: string) {
  const result = await db
    .select()
    .from(category)
    .where(eq(category.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function createCategory(data: {
  name: string;
  nameEn?: string;
  nameAr?: string;
  parentId?: string | null;
  title?: string;
  titleEn?: string;
  titleAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  subtitle?: string;
  subtitleEn?: string;
  subtitleAr?: string;
  subdescription?: string;
  subdescriptionEn?: string;
  subdescriptionAr?: string;
  order?: number;
}) {
  await requireAuth();

  const id = generateId();
  const slug = await generateUniqueSlug("category", data.name);

  await db.insert(category).values({
    id,
    parentId: data.parentId || null,
    name: data.name,
    nameEn: toNullableText(data.nameEn),
    nameAr: toNullableText(data.nameAr),
    slug,
    title: toNullableText(data.title),
    titleEn: toNullableText(data.titleEn),
    titleAr: toNullableText(data.titleAr),
    description: toNullableText(data.description),
    descriptionEn: toNullableText(data.descriptionEn),
    descriptionAr: toNullableText(data.descriptionAr),
    subtitle: toNullableText(data.subtitle),
    subtitleEn: toNullableText(data.subtitleEn),
    subtitleAr: toNullableText(data.subtitleAr),
    subdescription: toNullableText(data.subdescription),
    subdescriptionEn: toNullableText(data.subdescriptionEn),
    subdescriptionAr: toNullableText(data.subdescriptionAr),
    order: data.order ?? 0,
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { id, slug };
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    nameEn?: string;
    nameAr?: string;
    parentId?: string | null;
    title?: string;
    titleEn?: string;
    titleAr?: string;
    description?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    subtitle?: string;
    subtitleEn?: string;
    subtitleAr?: string;
    subdescription?: string;
    subdescriptionEn?: string;
    subdescriptionAr?: string;
    order?: number;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = await generateUniqueSlug("category", data.name, id);
  }
  if (data.nameEn !== undefined) {
    updateData.nameEn = toNullableText(data.nameEn);
  }
  if (data.nameAr !== undefined) {
    updateData.nameAr = toNullableText(data.nameAr);
  }
  if (data.parentId !== undefined) {
    updateData.parentId = data.parentId === id ? null : data.parentId;
  }
  if (data.title !== undefined) {
    updateData.title = toNullableText(data.title);
  }
  if (data.titleEn !== undefined) {
    updateData.titleEn = toNullableText(data.titleEn);
  }
  if (data.titleAr !== undefined) {
    updateData.titleAr = toNullableText(data.titleAr);
  }
  if (data.description !== undefined) {
    updateData.description = toNullableText(data.description);
  }
  if (data.descriptionEn !== undefined) {
    updateData.descriptionEn = toNullableText(data.descriptionEn);
  }
  if (data.descriptionAr !== undefined) {
    updateData.descriptionAr = toNullableText(data.descriptionAr);
  }
  if (data.subtitle !== undefined) {
    updateData.subtitle = toNullableText(data.subtitle);
  }
  if (data.subtitleEn !== undefined) {
    updateData.subtitleEn = toNullableText(data.subtitleEn);
  }
  if (data.subtitleAr !== undefined) {
    updateData.subtitleAr = toNullableText(data.subtitleAr);
  }
  if (data.subdescription !== undefined) {
    updateData.subdescription = toNullableText(data.subdescription);
  }
  if (data.subdescriptionEn !== undefined) {
    updateData.subdescriptionEn = toNullableText(data.subdescriptionEn);
  }
  if (data.subdescriptionAr !== undefined) {
    updateData.subdescriptionAr = toNullableText(data.subdescriptionAr);
  }
  if (data.order !== undefined) {
    updateData.order = data.order;
  }

  await db.update(category).set(updateData).where(eq(category.id, id));

  revalidatePath("/", "layout");
  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { success: true };
}

export async function deleteCategory(id: string) {
  await requireAuth();

  await db.delete(category).where(eq(category.id, id));

  revalidatePath("/", "layout");
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

  revalidatePath("/", "layout");
  revalidatePath("/admin/categories");
  revalidatePath("/prefabrik-evler");

  return { success: true };
}
