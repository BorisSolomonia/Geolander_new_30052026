import { getTranslations } from "next-intl/server";
import { getBookingStats } from "@/lib/actions/bookings";
import { getCars } from "@/lib/actions/cars";
import { StatsCard } from "@/components/admin/stats-card";
import { CalendarCheck, Clock, DollarSign, Car } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const t = await getTranslations("admin");
  const stats = await getBookingStats();
  const cars = await getCars();

  return (
    <div>
      <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
      <p className="mt-1 text-muted-foreground">
        Overview of your rental business
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("totalBookings")}
          value={stats.totalBookings}
          icon={CalendarCheck}
        />
        <StatsCard
          title={t("pendingBookings")}
          value={stats.pendingBookings}
          icon={Clock}
          description="Awaiting response"
        />
        <StatsCard
          title={t("totalRevenue")}
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
        />
        <StatsCard
          title={t("activeCars")}
          value={cars.filter((c) => c.available).length}
          icon={Car}
          description={`${cars.length} total`}
        />
      </div>
    </div>
  );
}
