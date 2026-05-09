ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "name_en" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "name_ar" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "title_en" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "title_ar" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "description_en" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "description_ar" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "subtitle_en" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "subtitle_ar" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "subdescription_en" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "subdescription_ar" text;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "name_en" text;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "name_ar" text;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "description_en" text;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "description_ar" text;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "meta_description_en" text;
--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "meta_description_ar" text;
--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN IF NOT EXISTS "alt_en" text;
--> statement-breakpoint
ALTER TABLE "product_image" ADD COLUMN IF NOT EXISTS "alt_ar" text;
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN IF NOT EXISTS "title_en" text;
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN IF NOT EXISTS "title_ar" text;
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN IF NOT EXISTS "location_en" text;
--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN IF NOT EXISTS "location_ar" text;
--> statement-breakpoint
ALTER TABLE "project_image" ADD COLUMN IF NOT EXISTS "alt_en" text;
--> statement-breakpoint
ALTER TABLE "project_image" ADD COLUMN IF NOT EXISTS "alt_ar" text;
