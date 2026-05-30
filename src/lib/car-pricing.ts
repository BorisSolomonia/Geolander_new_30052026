export const pricingTierKeys = [
  "days1To2",
  "days3To4",
  "days5To7",
  "days8To12",
  "days13To18",
  "days19To30",
  "days31Plus",
] as const;

export type PricingTierKey = (typeof pricingTierKeys)[number];

export type CarPricingTiers = Record<PricingTierKey, number>;

export type CarSeasonalPricing = {
  season: number;
  period: string;
  prices: CarPricingTiers;
};

export type CarPricingDateContext = {
  startDate: string;
  totalDays: number;
};

export const pricingTierMetadata: Array<{
  key: PricingTierKey;
  minDays: number;
  maxDays: number | null;
}> = [
  { key: "days1To2", minDays: 1, maxDays: 2 },
  { key: "days3To4", minDays: 3, maxDays: 4 },
  { key: "days5To7", minDays: 5, maxDays: 7 },
  { key: "days8To12", minDays: 8, maxDays: 12 },
  { key: "days13To18", minDays: 13, maxDays: 18 },
  { key: "days19To30", minDays: 19, maxDays: 30 },
  { key: "days31Plus", minDays: 31, maxDays: null },
] as const;

function getTierKeyForDays(totalDays: number): PricingTierKey {
  const tier =
    pricingTierMetadata.find(({ minDays, maxDays }) => {
      if (totalDays < minDays) return false;
      return maxDays === null ? true : totalDays <= maxDays;
    }) ?? pricingTierMetadata[pricingTierMetadata.length - 1];

  return tier.key;
}

function getMonthDayValue(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  if (!year || !month || !day) return null;

  return { month, day, value: month * 100 + day };
}

function getSeasonForDate(
  pricing: CarSeasonalPricing[],
  startDate: string
): CarSeasonalPricing | null {
  const parsedDate = getMonthDayValue(startDate);
  if (!parsedDate) return null;

  for (const season of pricing) {
    const [startLabel, endLabel] = season.period.split(" - ");
    if (!startLabel || !endLabel) continue;

    const start = new Date(`${startLabel} 2000`);
    const end = new Date(`${endLabel} 2000`);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) continue;

    const startValue = (start.getMonth() + 1) * 100 + start.getDate();
    const endValue = (end.getMonth() + 1) * 100 + end.getDate();

    if (startValue <= endValue) {
      if (parsedDate.value >= startValue && parsedDate.value <= endValue) {
        return season;
      }
    } else if (
      parsedDate.value >= startValue ||
      parsedDate.value <= endValue
    ) {
      return season;
    }
  }

  return pricing[0] ?? null;
}

export function getMinimumSeasonalRate(pricing: CarSeasonalPricing[]) {
  const allRates = pricing.flatMap((season) =>
    pricingTierKeys.map((key) => season.prices[key])
  );
  const validRates = allRates.filter(
    (rate) => typeof rate === "number" && Number.isFinite(rate) && rate > 0
  );

  return validRates.length > 0 ? Math.min(...validRates) : 0;
}

export function getSeasonalDailyRate(
  pricing: CarSeasonalPricing[],
  context: CarPricingDateContext
) {
  const season = getSeasonForDate(pricing, context.startDate);
  if (!season) return null;

  const tierKey = getTierKeyForDays(context.totalDays);
  const rate = season.prices[tierKey];

  if (!Number.isFinite(rate) || rate <= 0) return null;

  return {
    rate,
    tierKey,
    season,
  };
}
