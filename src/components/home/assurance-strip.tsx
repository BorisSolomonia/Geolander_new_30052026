"use client";

import {
  Shield,
  MapPin,
  Phone,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import { homepageBusinessContent } from "@/content/business-defaults";

const items = [
  { icon: Shield, label: homepageBusinessContent.assuranceItems[0] },
  { icon: MapPin, label: homepageBusinessContent.assuranceItems[1] },
  { icon: Phone, label: homepageBusinessContent.assuranceItems[2] },
  { icon: CreditCard, label: homepageBusinessContent.assuranceItems[3] },
];

export function AssuranceStrip() {
  return (
    <section className="border-b border-border bg-card/50 py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
