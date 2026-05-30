import "dotenv/config";
import { storageMode, hasDatabase, useDatabase } from "./src/lib/db-mode";

console.log("=== DB Mode Debug ===");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
console.log("STORAGE_MODE:", process.env.STORAGE_MODE || "NOT SET");
console.log("storageMode:", storageMode);
console.log("hasDatabase:", hasDatabase);
console.log("useDatabase:", useDatabase);
console.log("=====================");
