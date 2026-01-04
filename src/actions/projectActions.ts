"use server";

import { eq, asc, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";

function generateId() {
  return crypto.randomUUID();
}

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

export async function getProjectById(id: string) {
  const result = await db
    .select()
    .from(project)
    .where(eq(project.id, id))
    .limit(1);
  return result[0] ?? null;
}

export async function createProject(data: {
  title: string;
  area: string;
  room: string;
  location: string;
  imageUrl: string;
  imageAlt?: string;
  isActive?: boolean;
  order?: number;
}) {
  await requireAuth();

  const id = generateId();
  const slug = slugify(data.title);

  await db.insert(project).values({
    id,
    title: data.title,
    slug,
    area: data.area,
    room: data.room,
    location: data.location,
    imageUrl: data.imageUrl,
    imageAlt: data.imageAlt ?? null,
    isActive: data.isActive ?? true,
    order: data.order ?? 0,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projelerimiz");

  return { id, slug };
}

export async function updateProject(
  id: string,
  data: {
    title?: string;
    area?: string;
    room?: string;
    location?: string;
    imageUrl?: string;
    imageAlt?: string | null;
    isActive?: boolean;
    order?: number;
  },
) {
  await requireAuth();

  const updateData: Record<string, unknown> = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
    updateData.slug = slugify(data.title);
  }
  if (data.area !== undefined) updateData.area = data.area;
  if (data.room !== undefined) updateData.room = data.room;
  if (data.location !== undefined) updateData.location = data.location;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
  if (data.imageAlt !== undefined) updateData.imageAlt = data.imageAlt;
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
