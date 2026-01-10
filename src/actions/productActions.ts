"use server";

import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { product, productImage, category } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";
import { generateUniqueSlug } from "@/lib/slug";

function generateId() {
  return crypto.randomUUID();
}

export async function getProducts(categoryId?: string) {
  let query = db
    .select({
      product: product,
      category: category,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .orderBy(asc(product.order), desc(product.createdAt));

  if (categoryId) {
    query = query.where(eq(product.categoryId, categoryId)) as typeof query;
  }

  const results = await query;
  return results;
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

  const images = await db
    .select()
    .from(productImage)
    .where(eq(productImage.productId, result[0].product.id))
    .orderBy(asc(productImage.order));

  return {
    ...result[0].product,
    category: result[0].category,
    images,
  };
}

export async function getProductById(id: string) {
  const result = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .limit(1);

  if (!result[0]) return null;

  const images = await db
    .select()
    .from(productImage)
    .where(eq(productImage.productId, id))
    .orderBy(asc(productImage.order));

  return {
    ...result[0],
    images,
  };
}

export async function getProductsWithImages(categoryId?: string) {
  const products = await db
    .select({
      product: product,
      category: category,
    })
    .from(product)
    .leftJoin(category, eq(product.categoryId, category.id))
    .where(eq(product.isActive, true))
    .orderBy(asc(product.order));

  // Filter by category if provided
  const filteredProducts = categoryId
    ? products.filter((p) => p.product.categoryId === categoryId)
    : products;

  const productsWithImages = await Promise.all(
    filteredProducts.map(async (p) => {
      const images = await db
        .select()
        .from(productImage)
        .where(eq(productImage.productId, p.product.id))
        .orderBy(asc(productImage.order));

      return {
        ...p.product,
        category: p.category,
        images,
      };
    }),
  );

  return productsWithImages;
}

export async function createProduct(data: {
  categoryId?: string;
  name: string;
  area: string;
  room: string;
  floor: string;
  bath: string;
  height: string;
  price?: string;
  oldPrice?: string;
  description?: string;
  isActive?: boolean;
  order?: number;
  pendingImages?: Array<{ url: string; alt: string; order: number }>;
}) {
  await requireAuth();

  const id = generateId();
  const slug = await generateUniqueSlug("product", data.name);

  await db.insert(product).values({
    id,
    categoryId: data.categoryId ?? null,
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
    isActive: data.isActive ?? true,
    order: data.order ?? 0,
  });

  // Create image records if pending images were provided
  if (data.pendingImages && data.pendingImages.length > 0) {
    for (const img of data.pendingImages) {
      await db.insert(productImage).values({
        id: generateId(),
        productId: id,
        url: img.url,
        alt: img.alt,
        order: img.order,
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/prefabrik-evler", "layout");

  return { id, slug };
}

export async function updateProduct(
  id: string,
  data: {
    categoryId?: string | null;
    name?: string;
    area?: string;
    room?: string;
    floor?: string;
    bath?: string;
    height?: string;
    price?: string | null;
    oldPrice?: string | null;
    description?: string | null;
    isActive?: boolean;
    order?: number;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
    updateData.slug = await generateUniqueSlug("product", data.name, id);
  }
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.area !== undefined) updateData.area = data.area;
  if (data.room !== undefined) updateData.room = data.room;
  if (data.floor !== undefined) updateData.floor = data.floor;
  if (data.bath !== undefined) updateData.bath = data.bath;
  if (data.height !== undefined) updateData.height = data.height;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.oldPrice !== undefined) updateData.oldPrice = data.oldPrice;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.order !== undefined) updateData.order = data.order;

  await db.update(product).set(updateData).where(eq(product.id, id));

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
  revalidatePath("/urun-detay", "layout");

  return { success: true };
}
