import { setRequestLocale, getTranslations } from "next-intl/server";
import { getMusicGenres } from "@/lib/actions/music";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Music, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "music" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function MusicPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("music");
  const genres = await getMusicGenres();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-8 md:grid-cols-2">
        {genres.map((genre) => (
          <Card key={genre.id} className="overflow-hidden">
            {genre.images.length > 0 && (
              <div className="relative aspect-video">
                <Image
                  src={genre.images[0]}
                  alt={genre.nameEn}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold">
                  {locale === "ka" && genre.nameKa
                    ? genre.nameKa
                    : genre.nameEn}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {locale === "ka" && genre.descriptionKa
                  ? genre.descriptionKa
                  : genre.descriptionEn}
              </p>

              {genre.youtubeLinks.length > 0 ? (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">{t("listenOn")}</p>
                  {genre.youtubeLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md border border-border p-2 text-sm transition-colors hover:bg-muted"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-red-100">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 text-red-600"
                          fill="currentColor"
                        >
                          <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                        </svg>
                      </span>
                      <span className="flex-1 truncate">{link}</span>
                      <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm italic text-muted-foreground">
                  {t("noLinks")}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
