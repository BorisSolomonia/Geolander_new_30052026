import { getFuelStations, getMarkets } from "@/lib/actions/travel-info";
import { TravelInfoManager } from "@/components/admin/travel-info-manager";

export const dynamic = "force-dynamic";

export default async function AdminTravelInfoPage() {
  const stations = await getFuelStations();
  const marketsList = await getMarkets();

  return <TravelInfoManager stations={stations} markets={marketsList} />;
}
