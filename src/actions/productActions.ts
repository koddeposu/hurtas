"use server";

import { and, eq, desc, asc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { product, productImage, category, productCategory } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";
import { generateUniqueSlug } from "@/lib/slug";

type DBCategory = typeof category.$inferSelect;

function generateId() {
  return crypto.randomUUID();
}

function normalizeCategoryIds(
  categoryIds?: Array<string | null | undefined> | null,
  fallbackCategoryId?: string | null,
) {
  const source =
    categoryIds && categoryIds.length > 0
      ? categoryIds
      : fallbackCategoryId
        ? [fallbackCategoryId]
        : [];

  return Array.from(
    new Set(source.filter((id): id is string => typeof id === "string" && id.length > 0)),
  );
}

async function getLinkedProductIdsByCategory(categoryId: string) {
  const [mappedRows, legacyRows] = await Promise.all([
    db
      .select({ productId: productCategory.productId })
      .from(productCategory)
      .where(eq(productCategory.categoryId, categoryId)),
    db
      .select({ id: product.id })
      .from(product)
      .where(eq(product.categoryId, categoryId)),
  ]);

  return Array.from(
    new Set([
      ...mappedRows.map((row) => row.productId),
      ...legacyRows.map((row) => row.id),
    ]),
  );
}

async function getCategoriesByProductIds(productIds: string[]) {
  const map = new Map<string, DBCategory[]>();

  if (productIds.length === 0) {
    return map;
  }

  const rows = await db
    .select({
      productId: productCategory.productId,
      category,
    })
    .from(productCategory)
    .innerJoin(category, eq(productCategory.categoryId, category.id))
    .where(inArray(productCategory.productId, productIds))
    .orderBy(asc(category.order), asc(category.name));

  for (const row of rows) {
    const list = map.get(row.productId) ?? [];
    list.push(row.category);
    map.set(row.productId, list);
  }

  return map;
}

function mergeCategoriesWithPrimary(
  productId: string,
  primaryCategory: DBCategory | null,
  categoryMap: Map<string, DBCategory[]>,
) {
  const linkedCategories = categoryMap.get(productId) ?? [];

  if (!primaryCategory) {
    return linkedCategories;
  }

  if (linkedCategories.some((item) => item.id === primaryCategory.id)) {
    return linkedCategories;
  }

  return [primaryCategory, ...linkedCategories];
}

export async function getProducts(categoryId?: string) {
  const filteredProductIds = categoryId
    ? await getLinkedProductIdsByCategory(categoryId)
    : null;

  if (filteredProductIds && filteredProductIds.length === 0) {
    return [];
  }

  const results = filteredProductIds
    ? await db
        .select({
          product: product,
          category: category,
        })
        .from(product)
        .leftJoin(category, eq(product.categoryId, category.id))
        .where(inArray(product.id, filteredProductIds))
        .orderBy(asc(product.order), desc(product.createdAt))
    : await db
        .select({
          product: product,
          category: category,
        })
        .from(product)
        .leftJoin(category, eq(product.categoryId, category.id))
        .orderBy(asc(product.order), desc(product.createdAt));

  const categoryMap = await getCategoriesByProductIds(
    results.map((row) => row.product.id),
  );

  return results.map((row) => {
    const categories = mergeCategoriesWithPrimary(
      row.product.id,
      row.category,
      categoryMap,
    );
    const primaryCategory = row.category ?? categories[0] ?? null;

    return {
      product: row.product,
      category: primaryCategory,
      categories,
    };
  });
}

export async function getProductBySlug(slug: string) {
  const result = await db
    .select({
      product: product,
      category: category,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .where(eq(product.slug, slug))
    .limit(1);

  if (!result[0]) return null;

  const categoryMap = await getCategoriesByProductIds([result[0].product.id]);
  const categories = mergeCategoriesWithPrimary(
    result[0].product.id,
    result[0].category,
    categoryMap,
  );
  const primaryCategory = result[0].category ?? categories[0] ?? null;

  const images = await db
    .select()
    .from(productImage)
    .where(eq(productImage.productId, result[0].product.id))
    .orderBy(asc(productImage.order));

  return {
    ...result[0].product,
    categoryId: result[0].product.categoryId ?? primaryCategory?.id ?? null,
    category: primaryCategory,
    categories,
    categoryIds: categories.map((item) => item.id),
    images,
  };
}

export async function getProductById(id: string) {
  const result = await db
    .select({
      product: product,
      category: category,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .where(eq(product.id, id))
    .limit(1);

  if (!result[0]) return null;

  const categoryMap = await getCategoriesByProductIds([id]);
  const categories = mergeCategoriesWithPrimary(
    id,
    result[0].category,
    categoryMap,
  );
  const primaryCategory = result[0].category ?? categories[0] ?? null;

  const images = await db
    .select()
    .from(productImage)
    .where(eq(productImage.productId, id))
    .orderBy(asc(productImage.order));

  return {
    ...result[0].product,
    categoryId: result[0].product.categoryId ?? primaryCategory?.id ?? null,
    category: primaryCategory,
    categories,
    categoryIds: categories.map((item) => item.id),
    images,
  };
}

export async function getProductsWithImages(categoryId?: string) {
  const filteredProductIds = categoryId
    ? await getLinkedProductIdsByCategory(categoryId)
    : null;

  if (filteredProductIds && filteredProductIds.length === 0) {
    return [];
  }

  const filters = [eq(product.isActive, true)];
  if (filteredProductIds) {
    filters.push(inArray(product.id, filteredProductIds));
  }

  const products = await db
    .select({
      product: product,
      category: category,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .where(and(...filters))
    .orderBy(asc(product.order));

  const categoryMap = await getCategoriesByProductIds(
    products.map((row) => row.product.id),
  );

  const productsWithImages = await Promise.all(
    products.map(async (p) => {
      const categories = mergeCategoriesWithPrimary(
        p.product.id,
        p.category,
        categoryMap,
      );
      const primaryCategory = p.category ?? categories[0] ?? null;

      const images = await db
        .select()
        .from(productImage)
        .where(eq(productImage.productId, p.product.id))
        .orderBy(asc(productImage.order));

      return {
        ...p.product,
        category: primaryCategory,
        categories,
        categoryIds: categories.map((item) => item.id),
        images,
      };
    }),
  );

  return productsWithImages;
}

export async function getProductsPreview(categoryId?: string, limit?: number) {
  const filteredProductIds = categoryId
    ? await getLinkedProductIdsByCategory(categoryId)
    : null;

  if (filteredProductIds && filteredProductIds.length === 0) {
    return [];
  }

  const filters = [eq(product.isActive, true)];

  if (filteredProductIds) {
    filters.push(inArray(product.id, filteredProductIds));
  }

  let query = db
    .select({
      product: product,
      category: category,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .where(and(...filters))
    .orderBy(asc(product.order), desc(product.createdAt));

  if (limit) {
    query = query.limit(limit) as typeof query;
  }

  const rows = await query;
  const categoryMap = await getCategoriesByProductIds(
    rows.map((row) => row.product.id),
  );

  const previews = await Promise.all(
    rows.map(async (row) => {
      const categories = mergeCategoriesWithPrimary(
        row.product.id,
        row.category,
        categoryMap,
      );
      const primaryCategory = row.category ?? categories[0] ?? null;

      const images = await db
        .select()
        .from(productImage)
        .where(eq(productImage.productId, row.product.id))
        .orderBy(asc(productImage.order))
        .limit(1);

      return {
        ...row.product,
        category: primaryCategory,
        categories,
        categoryIds: categories.map((item) => item.id),
        image: images[0] ?? null,
      };
    }),
  );

  return previews;
}

export async function createProduct(data: {
  categoryId?: string;
  categoryIds?: string[];
  name: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price?: string;
  oldPrice?: string;
  description?: string;
  metaDescription?: string;
  isActive?: boolean;
  order?: number;
  pendingImages?: Array<{ url: string; alt: string; order: number }>;
}) {
  await requireAuth();

  const id = generateId();
  const slug = await generateUniqueSlug("product", data.name);
  const categoryIds = normalizeCategoryIds(data.categoryIds, data.categoryId);
  const primaryCategoryId = categoryIds[0] ?? null;

  await db.transaction(async (tx) => {
    await tx.insert(product).values({
      id,
      categoryId: primaryCategoryId,
      name: data.name,
      slug,
      area: data.area,
      room: data.room,
      floor: data.floor,
      bath: data.bath,
      height: data.height,
      price: data.price ?? null,
      oldPrice: data.oldPrice ?? null,
      description: data.description ?? null,
      metaDescription: data.metaDescription ?? null,
      isActive: data.isActive ?? true,
      order: data.order ?? 0,
    });

    if (categoryIds.length > 0) {
      await tx.insert(productCategory).values(
        categoryIds.map((item) => ({
          productId: id,
          categoryId: item,
        })),
      );
    }

    // Create image records if pending images were provided
    if (data.pendingImages && data.pendingImages.length > 0) {
      for (const img of data.pendingImages) {
        await tx.insert(productImage).values({
          id: generateId(),
          productId: id,
          url: img.url,
          alt: img.alt,
          order: img.order,
        });
      }
    }
  });

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { id, slug };
}

export async function updateProduct(
  id: string,
  data: {
    categoryId?: string | null;
    categoryIds?: string[] | null;
    name?: string;
    area?: string;
    room?: string;
    floor?: string;
    bath?: string;
    height?: string;
    price?: string | null;
    oldPrice?: string | null;
    description?: string | null;
    metaDescription?: string | null;
    isActive?: boolean;
    order?: number;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};
  const shouldSyncCategories =
    data.categoryIds !== undefined || data.categoryId !== undefined;
  const normalizedCategoryIds = shouldSyncCategories
    ? normalizeCategoryIds(data.categoryIds, data.categoryId)
    : [];

  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = await generateUniqueSlug("product", data.name, id);
  }
  if (data.categoryIds !== undefined) {
    updateData.categoryId = normalizedCategoryIds[0] ?? null;
  } else if (data.categoryId !== undefined) {
    updateData.categoryId = data.categoryId;
  }
  if (data.area !== undefined) updateData.area = data.area;
  if (data.room !== undefined) updateData.room = data.room;
  if (data.floor !== undefined) updateData.floor = data.floor;
  if (data.bath !== undefined) updateData.bath = data.bath;
  if (data.height !== undefined) updateData.height = data.height;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.oldPrice !== undefined) updateData.oldPrice = data.oldPrice;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.metaDescription !== undefined) {
    updateData.metaDescription = data.metaDescription;
  }
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.order !== undefined) updateData.order = data.order;

  await db.transaction(async (tx) => {
    await tx.update(product).set(updateData).where(eq(product.id, id));

    if (shouldSyncCategories) {
      await tx.delete(productCategory).where(eq(productCategory.productId, id));

      if (normalizedCategoryIds.length > 0) {
        await tx.insert(productCategory).values(
          normalizedCategoryIds.map((item) => ({
            productId: id,
            categoryId: item,
          })),
        );
      }
    }
  });

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { success: true };
}

export async function deleteProduct(id: string) {
  await requireAuth();

  // Images are deleted automatically via cascade
  await db.delete(product).where(eq(product.id, id));

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { success: true };
}

export async function addProductImage(
  productId: string,
  data: {
    url: string;
    alt: string;
    order?: number;
  },
) {
  await requireAuth();

  const id = generateId();

  await db.insert(productImage).values({
    id,
    productId,
    url: data.url,
    alt: data.alt,
    order: data.order ?? 0,
  });

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { id };
}

export async function deleteProductImage(imageId: string) {
  await requireAuth();

  await db.delete(productImage).where(eq(productImage.id, imageId));

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { success: true };
}

export async function updateProductImageOrder(imageId: string, order: number) {
  await requireAuth();

  await db
    .update(productImage)
    .set({ order })
    .where(eq(productImage.id, imageId));

  revalidatePath("/admin/products");

  return { success: true };
}

export async function updateProductImagesOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(productImage)
      .set({ order: item.order })
      .where(eq(productImage.id, item.id));
  }

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { success: true };
}

export async function updateProductsOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(product)
      .set({ order: item.order })
      .where(eq(product.id, item.id));
  }

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { success: true };
}

export async function updateProductImageAlt(imageId: string, alt: string) {
  await requireAuth();

  await db
    .update(productImage)
    .set({ alt })
    .where(eq(productImage.id, imageId));

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");
  revalidatePath("/prefabrik-ev", "layout");

  return { success: true };
}
