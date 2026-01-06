import { db } from "@/db/drizzle";
import { category, product, project, blogPost } from "@/db/schema";
import { like, and, ne } from "drizzle-orm";

/**
 * Convert text to a URL-friendly slug
 */
export function slugify(text: string): string {
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

type TableType = "category" | "product" | "project" | "blogPost";

const tableMap = {
  category: category,
  product: product,
  project: project,
  blogPost: blogPost,
} as const;

/**
 * Generate a unique slug for a given table.
 * If the slug already exists, appends a numeric suffix (-2, -3, etc.)
 *
 * @param table - The table type to check for uniqueness
 * @param text - The text to convert to a slug
 * @param excludeId - Optional ID to exclude from uniqueness check (for updates)
 */
export async function generateUniqueSlug(
  table: TableType,
  text: string,
  excludeId?: string,
): Promise<string> {
  const baseSlug = slugify(text);
  const tableSchema = tableMap[table];

  // Find all existing slugs that match the base slug pattern
  // This includes the exact slug and any with numeric suffixes
  const existingSlugs = await db
    .select({ slug: tableSchema.slug, id: tableSchema.id })
    .from(tableSchema)
    .where(
      excludeId
        ? and(
            like(tableSchema.slug, `${baseSlug}%`),
            ne(tableSchema.id, excludeId),
          )
        : like(tableSchema.slug, `${baseSlug}%`),
    );

  // If no existing slugs match, use the base slug
  if (existingSlugs.length === 0) {
    return baseSlug;
  }

  // Check if the exact base slug exists
  const exactMatch = existingSlugs.some((s) => s.slug === baseSlug);
  if (!exactMatch) {
    return baseSlug;
  }

  // Find the highest numeric suffix
  let highestSuffix = 1;
  const suffixPattern = new RegExp(`^${baseSlug}-(\\d+)$`);

  for (const { slug } of existingSlugs) {
    const match = slug.match(suffixPattern);
    if (match) {
      const suffix = parseInt(match[1], 10);
      if (suffix >= highestSuffix) {
        highestSuffix = suffix + 1;
      }
    }
  }

  // If there are matches but no numeric suffixes yet, start with -2
  if (highestSuffix === 1) {
    highestSuffix = 2;
  }

  return `${baseSlug}-${highestSuffix}`;
}
