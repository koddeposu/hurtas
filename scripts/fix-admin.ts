/**
 * Fix Admin Password Script - Using better-auth's hash
 *
 * Usage: npx tsx scripts/fix-admin.ts
 */

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { user, account } from "../src/db/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

config({ path: ".env" });

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

const scryptAsync = promisify(scrypt);

// Better-auth uses scrypt with PHC format
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `$scrypt$n=16384,r=8,p=1$${salt}$${derivedKey.toString("hex")}`;
}

async function fixAdmin() {
  const adminEmail = "admin@ctprefabrik.com";
  const adminPassword = "admin123";

  console.log("🔧 Fixing admin password with scrypt...\n");

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
