/**
 * Seed Script for CT Prefabrik Admin Panel
 *
 * Usage: npx tsx scripts/seed.ts
 *
 * This script will:
 * 1. Create an admin user
 * 2. Create default categories
 * 3. Migrate existing products from src/types/product.ts
 */

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { hash } from "bcryptjs";
import {
  user,
  account,
  category,
  product,
  productImage,
} from "../src/db/schema";
import { MOCK_PRODUCT } from "../src/types/product";

config({ path: ".env" });

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

async function seed() {
  console.log("🌱 Starting seed...\n");

  // 1. Create Admin User
  const adminEmail = "admin@ctprefabrik.com";
  const adminPassword = "admin123"; // Change this!

  const userId = crypto.randomUUID();
  const accountId = crypto.randomUUID();

  // Use bcrypt for password hashing (same as better-auth)
  const hashedPassword = await hash(adminPassword, 10);

  console.log("👤 Creating admin user...");
  await db
    .insert(user)
    .values({
      id: userId,
      name: "Admin",
      email: adminEmail,
      emailVerified: true,
    })
    .onConflictDoNothing();

  await db
    .insert(account)
    .values({
      id: accountId,
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
    })
    .onConflictDoNothing();

  console.log(`   ✅ Admin user created: ${adminEmail}`);
  console.log(`   ⚠️  Password: ${adminPassword} (CHANGE THIS!)\n`);

  // 2. Create Categories
  console.log("📁 Creating categories...");
  const categories = [
    { id: crypto.randomUUID(), name: "Tek Katlı", slug: "tek-katli", order: 0 },
    {
      id: crypto.randomUUID(),
      name: "Çift Katlı",
      slug: "cift-katli",
      order: 1,
    },
    { id: crypto.randomUUID(), name: "Çelik Ev", slug: "celik-ev", order: 2 },
  ];

  for (const cat of categories) {
    await db.insert(category).values(cat).onConflictDoNothing();
    console.log(`   ✅ ${cat.name}`);
  }
  console.log("");

  // 3. Migrate Products
  console.log("📦 Migrating products from MOCK_PRODUCT...");

  // Map old category names to new category IDs
  const categoryMap: Record<string, string> = {
    "Tek Katlı": categories[0].id,
    "Çift Katlı": categories[1].id,
    "Çelik Ev": categories[2].id,
  };

  let productCount = 0;
  for (const p of MOCK_PRODUCT) {
    const productId = crypto.randomUUID();
    const categoryId = categoryMap[p.category] ?? null;

    await db
      .insert(product)
      .values({
        id: productId,
        categoryId,
        name: p.name,
        slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        area: p.area,
        room: p.room,
        floor: p.floor,
        bath: p.bath,
        height: p.height,
        price: p.price ?? null,
        oldPrice: p.oldPrice ?? null,
        description: p.description?.join("\n") ?? null,
        isActive: true,
        order: productCount,
      })
      .onConflictDoNothing();

    // Add images
    for (let i = 0; i < p.img.length; i++) {
      const img = p.img[i];
      const imageUrl = `/product/${img.src}`;

      await db
        .insert(productImage)
        .values({
          id: crypto.randomUUID(),
          productId,
          url: imageUrl,
          alt: img.alt,
          order: i,
        })
        .onConflictDoNothing();
    }

    productCount++;
  }

  console.log(`   ✅ Migrated ${productCount} products\n`);

  console.log("🎉 Seed complete!\n");
  console.log("Next steps:");
  console.log("1. Run: pnpm dev");
  console.log("2. Go to: http://localhost:3000/admin/login");
  console.log(`3. Login with: ${adminEmail} / ${adminPassword}`);
  console.log("4. CHANGE YOUR PASSWORD!\n");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
