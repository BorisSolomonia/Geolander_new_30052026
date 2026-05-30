"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import { Car, CalendarDays, MessageCircle, MapPinned } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Car, titleKey: "step1Title", descKey: "step1Desc" },
  { icon: CalendarDays, titleKey: "step2Title", descKey: "step2Desc" },
  { icon: MessageCircle, titleKey: "step3Title", descKey: "step3Desc" },
  { icon: MapPinned, titleKey: "step4Title", descKey: "step4Desc" },
];

export function RentalProcess() {
  const t = useTranslations("process");

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line - desktop only */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0.5 bg-border lg:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-white">
                <step.icon className="h-7 w-7 text-navy" />
              </div>
              <div className="absolute left-1/2 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-2 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                {i + 1}
              </div>
              <h3 className="mt-5 font-semibold text-foreground">
                {t(step.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
