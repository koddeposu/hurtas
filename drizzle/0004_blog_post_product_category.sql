ALTER TABLE "blog_post" ADD COLUMN IF NOT EXISTS "product_category_id" text;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_product_category_id_category_id_fk" FOREIGN KEY ("product_category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_post_product_category_idx" ON "blog_post" USING btree ("product_category_id");
