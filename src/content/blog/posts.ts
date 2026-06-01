// Blog post registry. Metadata only — the article body is rendered by a
// matching component in src/components/blog/ keyed on `slug`.
// Each post is fully locale-aware (en + ka). Add new posts by appending here
// and adding a body branch in the article component.

export type LocalizedText = Record<string, string>;

export type BlogPost = {
  slug: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  image: string; // root-relative or absolute
  author: string;
  title: LocalizedText;
  description: LocalizedText; // meta description
  excerpt: LocalizedText; // card/teaser text
};

export const blogPosts: BlogPost[] = [
  {
    slug: "geolander-vs-local-rent-vs-premium-auto-rent",
    datePublished: "2026-06-01",
    dateModified: "2026-06-01",
    image: "/cars/subaru-forester-ee346el/1.jpg",
    author: "Geolander",
    title: {
      en: "Geolander vs Local Rent vs Premium Auto Rent: Car Rental in Georgia Compared (2026)",
      ka: "Geolander vs Local Rent vs Premium Auto Rent: მანქანის გაქირავება საქართველოში შედარებით (2026)",
    },
    description: {
      en: "An honest 2026 comparison of car rental in Georgia: Geolander vs Local Rent vs Premium Auto Rent — free airport delivery, 4x4 mountain fleet, 24/7 support and pricing compared.",
      ka: "მანქანის გაქირავების გულწრფელი შედარება საქართველოში 2026: Geolander vs Local Rent vs Premium Auto Rent — უფასო მიწოდება აეროპორტში, 4x4 ავტოპარკი, 24/7 მხარდაჭერა და ფასები.",
    },
    excerpt: {
      en: "Which car rental should a tourist in Georgia choose? We compare Geolander, Local Rent and Premium Auto Rent on delivery, fleet, support and accountability.",
      ka: "რომელი მანქანის გაქირავება აირჩიოს ტურისტმა საქართველოში? ვადარებთ Geolander-ს, Local Rent-სა და Premium Auto Rent-ს მიწოდების, ავტოპარკის და მხარდაჭერის მიხედვით.",
    },
  },
];

export function getAllPosts(): BlogPost[] {
  // Newest first.
  return [...blogPosts].sort((a, b) =>
    a.datePublished < b.datePublished ? 1 : -1
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function localized(text: LocalizedText, locale: string): string {
  return text[locale] ?? text.en ?? Object.values(text)[0] ?? "";
}
