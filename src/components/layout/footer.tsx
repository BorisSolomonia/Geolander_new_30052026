import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { MapPin, MessageCircle, Mail, Instagram, Facebook } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { getSiteSettings } from "@/lib/site-settings";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";

export async function Footer() {
  const [t, settings] = await Promise.all([getTranslations(), getSiteSettings()]);
  const siteTitle = settings.site_name;
  const email = settings.email;
  const address = settings.address;
  const instagramUrl = settings.instagram;
  const facebookUrl = settings.facebook;

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center">
              <div className="rounded-lg bg-white p-1.5 inline-block">
                <Image
                  src="/logo.png"
                  alt={siteTitle}
                  width={130}
                  height={44}
                  className="h-11 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {t("footer.contactInfo")}
            </h3>
            <ul className="space-y-3">
              <li>
                {settings.office_google_maps_url ? (
                  <a
                    href={settings.office_google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{address}</span>
                  </a>
                ) : (
                  <div className="flex items-start gap-2.5 text-sm text-white/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{address}</span>
                  </div>
                )}
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(settings.whatsapp_number, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
                  {settings.whatsapp_number}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              {t("footer.followUs")}
            </h3>
            <div className="flex gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {siteTitle}.{" "}
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
