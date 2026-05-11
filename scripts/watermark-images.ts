/**
 * Watermark All Product Images Script
 *
 * Usage:
 *   npx tsx scripts/watermark-images.ts              # Process all images
 *   npx tsx scripts/watermark-images.ts --dry-run    # Preview without changes
 *   npx tsx scripts/watermark-images.ts --batch=20   # Process 20 at a time (default: 10)
 *
 * This script will:
 * 1. Fetch all product images from the database
 * 2. Download each image from R2
 * 3. Apply watermark using the existing watermark function
 * 4. Replace the image in R2 with the watermarked version
 */

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { productImage } from "../src/db/schema";
import { addWatermark } from "../src/lib/watermark";

config({ path: ".env" });

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const BATCH_SIZE = parseInt(
  args.find((a) => a.startsWith("--batch="))?.split("=")[1] || "10",
);

// Database connection
const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

// S3 Client for R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;

// Result tracking
interface ProcessingResult {
  total: number;
  processed: number;
  failed: number;
  errors: Array<{ id: string; url: string; error: string }>;
}

/**
 * Extract R2 key from URL
 * Handles both formats:
 * - Old: /product/filename.webp -> products/filename.webp (note: product -> products)
 * - New: https://cdn.hurtasbeton.com/products/filename.webp -> products/filename.webp
 */
function extractKeyFromUrl(url: string): string | null {
  try {
    // Old format: /product/filename.webp
    // Note: Database has "product" (singular) but R2 has "products" (plural)
    if (url.startsWith("/product/")) {
      const filename = url.slice("/product/".length);
      return `products/${filename}`;
    }

    // Other old local paths
    if (url.startsWith("/")) {
      return url.slice(1);
    }

    // New format: https://cdn.hurtasbeton.com/products/...
    const urlObj = new URL(url);
    return urlObj.pathname.slice(1); // Remove leading slash from pathname
  } catch {
    console.error(`  [HATA] Geçersiz URL: ${url}`);
    return null;
  }
}

/**
 * Determine content type from filename
 */
function getContentType(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

/**
 * Download image from R2
 */
async function downloadFromR2(key: string): Promise<Buffer> {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  const response = await s3Client.send(command);
  const stream = response.Body;

  if (!stream) {
    throw new Error(`Boş yanıt: ${key}`);
  }

  // Convert stream to buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as AsyncIterable<Uint8Array>) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Upload watermarked image to R2 (replaces existing)
 */
async function uploadToR2(
  buffer: Buffer,
  key: string,
  contentType: string,
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Format duration
 */
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}dk ${remainingSeconds}sn`;
  }
  return `${seconds}sn`;
}

/**
 * Process a single image: download, watermark, upload
 */
async function processImage(
  image: { id: string; url: string; productId: string },
  index: number,
  total: number,
): Promise<{ success: boolean; error?: string }> {
  const progress = `[${index + 1}/${total}]`;

  const key = extractKeyFromUrl(image.url);
  if (!key) {
    return { success: false, error: "gecersiz_url" };
  }

  console.log(`${progress} İşleniyor: ${key}`);

  if (DRY_RUN) {
    console.log(`  [KURU ÇALIŞTIRMA] Filigran uygulanıp değiştirilecek`);
    return { success: true };
  }

  try {
    // Step 1: Download original
    const originalBuffer = await downloadFromR2(key);
    console.log(`  İndirildi: ${formatBytes(originalBuffer.length)}`);

    // Step 2: Apply watermark
    const watermarkedBuffer = await addWatermark(originalBuffer);
    console.log(`  Filigran eklendi: ${formatBytes(watermarkedBuffer.length)}`);

    // Step 3: Upload (replace original)
    const contentType = getContentType(key);
    await uploadToR2(watermarkedBuffer, key, contentType);
    console.log(`  Yüklendi`);

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`  [HATA] ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

/**
 * Process images in batches
 */
async function processBatch(
  images: Array<{ id: string; url: string; productId: string }>,
  startIndex: number,
  result: ProcessingResult,
): Promise<void> {
  const batch = images.slice(startIndex, startIndex + BATCH_SIZE);

  for (let i = 0; i < batch.length; i++) {
    const image = batch[i];
    const globalIndex = startIndex + i;

    const { success, error } = await processImage(
      image,
      globalIndex,
      result.total,
    );

    if (success) {
      result.processed++;
    } else {
      result.failed++;
      result.errors.push({
        id: image.id,
        url: image.url,
        error: error || "bilinmeyen",
      });
    }

    // Small delay between images to avoid rate limiting
    if (!DRY_RUN) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // Delay between batches
  if (startIndex + BATCH_SIZE < images.length) {
    console.log(`\n  Parti tamamlandı. Sonraki parti bekleniyor...\n`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

async function main() {
  const startTime = Date.now();

  console.log("=".repeat(60));
  console.log("  ÜRÜN GÖRSELLERİNE FİLİGRAN EKLEME");
  console.log("=".repeat(60));
  console.log("");

  if (DRY_RUN) {
    console.log("  MOD: KURU ÇALIŞTIRMA (değişiklik yapılmayacak)");
  } else {
    console.log("  MOD: CANLI (görseller değiştirilecek)");
  }
  console.log(`  PARTİ BOYUTU: ${BATCH_SIZE}`);
  console.log(`  CDN URL: ${R2_PUBLIC_URL}`);
  console.log("");

  // Fetch all product images
  console.log("Veritabanından ürün görselleri getiriliyor...");
  const images = await db.select().from(productImage);

  console.log(`${images.length} ürün görseli bulundu\n`);

  if (images.length === 0) {
    console.log("İşlenecek görsel yok. Çıkılıyor.");
    process.exit(0);
  }

  // Confirm before proceeding (unless dry run)
  if (!DRY_RUN) {
    console.log(
      "UYARI: Bu işlem R2 deposundaki görselleri kalıcı olarak değiştirecek!",
    );
    console.log("İptal etmek için 5 saniye içinde Ctrl+C tuşlarına basın...\n");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // Initialize result tracking
  const result: ProcessingResult = {
    total: images.length,
    processed: 0,
    failed: 0,
    errors: [],
  };

  console.log("-".repeat(60));
  console.log("İşlem başlıyor...\n");

  // Process in batches
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    await processBatch(images, i, result);
  }

  // Final report
  const duration = Date.now() - startTime;

  console.log("");
  console.log("=".repeat(60));
  console.log("  İŞLEM TAMAMLANDI");
  console.log("=".repeat(60));
  console.log("");
  console.log(`  Toplam görsel:    ${result.total}`);
  console.log(`  İşlenen:          ${result.processed}`);
  console.log(`  Başarısız:        ${result.failed}`);
  console.log(`  Süre:             ${formatDuration(duration)}`);
  console.log("");

  if (result.errors.length > 0) {
    console.log("HATALAR:");
    for (const err of result.errors) {
      console.log(`  - ${err.url}`);
      console.log(`    Hata: ${err.error}`);
    }
    console.log("");
  }

  if (DRY_RUN) {
    console.log("Bu bir KURU ÇALIŞTIRMA idi. Hiçbir görsel değiştirilmedi.");
    console.log("Filigranları uygulamak için --dry-run olmadan çalıştırın.");
  }

  process.exit(result.failed > 0 ? 1 : 0);
}

// Execute
main().catch((error) => {
  console.error("Kritik hata:", error);
  process.exit(1);
});
