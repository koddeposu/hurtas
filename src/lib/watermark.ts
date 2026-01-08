import sharp from "sharp";
import path from "path";

const WATERMARK_PATH = path.join(process.cwd(), "transparent-logo.png");

// Cache for pre-processed watermarks at different sizes
const watermarkCache = new Map<string, Buffer>();

export interface WatermarkOptions {
  /** Watermark opacity (0-1). Default: 0.3 */
  opacity?: number;
  /** Watermark size as percentage of the smaller image dimension. Default: 0.25 (25%) */
  scale?: number;
}

/**
 * Get or create a cached watermark at the specified size with opacity applied
 */
async function getCachedWatermark(
  width: number,
  height: number,
  opacity: number
): Promise<Buffer> {
  const cacheKey = `${width}x${height}@${opacity}`;

  if (watermarkCache.has(cacheKey)) {
    return watermarkCache.get(cacheKey)!;
  }

  // Load original watermark
  const originalWatermark = await sharp(WATERMARK_PATH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = originalWatermark;
  const pixels = new Uint8Array(data);

  // Apply opacity to alpha channel ONCE
  for (let i = 3; i < pixels.length; i += 4) {
    pixels[i] = Math.round(pixels[i] * opacity);
  }

  // Convert back to PNG with opacity baked in, then resize with high quality
  const watermarkWithOpacity = await sharp(Buffer.from(pixels), {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  // Resize with lanczos3 for maximum sharpness
  const resizedWatermark = await sharp(watermarkWithOpacity)
    .resize(width, height, {
      fit: "inside",
      kernel: "lanczos3",
    })
    .png({
      compressionLevel: 9,
      quality: 100,
    })
    .toBuffer();

  watermarkCache.set(cacheKey, resizedWatermark);
  return resizedWatermark;
}

/**
 * Adds a centered watermark to an image buffer
 * @param imageBuffer - The original image buffer
 * @param options - Watermark options (opacity, scale)
 * @returns Watermarked image buffer
 */
export async function addWatermark(
  imageBuffer: Buffer,
  options: WatermarkOptions = {}
): Promise<Buffer> {
  const { opacity = 0.3, scale = 0.25 } = options;

  // Get input image metadata
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const { width = 800, height = 600, format } = metadata;

  // Get original watermark dimensions for aspect ratio
  const wmMeta = await sharp(WATERMARK_PATH).metadata();
  const wmOrigWidth = wmMeta.width || 1062;
  const wmOrigHeight = wmMeta.height || 636;
  const wmAspectRatio = wmOrigWidth / wmOrigHeight;

  // Calculate watermark dimensions (scale relative to smaller image dimension)
  const targetDimension = Math.min(width, height) * scale;

  let wmWidth: number;
  let wmHeight: number;

  if (wmAspectRatio > 1) {
    wmWidth = Math.round(targetDimension * wmAspectRatio);
    wmHeight = Math.round(targetDimension);
  } else {
    wmHeight = Math.round(targetDimension);
    wmWidth = Math.round(targetDimension * wmAspectRatio);
  }

  // Ensure minimum size
  wmWidth = Math.max(wmWidth, 50);
  wmHeight = Math.max(wmHeight, 30);

  // Get cached watermark with opacity pre-applied
  const watermark = await getCachedWatermark(wmWidth, wmHeight, opacity);

  // Calculate center position
  const left = Math.round((width - wmWidth) / 2);
  const top = Math.round((height - wmHeight) / 2);

  // Composite and return in original format with MAXIMUM quality
  let result = image.composite([
    {
      input: watermark,
      left: Math.max(0, left),
      top: Math.max(0, top),
    },
  ]);

  // Preserve original format with absolute maximum quality settings
  if (format === "jpeg" || format === "jpg") {
    result = result.jpeg({
      quality: 100,
      chromaSubsampling: "4:4:4", // No chroma subsampling - preserves all color detail
    });
  } else if (format === "webp") {
    result = result.webp({
      lossless: true, // Completely lossless
    });
  } else if (format === "gif") {
    result = result.gif();
  } else {
    // PNG and others
    result = result.png({
      compressionLevel: 0, // Fastest, no quality difference
    });
  }

  return result.toBuffer();
}
