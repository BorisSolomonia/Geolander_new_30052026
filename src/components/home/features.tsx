"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import { Truck, DollarSign, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Truck, titleKey: "freeDelivery", descKey: "freeDeliveryDesc" },
  {
    icon: DollarSign,
    titleKey: "allInclusive",
    descKey: "allInclusiveDesc",
  },
  {
    icon: MapPin,
    titleKey: "localExpertise",
    descKey: "localExpertiseDesc",
  },
  {
    icon: Calendar,
    titleKey: "flexibleBooking",
    descKey: "flexibleBookingDesc",
  },
];

export function Features() {
  const t = useTranslations("features");

  return (
    <section className="bg-muted/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/10">
                <feature.icon className="h-6 w-6 text-navy" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">
                {t(feature.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
