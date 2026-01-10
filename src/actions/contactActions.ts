"use server";

import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { contactSubmission } from "@/db/schema";
import { requireAuth } from "@/lib/requireAuth";
import { sendContactNotification } from "@/lib/email";

function generateId() {
  return crypto.randomUUID();
}

// Public action - no auth required
export async function submitContactForm(data: {
  name: string;
  phone: string;
  message?: string;
}) {
  const id = generateId();

  await db.insert(contactSubmission).values({
    id,
    name: data.name,
    phone: data.phone,
    message: data.message ?? null,
  });

  // Send email notification (fire and forget - don't fail form if email fails)
  sendContactNotification({
    name: data.name,
    phone: data.phone,
    message: data.message,
  }).catch((error) => {
    console.error("Email notification failed:", error);
  });

  return { success: true };
}

export async function getContactSubmissions(includeArchived: boolean = false) {
  await requireAuth();

  let query = db
    .select()
    .from(contactSubmission)
    .orderBy(desc(contactSubmission.createdAt));

  if (!includeArchived) {
    query = query.where(
      eq(contactSubmission.isArchived, false),
    ) as typeof query;
  }

  return await query;
}

export async function getContactById(id: string) {
  await requireAuth();

  const result = await db
    .select()
    .from(contactSubmission)
    .where(eq(contactSubmission.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function getUnreadCount() {
  await requireAuth();

  const result = await db
    .select()
    .from(contactSubmission)
    .where(
      and(
        eq(contactSubmission.isRead, false),
        eq(contactSubmission.isArchived, false),
      ),
    );

  return result.length;
}

export async function markAsRead(id: string) {
  await requireAuth();

  await db
    .update(contactSubmission)
    .set({ isRead: true })
    .where(eq(contactSubmission.id, id));

  revalidatePath("/admin/contacts");

  return { success: true };
}

export async function markAsUnread(id: string) {
  await requireAuth();

  await db
    .update(contactSubmission)
    .set({ isRead: false })
    .where(eq(contactSubmission.id, id));

  revalidatePath("/admin/contacts");

  return { success: true };
}

export async function archiveSubmission(id: string) {
  await requireAuth();

  await db
    .update(contactSubmission)
    .set({ isArchived: true })
    .where(eq(contactSubmission.id, id));

  revalidatePath("/admin/contacts");

  return { success: true };
}

export async function unarchiveSubmission(id: string) {
  await requireAuth();

  await db
    .update(contactSubmission)
    .set({ isArchived: false })
    .where(eq(contactSubmission.id, id));

  revalidatePath("/admin/contacts");

  return { success: true };
}

export async function deleteSubmission(id: string) {
  await requireAuth();

  await db.delete(contactSubmission).where(eq(contactSubmission.id, id));

  revalidatePath("/admin/contacts");

  return { success: true };
}
