import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { appConfig } from "@/lib/app-config";

export const routing = defineRouting({
  locales: appConfig.locales,
  defaultLocale: appConfig.defaultLocale,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
