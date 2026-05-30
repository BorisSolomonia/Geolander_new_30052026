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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
