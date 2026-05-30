import { getCarById } from "@/lib/actions/cars";
import { notFound } from "next/navigation";
import { EditCarForm } from "@/components/admin/edit-car-form";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { carAdminFormCopy } from "@/content/business-defaults";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ carId: string }> };

export default async function EditCarPage({ params }: Props) {
  const { carId } = await params;
  const car = await getCarById(carId);
  if (!car) notFound();

  return (
    <div>
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/admin/cars">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {carAdminFormCopy.backToCars}
        </Link>
      </Button>
      <EditCarForm car={car} />
    </div>
  );
}
