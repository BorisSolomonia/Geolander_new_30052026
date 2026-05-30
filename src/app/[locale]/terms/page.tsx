import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import type { Metadata } from "next";
import { appConfig } from "@/lib/app-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return { title: t("title") };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="prose prose-slate max-w-none">
        <h3>1. Rental Requirements</h3>
        <ul>
          <li>Minimum age: 21 years</li>
          <li>Valid driving license (international license recommended for non-Georgian licenses)</li>
          <li>Valid passport or national ID</li>
          <li>Credit or debit card for security deposit</li>
        </ul>

        <h3>2. Insurance</h3>
        <p>
          Basic insurance (CDW - Collision Damage Waiver) is included in all rental prices. This covers
          third-party liability and collision damage with a deductible. Additional full coverage insurance
          is available for an extra fee.
        </p>

        <h3>3. Fuel Policy</h3>
        <p>
          Vehicles are provided with a full tank of fuel and must be returned with a full tank. If the
          vehicle is returned with less fuel, a refueling charge will apply.
        </p>

        <h3>4. Mileage</h3>
        <p>All rentals include unlimited mileage within Georgia.</p>

        <h3>5. Cancellation Policy</h3>
        <ul>
          <li>Free cancellation up to 24 hours before pickup time</li>
          <li>Cancellations within 24 hours: one day rental charge applies</li>
          <li>No-show: full rental period charge applies</li>
        </ul>

        <h3>6. Cross-Border Travel</h3>
        <p>
          Travel outside Georgia requires prior written approval and may incur additional insurance fees.
          Please contact us at least 48 hours before your intended departure to arrange necessary
          documentation.
        </p>

        <h3>7. Vehicle Return</h3>
        <ul>
          <li>Vehicles must be returned to the agreed location at the agreed time</li>
          <li>Late returns may incur additional charges</li>
          <li>The vehicle must be returned in the same condition as received</li>
        </ul>

        <h3>8. Prohibited Uses</h3>
        <ul>
          <li>Off-road driving (unless vehicle is specifically approved)</li>
          <li>Driving under the influence of alcohol or drugs</li>
          <li>Sub-renting or lending the vehicle to unauthorized drivers</li>
          <li>Participation in races or speed tests</li>
        </ul>

        <h3>9. Liability</h3>
        <p>
          The renter is responsible for any traffic violations, parking fines, or toll charges incurred
          during the rental period. The renter is liable for damage exceeding the insurance deductible.
        </p>

        <h3>10. Contact</h3>
        <p>
          For any questions about these terms, please contact us via WhatsApp or email at
          {" "}{appConfig.supportEmail}.
        </p>
      </div>
    </div>
  );
}
