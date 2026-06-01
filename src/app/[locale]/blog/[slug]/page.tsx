import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo-server";
import { getSiteSettings } from "@/lib/site-settings";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getPostBySlug, localized } from "@/content/blog/posts";
import { ComparisonArticle } from "@/components/blog/comparison-article";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

// Map a post slug to its body component.
const BODY_BY_SLUG: Record<
  string,
  (props: { locale: string }) => React.ReactNode
> = {
  "geolander-vs-local-rent-vs-premium-auto-rent": ComparisonArticle,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return getSeoMetadata(
    `/blog/${slug}`,
    locale,
    localized(post.title, locale),
    localized(post.description, locale)
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const post = getPostBySlug(slug);
  const Body = BODY_BY_SLUG[slug];
  if (!post || !Body) notFound();

  const settings = await getSiteSettings();
  const baseUrl = (settings.site_url || "https://geo-lander.com").replace(/\/$/, "");
  const prefix = locale === "en" ? "" : `/${locale}`;
  const url = `${baseUrl}${prefix}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${baseUrl}${post.image}`;
  const title = localized(post.title, locale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description: localized(post.description, locale),
    image: imageUrl,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: locale,
    author: { "@type": "Organization", name: post.author, url: baseUrl },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: `${baseUrl}${prefix}/` },
      { "@type": "ListItem", position: 2, name: t("blog.title"), item: `${baseUrl}${prefix}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("blog.title"), href: "/blog" },
          { label: title },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        {title}
      </h1>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={post.image}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="mt-8">
        <Body locale={locale} />
      </div>
    </article>
  );
}
