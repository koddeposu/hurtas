"use server";

import { requireAuth } from "@/lib/requireAuth";
import { uploadToR2, deleteFromR2, generateImageKey } from "@/lib/s3";
import { addWatermark } from "@/lib/watermark";

// Folders that should have watermarks applied
const WATERMARK_FOLDERS = ["products", "projects"];

export async function uploadImage(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "uploads";
  // const skipWatermark = formData.get("skipWatermark") === "true";

  const skipWatermark = true;

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
    let buffer: Buffer = Buffer.from(await file.arrayBuffer());

    // Apply watermark for product/project images (unless explicitly skipped)
    if (!skipWatermark && WATERMARK_FOLDERS.includes(folder)) {
      const watermarkedBuffer = await addWatermark(buffer);
      buffer = Buffer.from(watermarkedBuffer);
    }

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
