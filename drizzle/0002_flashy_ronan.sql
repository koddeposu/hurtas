CREATE TABLE "favorite" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "favorite" ADD CONSTRAINT "favorite_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

CREATE INDEX "favorite_product_idx" ON "favorite" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "favorite_order_idx" ON "favorite" USING btree ("order");--> statement-breakpoint