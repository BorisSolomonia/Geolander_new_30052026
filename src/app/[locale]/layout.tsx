import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SupportBar } from "@/components/layout/support-bar";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { getSiteSettings } from "@/lib/site-settings";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings(),
  ]);
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: settings.organization_name || settings.site_name,
    url: settings.site_url,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address,
    image: settings.organization_logo_url || undefined,
    sameAs: [settings.instagram, settings.facebook].filter(Boolean),
    hasMap: settings.office_google_maps_url || undefined,
  };

  return (
    <html lang={locale} dir={locale === "he" || locale === "ar" ? "rtl" : "ltr"} className={geistSans.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider>
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationJsonLd),
              }}
            />
            <SupportBar />
            <Navigation />
            <main className="min-h-[calc(100vh-200px)]">{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
