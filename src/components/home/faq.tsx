"use client";

import { useTranslations, useLocale } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/content/faqs";

export function FAQ() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const faqs = getFaqs(locale);

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
