/**
 * Delete Admin User Script
 *
 * Usage: npx tsx scripts/delete-admin.ts
 */

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { user, account } from "../src/db/schema";

config({ path: ".env" });

const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

async function deleteAdmin() {
  const adminEmail = "admin@hurtasbeton.com";

  console.log("🗑️  Deleting admin user...\n");

  // Find the user
  const users = await db.select().from(user).where(eq(user.email, adminEmail));

  if (users.length === 0) {
    console.log("✅ User not found (already deleted or never created)");
    process.exit(0);
  }

  const foundUser = users[0];

  // Delete account first (foreign key)
  await db.delete(account).where(eq(account.userId, foundUser.id));
  console.log("   Deleted account record");

  // Delete user
  await db.delete(user).where(eq(user.id, foundUser.id));
  console.log("   Deleted user record");

  console.log(`\n✅ Admin user deleted: ${adminEmail}\n`);

  process.exit(0);
}

deleteAdmin().catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
