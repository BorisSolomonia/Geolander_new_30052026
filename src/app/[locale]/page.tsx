import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { AssuranceStrip } from "@/components/home/assurance-strip";
import { FleetPreview } from "@/components/home/fleet-preview";
import { Features } from "@/components/home/features";
import { ValueProps } from "@/components/home/value-props";
import { RentalProcess } from "@/components/home/rental-process";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo-server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return getSeoMetadata("/", locale, t("homeTitle"), t("homeDescription"));
}

const faqs = [
  {
    q: "What documents do I need to rent a car?",
    a: "You need a valid driver's license (international license recommended for non-Georgian licenses), passport, and a credit or debit card. Minimum age is 21 years.",
  },
  {
    q: "Is insurance included in the rental price?",
    a: "Yes, basic insurance is included in all our rental prices. This covers third-party liability and collision damage with a deductible. Additional full coverage options are available.",
  },
  {
    q: "Can I pick up the car at Tbilisi Airport?",
    a: "Absolutely! We offer free delivery and pickup at Tbilisi International Airport (TBS). Just provide your flight details and we'll be waiting for you.",
  },
  {
    q: "What fuel policy do you have?",
    a: "We operate a full-to-full fuel policy. You receive the car with a full tank and should return it full. If returned without a full tank, a refueling fee applies.",
  },
  {
    q: "Can I drive to neighboring countries?",
    a: "Cross-border travel requires prior arrangement and additional documentation. Please contact us in advance to discuss your travel plans to Armenia, Azerbaijan, or Turkey.",
  },
  {
    q: "What happens if the car breaks down?",
    a: "We provide 24/7 roadside assistance. If anything happens, call our support number and we'll arrange help immediately, including a replacement vehicle if needed.",
  },
  {
    q: "How do I book a car?",
    a: "Simply browse our fleet, select your dates, and send us a booking request via WhatsApp. We'll confirm availability and finalize your reservation within minutes.",
  },
  {
    q: "Is there a cancellation policy?",
    a: "Free cancellation up to 24 hours before your pickup time. Cancellations within 24 hours may incur a fee equal to one day's rental.",
  },
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Hero />
      <AssuranceStrip />
      <Suspense
        fallback={
          <div className="py-20 text-center text-muted-foreground">
            Loading fleet...
          </div>
        }
      >
        <FleetPreview />
      </Suspense>
      <Features />
      <ValueProps />
      <RentalProcess />
      <Suspense
        fallback={
          <div className="py-20 text-center text-muted-foreground">
            Loading testimonials...
          </div>
        }
      >
        <TestimonialsSection />
      </Suspense>
      <FAQ />
      <CTA />
    </>
  );
}
