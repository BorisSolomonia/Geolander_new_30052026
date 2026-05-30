import { getCars } from "@/lib/actions/cars";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCarsPage() {
  const cars = await getCars();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cars</h1>
          <p className="text-muted-foreground">{cars.length} cars in fleet</p>
        </div>
        <Button asChild className="bg-navy hover:bg-navy-dark">
          <Link href="/admin/cars/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Car
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>From/Day</TableHead>
              <TableHead>Transmission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">
                  {car.brand} {car.model}
                </TableCell>
                <TableCell>{car.registrationNumber}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{formatCurrency(car.pricePerDay)}</TableCell>
                <TableCell className="capitalize">{car.transmission}</TableCell>
                <TableCell>
                  <Badge
                    variant={car.available ? "default" : "secondary"}
                    className={
                      car.available ? "bg-green-100 text-green-700" : ""
                    }
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/cars/${car.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
