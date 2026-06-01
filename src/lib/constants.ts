import { appConfig } from "./app-config";

export const SITE_NAME = appConfig.siteName;
export const SITE_DESCRIPTION = appConfig.siteDescription;
export const SITE_URL = appConfig.siteUrl;

export const DEFAULT_LOCALE = appConfig.defaultLocale;
export const LOCALES = appConfig.locales as [string, ...string[]];
export type Locale = (typeof LOCALES)[number];

export const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/fleet", labelKey: "nav.fleet" },
  { href: "/places", labelKey: "nav.places" },
  { href: "/travel-info", labelKey: "nav.travelInfo" },
  { href: "/music", labelKey: "nav.music" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/terms", labelKey: "nav.terms" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export const TRANSMISSION_OPTIONS = ["automatic", "manual"] as const;
export const FUEL_TYPE_OPTIONS = [
  "gasoline",
  "diesel",
  "electric",
  "hybrid",
] as const;
export const BOOKING_STATUS_OPTIONS = [
  "pending",
  "approved",
  "rejected",
  "cancelled",
  "completed",
] as const;
export const PRICE_LEVEL_OPTIONS = ["budget", "mid-range", "premium"] as const;

export const WHATSAPP_BASE_URL = appConfig.whatsappBaseUrl;
export const WHATSAPP_NUMBER = appConfig.whatsappNumber;
