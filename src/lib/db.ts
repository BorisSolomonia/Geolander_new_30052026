import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "../../drizzle/schema";
import * as relations from "../../drizzle/relations";

type DbSchema = typeof schema & typeof relations;

const globalForDb = globalThis as unknown as {
  db: NeonHttpDatabase<DbSchema> | undefined;
};

function getDb(): NeonHttpDatabase<DbSchema> {
  if (!globalForDb.db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not set. The database was accessed but no connection string is configured."
      );
    }
    const sql = neon(process.env.DATABASE_URL);
    globalForDb.db = drizzle(sql, {
      schema: { ...schema, ...relations },
    });
  }
  return globalForDb.db;
}

export const db = new Proxy({} as NeonHttpDatabase<DbSchema>, {
  get(_target, prop, receiver) {
    const realDb = getDb();
    const value = Reflect.get(realDb, prop, receiver);
    if (typeof value === "function") {
      return value.bind(realDb);
    }
    return value;
  },
});
