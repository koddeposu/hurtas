"use server";

import { eq, asc, desc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { project, projectImage } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";
import { generateUniqueSlug } from "@/lib/slug";

function generateId() {
  return crypto.randomUUID();
}

function toNullableText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function getProjects(activeOnly: boolean = false) {
  let query = db
    .select()
    .from(project)
    .orderBy(asc(project.order), desc(project.createdAt));

  if (activeOnly) {
    query = query.where(eq(project.isActive, true)) as typeof query;
  }

  return await query;
}

export async function getProjectsWithImages(activeOnly: boolean = false) {
  const projects = await getProjects(activeOnly);
  if (projects.length === 0) return [];

  const projectIds = projects.map((p) => p.id);
  const images = await db
    .select()
    .from(projectImage)
    .where(inArray(projectImage.projectId, projectIds))
    .orderBy(asc(projectImage.order));

  const imagesByProjectId = new Map<string, typeof images>();

  for (const image of images) {
    const existingImages = imagesByProjectId.get(image.projectId) ?? [];
    existingImages.push(image);
    imagesByProjectId.set(image.projectId, existingImages);
  }

  return projects.map((p) => ({
    ...p,
    images: imagesByProjectId.get(p.id) ?? [],
  }));
}

export async function getProjectById(id: string) {
  const result = await db
    .select()
    .from(project)
    .where(eq(project.id, id))
    .limit(1);
  return result[0] ?? null;
}

export async function getProjectByIdWithImages(id: string) {
  const p = await getProjectById(id);
  if (!p) return null;

  const images = await db
    .select()
    .from(projectImage)
    .where(eq(projectImage.projectId, id))
    .orderBy(asc(projectImage.order));

  return {
    ...p,
    images,
  };
}

export async function createProject(data: {
  title: string;
  titleEn?: string;
  titleAr?: string;
  area: string;
  room: string;
  location: string;
  locationEn?: string;
  locationAr?: string;
  isActive?: boolean;
  order?: number;
  pendingImages?: Array<{
    url: string;
    alt: string;
    altEn?: string | null;
    altAr?: string | null;
    order: number;
  }>;
}) {
  await requireAuth();

  const id = generateId();
  const slug = await generateUniqueSlug("project", data.title);

  await db.insert(project).values({
    id,
    title: data.title,
    titleEn: toNullableText(data.titleEn),
    titleAr: toNullableText(data.titleAr),
    slug,
    area: data.area,
    room: data.room,
    location: data.location,
    locationEn: toNullableText(data.locationEn),
    locationAr: toNullableText(data.locationAr),
    isActive: data.isActive ?? true,
    order: data.order ?? 0,
  });

  // Create image records if pending images were provided
  if (data.pendingImages && data.pendingImages.length > 0) {
    for (const img of data.pendingImages) {
      await db.insert(projectImage).values({
        id: generateId(),
        projectId: id,
        url: img.url,
        alt: img.alt,
        altEn: toNullableText(img.altEn),
        altAr: toNullableText(img.altAr),
        order: img.order,
      });
    }
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { id, slug };
}

export async function updateProject(
  id: string,
  data: {
    title?: string;
    titleEn?: string | null;
    titleAr?: string | null;
    area?: string;
    room?: string;
    location?: string;
    locationEn?: string | null;
    locationAr?: string | null;
    isActive?: boolean;
    order?: number;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
    updateData.slug = await generateUniqueSlug("project", data.title, id);
  }
  if (data.titleEn !== undefined) updateData.titleEn = toNullableText(data.titleEn);
  if (data.titleAr !== undefined) updateData.titleAr = toNullableText(data.titleAr);
  if (data.area !== undefined) updateData.area = data.area;
  if (data.room !== undefined) updateData.room = data.room;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.locationEn !== undefined) {
    updateData.locationEn = toNullableText(data.locationEn);
  }
  if (data.locationAr !== undefined) {
    updateData.locationAr = toNullableText(data.locationAr);
  }
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.order !== undefined) updateData.order = data.order;

  await db.update(project).set(updateData).where(eq(project.id, id));

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { success: true };
}

export async function deleteProject(id: string) {
  await requireAuth();

  await db.delete(project).where(eq(project.id, id));

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { success: true };
}

export async function updateProjectsOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(project)
      .set({ order: item.order })
      .where(eq(project.id, item.id));
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { success: true };
}

// Project Image Actions

export async function addProjectImage(
  projectId: string,
  data: {
    url: string;
    alt: string;
    altEn?: string | null;
    altAr?: string | null;
    order?: number;
  },
) {
  await requireAuth();

  const id = generateId();

  await db.insert(projectImage).values({
    id,
    projectId,
    url: data.url,
    alt: data.alt,
    altEn: toNullableText(data.altEn),
    altAr: toNullableText(data.altAr),
    order: data.order ?? 0,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { id };
}

export async function deleteProjectImage(imageId: string) {
  await requireAuth();

  await db.delete(projectImage).where(eq(projectImage.id, imageId));

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { success: true };
}

export async function updateProjectImageOrder(imageId: string, order: number) {
  await requireAuth();

  await db
    .update(projectImage)
    .set({ order })
    .where(eq(projectImage.id, imageId));

  revalidatePath("/admin/projects");

  return { success: true };
}

export async function updateProjectImagesOrder(
  items: { id: string; order: number }[],
) {
  await requireAuth();

  for (const item of items) {
    await db
      .update(projectImage)
      .set({ order: item.order })
      .where(eq(projectImage.id, item.id));
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { success: true };
}

export async function updateProjectImageAlt(
  imageId: string,
  alt: string,
  altEn?: string | null,
  altAr?: string | null,
) {
  await requireAuth();

  await db
    .update(projectImage)
    .set({
      alt,
      altEn: toNullableText(altEn),
      altAr: toNullableText(altAr),
    })
    .where(eq(projectImage.id, imageId));

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { success: true };
}
