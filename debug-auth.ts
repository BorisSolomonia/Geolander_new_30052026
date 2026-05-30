import "dotenv/config";
import { verifyLocalAdminCredentials } from "./src/lib/auth";

console.log("=== Auth Debug ===");
console.log("SEED_ADMIN_EMAIL:", process.env.SEED_ADMIN_EMAIL);
console.log("SEED_ADMIN_PASSWORD:", process.env.SEED_ADMIN_PASSWORD);
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
console.log("ADMIN_PASSWORD_HASH:", process.env.ADMIN_PASSWORD_HASH);

async function run() {
  const result = await verifyLocalAdminCredentials(
    "admin@geolander.ge",
    "Geolander2026!"
  );
  console.log("Verification result for admin@geolander.ge / Geolander2026!:", result);
}

run();
