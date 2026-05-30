import type { Metadata } from "next";
import { getSiteSettings } from "./site-settings";
import { appConfig } from "./app-config";

export async function getSeoMetadata(
  path: string,
  locale: string,
  title: string,
  description: string
): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = (settings.site_url || appConfig.siteUrl).replace(/\/$/, "");
  const locales = appConfig.locales;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    const prefix = loc === "en" ? "" : `/${loc}`;
    languages[loc] = `${baseUrl}${prefix}${path}`;
  }
  languages["x-default"] = `${baseUrl}${path}`;

  const currentPrefix = locale === "en" ? "" : `/${locale}`;
  const canonicalUrl = `${baseUrl}${currentPrefix}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}
