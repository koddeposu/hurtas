/**
 * Reset Password Script for CT Prefabrik Admin Panel
 *
 * Usage: npx tsx scripts/reset-password.ts <email> <new-password>
 *
 * Example: npx tsx scripts/reset-password.ts admin@ctprefabrik.com newpassword123
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

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function resetPassword() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(
      "Usage: npx tsx scripts/reset-password.ts <email> <new-password>",
    );
    console.log(
      "Example: npx tsx scripts/reset-password.ts admin@ctprefabrik.com newpassword123",
    );
    process.exit(1);
  }

  const [email, newPassword] = args;

  console.log(`🔐 Resetting password for: ${email}\n`);

  // Find user by email
  const users = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (users.length === 0) {
    console.error(`❌ User not found: ${email}`);
    process.exit(1);
  }

  const foundUser = users[0];

  // Update password in account table
  const hashedPassword = await hashPassword(newPassword);

  await db
    .update(account)
    .set({ password: hashedPassword })
    .where(eq(account.userId, foundUser.id));

  console.log(`✅ Password updated successfully for ${email}`);
  console.log(`\nNew password: ${newPassword}`);
  console.log(`\n⚠️  Remember to keep this password secure!`);

  process.exit(0);
}

resetPassword().catch((error) => {
  console.error("❌ Failed to reset password:", error);
  process.exit(1);
});
