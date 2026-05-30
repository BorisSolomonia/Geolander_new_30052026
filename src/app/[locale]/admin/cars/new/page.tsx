"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, type CarFormValues } from "@/lib/validations/car";
import { createCar } from "@/lib/actions/cars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import {
  carAdminFormCopy,
  fuelTypeOptions,
  transmissionOptions,
} from "@/content/business-defaults";
import { defaultFleetCars } from "@/content/fleet-cars";
import { SeasonalPricingFields } from "@/components/admin/seasonal-pricing-fields";
import { ImageUploadField } from "@/components/admin/image-upload-field";

const defaultPricing = defaultFleetCars[0]?.pricing ?? [];

export default function NewCarPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: "",
      model: "",
      registrationNumber: "",
      year: new Date().getFullYear(),
      color: "",
      bodyType: "",
      licenseCategory: "B",
      pricePerDay: 0,
      seats: 5,
      transmission: "automatic",
      fuelType: "gasoline",
      pricing: defaultPricing,
      features: [],
      images,
      descriptionEn: "",
      descriptionKa: "",
      available: true,
      sortOrder: 0,
    },
  });

  const onSubmit = async (data: CarFormValues) => {
    try {
      await createCar({ ...data, images });
      toast.success(carAdminFormCopy.createSuccess);
      router.push("/admin/cars");
      router.refresh();
    } catch {
      toast.error(carAdminFormCopy.createError);
    }
  };

  return (
    <div>
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/admin/cars">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {carAdminFormCopy.backToCars}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{carAdminFormCopy.addNewCarTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="brand">{carAdminFormCopy.brandLabel}</Label>
                <Input id="brand" {...register("brand")} />
                {errors.brand && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="model">{carAdminFormCopy.modelLabel}</Label>
                <Input id="model" {...register("model")} />
                {errors.model && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.model.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="registrationNumber">
                  {carAdminFormCopy.registrationLabel}
                </Label>
                <Input
                  id="registrationNumber"
                  {...register("registrationNumber")}
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="licenseCategory">
                  {carAdminFormCopy.licenseCategoryLabel}
                </Label>
                <Input id="licenseCategory" {...register("licenseCategory")} />
                {errors.licenseCategory && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.licenseCategory.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="year">{carAdminFormCopy.yearLabel}</Label>
                <Input
                  id="year"
                  type="number"
                  {...register("year", { valueAsNumber: true })}
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.year.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="color">{carAdminFormCopy.colorLabel}</Label>
                <Input id="color" {...register("color")} />
                {errors.color && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.color.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="bodyType">{carAdminFormCopy.bodyTypeLabel}</Label>
                <Input id="bodyType" {...register("bodyType")} />
                {errors.bodyType && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.bodyType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="seats">{carAdminFormCopy.seatsLabel}</Label>
                <Input
                  id="seats"
                  type="number"
                  {...register("seats", { valueAsNumber: true })}
                />
                {errors.seats && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.seats.message}
                  </p>
                )}
              </div>
              <div>
                <Label>{carAdminFormCopy.transmissionLabel}</Label>
                <Select
                  defaultValue="automatic"
                  onValueChange={(value) =>
                    setValue("transmission", value as "automatic" | "manual")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.transmission && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.transmission.message}
                  </p>
                )}
              </div>
              <div>
                <Label>{carAdminFormCopy.fuelTypeLabel}</Label>
                <Select
                  defaultValue="gasoline"
                  onValueChange={(value) =>
                    setValue(
                      "fuelType",
                      value as "gasoline" | "diesel" | "electric" | "hybrid"
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fuelType && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.fuelType.message}
                  </p>
                )}
              </div>
            </div>

            <SeasonalPricingFields
              register={register}
              errors={errors}
              seasons={defaultPricing}
            />

            <ImageUploadField
              label="Car Images (Max 5)"
              folder="cars"
              values={images}
              maxImages={5}
              onChange={(nextImages) => {
                setImages(nextImages);
                setValue("images", nextImages, { shouldDirty: true });
              }}
            />
            {errors.images && (
              <p className="mt-1 text-sm text-destructive">
                {errors.images.message}
              </p>
            )}

            <div>
              <Label htmlFor="descriptionEn">
                {carAdminFormCopy.descriptionEnLabel}
              </Label>
              <Textarea id="descriptionEn" {...register("descriptionEn")} />
              {errors.descriptionEn && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.descriptionEn.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="descriptionKa">
                {carAdminFormCopy.descriptionKaLabel}
              </Label>
              <Textarea id="descriptionKa" {...register("descriptionKa")} />
              {errors.descriptionKa && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.descriptionKa.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="sortOrder">{carAdminFormCopy.sortOrderLabel}</Label>
              <Input
                id="sortOrder"
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
              />
              {errors.sortOrder && (
                <p className="mt-1 text-sm text-destructive">
                  {errors.sortOrder.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {carAdminFormCopy.createCarButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
