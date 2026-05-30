"use client";

import { SectionHeader } from "@/components/shared/section-header";
import {
  Mountain,
  Wine,
  Church,
  Waves,
} from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  {
    icon: Mountain,
    title: "Kazbegi & Gudauri",
    desc: "Dramatic mountain passes, the iconic Gergeti Trinity Church, and world-class skiing",
  },
  {
    icon: Wine,
    title: "Kakheti Wine Region",
    desc: "8,000 years of winemaking tradition, charming hilltop towns, and ancient monasteries",
  },
  {
    icon: Church,
    title: "Ancient Heritage",
    desc: "UNESCO World Heritage sites, cave monasteries, and centuries-old fortresses",
  },
  {
    icon: Waves,
    title: "Black Sea Coast",
    desc: "Vibrant Batumi, subtropical gardens, and historic fortresses along the coast",
  },
];

export function ValueProps() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Discover Georgia by Car"
          subtitle="From the snow-capped Caucasus Mountains to the Black Sea coast, Georgia is best explored at your own pace"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-gold/50 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                <dest.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">
                {dest.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {dest.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
