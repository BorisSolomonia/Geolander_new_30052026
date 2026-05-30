import { getTranslations } from "next-intl/server";
import { getTestimonials } from "@/lib/actions/settings";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export async function TestimonialsSection() {
  const t = await getTranslations("testimonials");
  const testimonials = await getTestimonials(true);

  if (testimonials.length === 0) return null;

  return (
    <section className="bg-muted/50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                <Quote className="mb-3 h-8 w-8 text-gold/30" />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.textEn}&rdquo;
                </p>
                <div className="mt-4 border-t pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  {testimonial.route && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.route}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
