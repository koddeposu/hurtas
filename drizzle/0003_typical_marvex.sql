CREATE TABLE IF NOT EXISTS "contact_click" (
	"id" serial PRIMARY KEY NOT NULL,
	"button_id" text NOT NULL,
	"visitor_key" text NOT NULL,
	"page" text NOT NULL,
	"bucket_start" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_category" (
	"product_id" text NOT NULL,
	"category_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_visit" (
	"id" serial PRIMARY KEY NOT NULL,
	"visitor_key" text NOT NULL,
	"page" text NOT NULL,
	"bucket_start" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "contact_click_button_visitor_bucket_uidx" ON "contact_click" USING btree ("button_id","visitor_key","bucket_start");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contact_click_created_at_idx" ON "contact_click" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "contact_click_button_created_at_idx" ON "contact_click" USING btree ("button_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_category_uidx" ON "product_category" USING btree ("product_id","category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_product_idx" ON "product_category" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_category_category_idx" ON "product_category" USING btree ("category_id");--> statement-breakpoint
INSERT INTO "product_category" ("product_id", "category_id")
SELECT "id", "category_id"
FROM "product"
WHERE "category_id" IS NOT NULL
ON CONFLICT ("product_id", "category_id") DO NOTHING;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "site_visit_visitor_bucket_uidx" ON "site_visit" USING btree ("visitor_key","bucket_start");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "site_visit_created_at_idx" ON "site_visit" USING btree ("created_at");
