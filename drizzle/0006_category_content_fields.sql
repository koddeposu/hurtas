ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "title" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "subtitle" text;
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN IF NOT EXISTS "subdescription" text;
