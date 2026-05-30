import type { Metadata } from "next";
import "./globals.css";
import { appConfig } from "@/lib/app-config";
import { getSiteSettings } from "@/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const metadataBase = settings.site_url || appConfig.siteUrl;
  return {
    title: {
      default: settings.seo_title || `${settings.site_name} - Premium Car Rental in Georgia`,
      template: `%s | ${settings.site_name || appConfig.siteName}`,
    },
    description: settings.seo_description || appConfig.seoDescription,
    metadataBase: new URL(metadataBase),
    openGraph: {
      type: "website",
      siteName: settings.organization_name || settings.site_name || appConfig.siteName,
      locale: "en_US",
      description: settings.seo_description || appConfig.seoDescription,
      images: settings.seo_og_image_url ? [settings.seo_og_image_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo_title || `${settings.site_name} - Premium Car Rental in Georgia`,
      description: settings.seo_description || appConfig.seoDescription,
      images: settings.seo_og_image_url ? [settings.seo_og_image_url] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
