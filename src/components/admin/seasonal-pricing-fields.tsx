"use client";

import type { CarFormValues } from "@/lib/validations/car";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  carAdminFormCopy,
  seasonalPricingFieldLabels,
} from "@/content/business-defaults";

type SeasonalPricingFieldsProps = {
  register: UseFormRegister<CarFormValues>;
  errors: FieldErrors<CarFormValues>;
  seasons: CarFormValues["pricing"];
};

export function SeasonalPricingFields({
  register,
  errors,
  seasons,
}: SeasonalPricingFieldsProps) {
  const pricingSeasons = seasons ?? [];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">{carAdminFormCopy.seasonalPricingTitle}</h3>
        {errors.pricing?.message ? (
          <p className="mt-1 text-sm text-destructive">
            {String(errors.pricing.message)}
          </p>
        ) : null}
      </div>

      {pricingSeasons.map((season, seasonIndex) => (
        <Card key={season.season}>
          <CardHeader>
            <CardTitle>Season {season.season}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`pricing.${seasonIndex}.period`}>
                {carAdminFormCopy.pricingPeriodLabel}
              </Label>
              <Input
                id={`pricing.${seasonIndex}.period`}
                {...register(`pricing.${seasonIndex}.period`)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {seasonalPricingFieldLabels.map((field) => (
                <div key={field.key}>
                  <Label htmlFor={`pricing.${seasonIndex}.prices.${field.key}`}>
                    {field.label}
                  </Label>
                  <Input
                    id={`pricing.${seasonIndex}.prices.${field.key}`}
                    type="number"
                    {...register(
                      `pricing.${seasonIndex}.prices.${field.key}` as const,
                      { valueAsNumber: true }
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
