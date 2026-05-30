function isPlaceholderDatabaseUrl(value: string) {
  return (
    value.includes("user:password@host") ||
    value.includes("host.neon.tech/dbname") ||
    value.includes("your-database-url") ||
    value.includes("dbname")
  );
}

function hasUsableDatabaseUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return false;
  if (isPlaceholderDatabaseUrl(trimmed)) return false;

  try {
    const parsed = new URL(trimmed);
    return (
      (parsed.protocol === "postgres:" || parsed.protocol === "postgresql:") &&
      parsed.hostname.length > 0 &&
      parsed.hostname !== "host"
    );
  } catch {
    return false;
  }
}

const storageModeEnv = process.env.STORAGE_MODE?.trim().toLowerCase();
export const storageMode =
  storageModeEnv === "database" || storageModeEnv === "db"
    ? "database"
    : "file";

export const hasDatabase = hasUsableDatabaseUrl(process.env.DATABASE_URL);
export const useDatabase = storageMode === "database" && hasDatabase;
export const useFileStorage = storageMode === "file" || !hasDatabase;

export class NoDatabaseError extends Error {
  constructor() {
    super(
      "Database not configured. Set DATABASE_URL to a real PostgreSQL connection string to enable this feature."
    );
    this.name = "NoDatabaseError";
  }
}
