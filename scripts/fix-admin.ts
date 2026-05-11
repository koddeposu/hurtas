/**
 * Fix Admin Password Script - Using better-auth's hash
 *
 * Usage: npx tsx scripts/fix-admin.ts
 */

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { user, account } from "../src/db/schema";
import { hashPassword } from "better-auth/crypto";

config({ path: ".env" });

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

async function fixAdmin() {
  const adminEmail = "admin@hurtasbeton.com";
  const adminPassword = "admin123";

  console.log("🔧 Fixing admin password with better-auth...\n");

  // Find the user
  const users = await db.select().from(user).where(eq(user.email, adminEmail));

  if (users.length === 0) {
    console.log("❌ User not found. Run seed first: npx tsx scripts/seed.ts");
    process.exit(1);
  }

  const foundUser = users[0];
  const hashedPassword = await hashPassword(adminPassword);

  console.log("Hash format:", hashedPassword.substring(0, 50) + "...");

  // Update the password
  await db
    .update(account)
    .set({ password: hashedPassword })
    .where(eq(account.userId, foundUser.id));

  console.log(`\n✅ Password updated for ${adminEmail}`);
  console.log(`   New password: ${adminPassword}\n`);

  process.exit(0);
}

fixAdmin().catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
