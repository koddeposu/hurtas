"use server";

import { requireAuth } from "@/lib/requireAuth";
import { uploadToR2, deleteFromR2, generateImageKey } from "@/lib/s3";

export async function uploadImage(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "uploads";

  if (!file) {
    return { error: "No file provided" };
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    return {
      error: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
    };
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { error: "File too large. Maximum size is 10MB." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const key = generateImageKey(folder, file.name);
    const url = await uploadToR2(buffer, key, file.type);

    return { url, key };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload image" };
  }
}

export async function deleteImage(key: string) {
  await requireAuth();

  try {
    await deleteFromR2(key);
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { error: "Failed to delete image" };
  }
}
