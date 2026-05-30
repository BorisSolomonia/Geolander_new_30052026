import { getRegionsWithLocations } from "@/lib/actions/places";
import { PlacesManager } from "@/components/admin/places-manager";

export const dynamic = "force-dynamic";

export default async function AdminPlacesPage() {
  const regions = await getRegionsWithLocations();

  return <PlacesManager regions={regions} />;
}
