"use server";

import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { favorite, product, productImage, category } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";

function generateId() {
  return crypto.randomUUID();
}

// Get all favorites with product data (for admin panel)
export async function getFavorites() {
  try {
    const favorites = await db
      .select({
        favorite: favorite,
        product: product,
        category: category,
      })
      .from(favorite)
      .innerJoin(product, eq(favorite.productId, product.id))
      .leftJoin(category, eq(product.categoryId, category.id))
      .orderBy(asc(favorite.order));

    // Get first image for each product
    const favoritesWithImages = await Promise.all(
      favorites.map(async (f) => {
        const images = await db
          .select()
          .from(productImage)
          .where(eq(productImage.productId, f.product.id))
          .orderBy(asc(productImage.order))
          .limit(1);

        return {
          id: f.favorite.id,
          order: f.favorite.order,
          product: {
            ...f.product,
            category: f.category,
            image: images[0] || null,
          },
        };
      }),
    );

    return favoritesWithImages;
  } catch {
    // Return empty array if table doesn't exist or query fails
    return [];
  }
}

// Get favorites for homepage (only active products, with all images)
export async function getFavoritesForHomepage() {
  try {
    const favorites = await db
      .select({
        favorite: favorite,
        product: product,
        category: category,
      })
      .from(favorite)
      .innerJoin(product, eq(favorite.productId, product.id))
      .leftJoin(category, eq(product.categoryId, category.id))
      .where(eq(product.isActive, true))
      .orderBy(asc(favorite.order));

    // Get all images for each product
    const favoritesWithImages = await Promise.all(
      favorites.map(async (f) => {
        const images = await db
          .select()
          .from(productImage)
          .where(eq(productImage.productId, f.product.id))
          .orderBy(asc(productImage.order));

        return {
          ...f.product,
          category: f.category,
          images,
        };
      }),
    );

    return favoritesWithImages;
  } catch {
    // Return empty array if table doesn't exist or query fails
    return [];
  }
}

// Add a product to favorites
export async function addFavorite(productId: string) {
  await requireAuth();

  // Check if product already in favorites
  const existing = await db
    .select()
    .from(favorite)
    .where(eq(favorite.productId, productId))
    .limit(1);

  if (existing.length > 0) {
    return { success: false, error: "Bu ürün zaten favorilerde" };
  }

  // Get max order to add at the end
  const maxOrderResult = await db
    .select({ order: favorite.order })
    .from(favorite)
    .orderBy(asc(favorite.order));

  const maxOrder =
    maxOrderResult.length > 0
      ? Math.max(...maxOrderResult.map((r) => r.order))
      : -1;

  const id = generateId();

  const newOrder = maxOrder + 1;

  await db.insert(favorite).values({
    id,
    productId,
    order: newOrder,
  });

  // Fetch the complete favorite with product data to return to client
  const newFavoriteData = await db
    .select({
      favorite: favorite,
      product: product,
      category: category,
    })
    .from(favorite)
    .innerJoin(product, eq(favorite.productId, product.id))
    .leftJoin(category, eq(product.categoryId, category.id))
    .where(eq(favorite.id, id))
    .limit(1);

  if (newFavoriteData.length === 0) {
    return { success: false, error: "Favori eklenemedi" };
  }

  const f = newFavoriteData[0];

  // Get first image for the product
  const images = await db
    .select()
    .from(productImage)
    .where(eq(productImage.productId, f.product.id))
    .orderBy(asc(productImage.order))
    .limit(1);

  const newFavorite = {
    id: f.favorite.id,
    order: f.favorite.order,
    product: {
      ...f.product,
      category: f.category,
      image: images[0] || null,
    },
  };

  revalidatePath("/admin/favorites");
  revalidatePath("/");

  return { success: true, id, favorite: newFavorite };
}

// Remove a product from favorites
export async function removeFavorite(id: string) {
  await requireAuth();

  await db.delete(favorite).where(eq(favorite.id, id));

  revalidatePath("/admin/favorites");
  revalidatePath("/");

  return { success: true };
}

// Update favorites order (for drag-and-drop)
export async function updateFavoritesOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(favorite)
      .set({ order: item.order })
      .where(eq(favorite.id, item.id));
  }

  revalidatePath("/admin/favorites");
  revalidatePath("/");

  return { success: true };
}

// Get all products for the dropdown (exclude already favorited)
export async function getProductsForFavoriteDropdown() {
  try {
    const allProducts = await db
      .select({
        product: product,
        category: category,
      })
      .from(product)
      .leftJoin(category, eq(product.categoryId, category.id))
      .orderBy(asc(product.name));

    const existingFavorites = await db.select().from(favorite);
    const favoriteProductIds = new Set(
      existingFavorites.map((f) => f.productId),
    );

    // Filter out already favorited products
    const availableProducts = allProducts.filter(
      (p) => !favoriteProductIds.has(p.product.id),
    );

    return availableProducts.map((p) => ({
      id: p.product.id,
      name: p.product.name,
      category: p.category?.name || null,
    }));
  } catch {
    // Return empty array if table doesn't exist or query fails
    return [];
  }
}
