import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "node:path";

loadEnv({ path: path.resolve(process.cwd(), ".env") });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is missing. Put your PostgreSQL connection string in .env."
  );
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
