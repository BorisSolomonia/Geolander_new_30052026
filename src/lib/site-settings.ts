import { db } from "./db";
import { siteSettings } from "../../drizzle/schema";
import { defaultSiteSettings, withSettingFallback } from "./app-config";
import { readSettingsFile } from "./file-data-store";
import { useDatabase } from "./db-mode";

export type SiteSettings = typeof defaultSiteSettings;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!useDatabase) {
    return withSettingFallback(await readSettingsFile());
  }

  const rows = await db.select().from(siteSettings);
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return withSettingFallback(map);
}
