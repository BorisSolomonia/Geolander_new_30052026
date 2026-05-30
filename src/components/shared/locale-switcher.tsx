"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeNames: Record<string, string> = {
  en: "English",
  ka: "ქართული",
  he: "עברית",
  ar: "العربية",
};

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale as "en" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-sm font-medium focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
        >
          <Globe className="h-4 w-4" />
          <span className="uppercase">{currentLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={`cursor-pointer ${
              locale === currentLocale ? "text-primary font-semibold" : "text-foreground"
            }`}
          >
            {localeNames[locale] || locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
