export function getLocalizedValue(
  key: string,
  locale: string,
  fallbackEn: string,
  fallbackKa: string,
  t?: { has: (key: string) => boolean; (key: string): string }
): string {
  if (t && typeof t.has === "function" && t.has(key)) {
    return t(key);
  }
  if (locale === "ka") {
    return fallbackKa || fallbackEn;
  }
  return fallbackEn;
}
