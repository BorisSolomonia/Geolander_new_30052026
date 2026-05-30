import { getTestimonials } from "@/lib/actions/settings";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return <TestimonialsManager testimonials={testimonials} />;
}
