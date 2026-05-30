function getEnv(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback;
}

export const serverConfig = {
  seedAdminEmail: getEnv("SEED_ADMIN_EMAIL", "admin@geolander.ge"),
  seedAdminPassword: getEnv("SEED_ADMIN_PASSWORD", "Geolander2026!"),
  seedAdminName: getEnv("SEED_ADMIN_NAME", "Admin"),
};
