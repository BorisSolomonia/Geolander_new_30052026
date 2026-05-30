import { getCoupons } from "@/lib/actions/coupons";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const couponList = await getCoupons();

  return (
    <div>
      <h1 className="text-2xl font-bold">Coupons</h1>
      <p className="text-muted-foreground">
        {couponList.length} discount codes
      </p>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Valid Period</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couponList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No coupons yet
                </TableCell>
              </TableRow>
            ) : (
              couponList.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-mono font-medium">
                    {coupon.code}
                  </TableCell>
                  <TableCell>{coupon.discountPercent}%</TableCell>
                  <TableCell>
                    {coupon.currentUses}
                    {coupon.maxUses ? ` / ${coupon.maxUses}` : ""}
                  </TableCell>
                  <TableCell className="text-sm">
                    {coupon.validFrom || "Any"} - {coupon.validUntil || "Any"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        coupon.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {coupon.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
