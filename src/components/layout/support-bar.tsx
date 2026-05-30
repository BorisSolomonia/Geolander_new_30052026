import { MessageCircle, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/site-settings";

export async function SupportBar() {
  const [t, settings] = await Promise.all([
    getTranslations("supportBar"),
    getSiteSettings(),
  ]);
  const displayPhone = settings.whatsapp_number;
  const whatsappHref = buildWhatsAppUrl(settings.whatsapp_number, "");

  return (
    <div className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>{t("availableNow")}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-gold-light font-medium"
          >
            <MessageCircle className="h-3.5 w-3.5 text-gold-light" />
            <span>{displayPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
