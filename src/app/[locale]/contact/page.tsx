import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import { getSeoMetadata } from "@/lib/seo-server";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return getSeoMetadata("/contact", locale, t("title"), t("subtitle"));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const settings = await getSiteSettings();

  const contactMethods = [
    {
      icon: MessageCircle,
      title: t("whatsapp"),
      value: settings.whatsapp_number,
      href: buildWhatsAppUrl(settings.whatsapp_number, ""),
      color: "bg-green-500/10 text-green-400 border border-green-500/20",
    },
    {
      icon: Phone,
      title: t("phone"),
      value: settings.phone,
      href: buildWhatsAppUrl(settings.whatsapp_number, ""),
      color: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    },
    {
      icon: Mail,
      title: t("email"),
      value: settings.email,
      href: `mailto:${settings.email}`,
      color: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contactMethods.map((method) => (
          <a
            key={method.title}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={
              method.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="block"
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${method.color}`}
                >
                  <method.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold">{method.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {method.value}
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{t("hours")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {settings.business_hours}
              </p>
            </div>
          </CardContent>
        </Card>
        {settings.office_google_maps_url ? (
          <a
            href={settings.office_google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("address")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground underline underline-offset-4 decoration-primary/40">
                    {settings.office_name || settings.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        ) : (
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t("address")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {settings.address}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
