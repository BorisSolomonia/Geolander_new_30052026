"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export function FAQ() {
  const t = useTranslations("faq");

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
