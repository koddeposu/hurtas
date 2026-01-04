/**
 * Create Admin via HTTP API
 *
 * This creates the admin user using better-auth's signUp endpoint
 * which ensures proper password hashing.
 *
 * Usage: npx tsx scripts/create-admin-api.ts
 *
 * IMPORTANT: The dev server must be running (pnpm dev)
 */

const BASE_URL = "http://localhost:3000";
const ADMIN_EMAIL = "admin@ctprefabrik.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_NAME = "Admin";

async function createAdmin() {
  console.log("🔧 Creating admin user via API...\n");
  console.log("Make sure your dev server is running (pnpm dev)\n");

  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: BASE_URL,
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (
        data.message?.includes("already exists") ||
        data.code === "USER_ALREADY_EXISTS"
      ) {
        console.log("⚠️  User already exists. Trying to sign in...");

        // Try to sign in to verify the password works
        const signInResponse = await fetch(
          `${BASE_URL}/api/auth/sign-in/email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD,
            }),
          },
        );

        if (signInResponse.ok) {
          console.log("✅ User exists and password is correct!");
        } else {
          console.log("❌ User exists but password is incorrect.");
          console.log(
            "Delete the user from the database and run this script again:",
          );
          console.log(
            '   DELETE FROM account WHERE user_id = (SELECT id FROM "user" WHERE email = \'' +
              ADMIN_EMAIL +
              "');",
          );
          console.log(
            '   DELETE FROM "user" WHERE email = \'' + ADMIN_EMAIL + "';",
          );
        }
        process.exit(0);
      }

      console.error("❌ Failed to create user:", data);
      process.exit(1);
    }

    console.log("✅ Admin user created successfully!");
    console.log(`\nLogin credentials:`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`\n⚠️  Remember to change the password!\n`);
  } catch (error) {
    console.error("❌ Error:", error);
    console.log("\nMake sure the dev server is running: pnpm dev");
    process.exit(1);
  }
}

createAdmin();
