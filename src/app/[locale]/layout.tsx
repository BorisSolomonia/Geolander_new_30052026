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
  const baseUrl = (settings.site_url || "https://geo-lander.com").replace(/\/$/, "");
  const logoUrl = settings.organization_logo_url
    ? (settings.organization_logo_url.startsWith("http")
        ? settings.organization_logo_url
        : `${baseUrl}${settings.organization_logo_url}`)
    : undefined;

  const rating = parseFloat(settings.google_rating);
  const reviewCount = parseInt(settings.google_review_count, 10);
  const hasRating = !Number.isNaN(rating) && !Number.isNaN(reviewCount) && reviewCount > 0;

  const lat = parseFloat(settings.office_latitude);
  const lng = parseFloat(settings.office_longitude);
  const hasGeo = !Number.isNaN(lat) && !Number.isNaN(lng);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${baseUrl}/#organization`,
    name: settings.organization_name || settings.site_name,
    description: settings.seo_description || settings.site_description,
    url: settings.site_url,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    image: logoUrl,
    logo: logoUrl,
    priceRange: settings.price_range || "$$",
    currenciesAccepted: "USD, GEL, EUR",
    paymentAccepted: "Cash, Credit Card",
    knowsLanguage: ["en", "ka"],
    areaServed: [
      { "@type": "Country", name: "Georgia" },
      { "@type": "City", name: "Tbilisi" },
      { "@type": "Place", name: "Kazbegi" },
      { "@type": "Place", name: "Svaneti" },
      { "@type": "Place", name: "Batumi" },
      { "@type": "Place", name: "Kutaisi" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    ...(hasGeo
      ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } }
      : {}),
    ...(hasRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    sameAs: [settings.facebook].filter(Boolean),
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
