import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo-server";
import { getSiteSettings } from "@/lib/site-settings";
import { SectionHeader } from "@/components/shared/section-header";
import { getAllPosts, localized } from "@/content/blog/posts";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return getSeoMetadata("/blog", locale, t("title"), t("subtitle"));
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const settings = await getSiteSettings();
  const baseUrl = (settings.site_url || "https://geo-lander.com").replace(/\/$/, "");
  const prefix = locale === "en" ? "" : `/${locale}`;
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}${prefix}/blog#blog`,
    name: t("title"),
    description: t("subtitle"),
    url: `${baseUrl}${prefix}/blog`,
    publisher: { "@id": `${baseUrl}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: localized(post.title, locale),
      url: `${baseUrl}${prefix}/blog/${post.slug}`,
      datePublished: post.datePublished,
      image: post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`,
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.image}
                alt={localized(post.title, locale)}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                {localized(post.title, locale)}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                {localized(post.excerpt, locale)}
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-primary">
                {t("readArticle")} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
