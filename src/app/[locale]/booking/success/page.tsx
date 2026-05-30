import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function BookingSuccessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">{t("successTitle")}</h1>
          <p className="mt-2 text-muted-foreground">
            {t("successMessage")}
          </p>
          <Button asChild className="mt-6">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("backToHome")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
