import { appConfig, defaultSiteSettings } from "@/lib/app-config";
import { pricingTierMetadata } from "@/lib/car-pricing";

export type SiteSettingKey = keyof typeof defaultSiteSettings;

export const seededSiteSettings: Array<{
  key: SiteSettingKey;
  value: string;
}> = [
  { key: "site_name", value: defaultSiteSettings.site_name },
  { key: "site_description", value: defaultSiteSettings.site_description },
  { key: "seo_title", value: defaultSiteSettings.seo_title },
  { key: "seo_description", value: defaultSiteSettings.seo_description },
  { key: "site_url", value: defaultSiteSettings.site_url },
  { key: "whatsapp_number", value: defaultSiteSettings.whatsapp_number },
  { key: "business_hours", value: defaultSiteSettings.business_hours },
  { key: "phone", value: defaultSiteSettings.phone },
  { key: "email", value: defaultSiteSettings.email },
  { key: "address", value: defaultSiteSettings.address },
  { key: "office_name", value: defaultSiteSettings.office_name },
  {
    key: "office_google_maps_url",
    value: defaultSiteSettings.office_google_maps_url,
  },
  { key: "office_latitude", value: defaultSiteSettings.office_latitude },
  { key: "office_longitude", value: defaultSiteSettings.office_longitude },
  { key: "instagram", value: defaultSiteSettings.instagram },
  { key: "facebook", value: defaultSiteSettings.facebook },
  {
    key: "organization_name",
    value: defaultSiteSettings.organization_name,
  },
  {
    key: "organization_logo_url",
    value: defaultSiteSettings.organization_logo_url,
  },
  {
    key: "seo_og_image_url",
    value: defaultSiteSettings.seo_og_image_url,
  },
  { key: "payment_provider", value: defaultSiteSettings.payment_provider },
  { key: "payment_currency", value: defaultSiteSettings.payment_currency },
  { key: "payment_mode", value: defaultSiteSettings.payment_mode },
  { key: "payment_enabled", value: defaultSiteSettings.payment_enabled },
  { key: "google_rating", value: defaultSiteSettings.google_rating },
  {
    key: "google_review_count",
    value: defaultSiteSettings.google_review_count,
  },
  { key: "price_range", value: defaultSiteSettings.price_range },
];

export const adminSettingsFields: Array<{
  key: SiteSettingKey;
  label: string;
  placeholder: string;
}> = [
  {
    key: "site_name",
    label: "Site Name",
    placeholder: defaultSiteSettings.site_name,
  },
  {
    key: "site_description",
    label: "Site Description",
    placeholder: defaultSiteSettings.site_description,
  },
  {
    key: "seo_title",
    label: "SEO Title",
    placeholder: defaultSiteSettings.seo_title,
  },
  {
    key: "seo_description",
    label: "SEO Description",
    placeholder: defaultSiteSettings.seo_description,
  },
  {
    key: "site_url",
    label: "Canonical Site URL",
    placeholder: defaultSiteSettings.site_url,
  },
  {
    key: "whatsapp_number",
    label: "WhatsApp Number",
    placeholder: defaultSiteSettings.whatsapp_number,
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: defaultSiteSettings.phone,
  },
  {
    key: "email",
    label: "Email",
    placeholder: defaultSiteSettings.email,
  },
  {
    key: "business_hours",
    label: "Business Hours",
    placeholder: defaultSiteSettings.business_hours,
  },
  {
    key: "address",
    label: "Address",
    placeholder: defaultSiteSettings.address,
  },
  {
    key: "office_name",
    label: "Office Name",
    placeholder: defaultSiteSettings.office_name,
  },
  {
    key: "office_google_maps_url",
    label: "Google Maps URL",
    placeholder: defaultSiteSettings.office_google_maps_url,
  },
  {
    key: "office_latitude",
    label: "Office Latitude",
    placeholder: defaultSiteSettings.office_latitude,
  },
  {
    key: "office_longitude",
    label: "Office Longitude",
    placeholder: defaultSiteSettings.office_longitude,
  },
  {
    key: "instagram",
    label: "Instagram URL",
    placeholder: defaultSiteSettings.instagram,
  },
  {
    key: "facebook",
    label: "Facebook URL",
    placeholder: defaultSiteSettings.facebook,
  },
  {
    key: "organization_name",
    label: "Organization Name",
    placeholder: defaultSiteSettings.organization_name,
  },
  {
    key: "organization_logo_url",
    label: "Organization Logo URL",
    placeholder: defaultSiteSettings.organization_logo_url,
  },
  {
    key: "seo_og_image_url",
    label: "Open Graph Image URL",
    placeholder: defaultSiteSettings.seo_og_image_url,
  },
  {
    key: "payment_provider",
    label: "Payment Provider",
    placeholder: defaultSiteSettings.payment_provider,
  },
  {
    key: "payment_currency",
    label: "Payment Currency",
    placeholder: defaultSiteSettings.payment_currency,
  },
  {
    key: "payment_mode",
    label: "Payment Mode",
    placeholder: defaultSiteSettings.payment_mode,
  },
  {
    key: "payment_enabled",
    label: "Payment Enabled",
    placeholder: defaultSiteSettings.payment_enabled,
  },
  {
    key: "google_rating",
    label: "Google Rating (e.g. 4.9) — for review schema",
    placeholder: "4.9",
  },
  {
    key: "google_review_count",
    label: "Google Review Count (e.g. 37) — for review schema",
    placeholder: "37",
  },
  {
    key: "price_range",
    label: "Price Range ($ to $$$$)",
    placeholder: defaultSiteSettings.price_range,
  },
];

export const carAdminFormCopy = {
  backToCars: appConfig.carAdminBackToCars,
  addNewCarTitle: appConfig.carAdminAddNewTitle,
  brandLabel: appConfig.carAdminBrandLabel,
  modelLabel: appConfig.carAdminModelLabel,
  registrationLabel: appConfig.carAdminRegistrationLabel,
  yearLabel: appConfig.carAdminYearLabel,
  colorLabel: appConfig.carAdminColorLabel,
  bodyTypeLabel: appConfig.carAdminBodyTypeLabel,
  licenseCategoryLabel: appConfig.carAdminLicenseCategoryLabel,
  pricePerDayLabel: appConfig.carAdminPricePerDayLabel,
  seatsLabel: appConfig.carAdminSeatsLabel,
  transmissionLabel: appConfig.carAdminTransmissionLabel,
  fuelTypeLabel: appConfig.carAdminFuelTypeLabel,
  descriptionEnLabel: appConfig.carAdminDescriptionEnLabel,
  descriptionKaLabel: appConfig.carAdminDescriptionKaLabel,
  seasonalPricingTitle: appConfig.carAdminSeasonalPricingTitle,
  pricingPeriodLabel: appConfig.carAdminPricingPeriodLabel,
  sortOrderLabel: appConfig.carAdminSortOrderLabel,
  createCarButton: appConfig.carAdminCreateButton,
  editPrefix: appConfig.carAdminEditPrefix,
  deleteButton: appConfig.carAdminDeleteButton,
  deleteConfirm: appConfig.carAdminDeleteConfirm,
  saveChangesButton: appConfig.carAdminSaveChangesButton,
  createSuccess: appConfig.carAdminCreateSuccess,
  createError: appConfig.carAdminCreateError,
  updateSuccess: appConfig.carAdminUpdateSuccess,
  updateError: appConfig.carAdminUpdateError,
  deleteSuccess: appConfig.carAdminDeleteSuccess,
  deleteError: appConfig.carAdminDeleteError,
};

export const seasonalPricingFieldLabels = pricingTierMetadata.map(({ key }) => ({
  key,
  label:
    {
      days1To2: appConfig.carAdminPricingDays1To2Label,
      days3To4: appConfig.carAdminPricingDays3To4Label,
      days5To7: appConfig.carAdminPricingDays5To7Label,
      days8To12: appConfig.carAdminPricingDays8To12Label,
      days13To18: appConfig.carAdminPricingDays13To18Label,
      days19To30: appConfig.carAdminPricingDays19To30Label,
      days31Plus: appConfig.carAdminPricingDays31PlusLabel,
    }[key],
}));

export const transmissionOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
] as const;

export const fuelTypeOptions = [
  { value: "gasoline", label: "Gasoline" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
] as const;

export const businessUiCopy = {
  adminPanelTitle: appConfig.adminPanelTitle,
  siteConfigurationTitle: appConfig.siteConfigurationTitle,
  saveSettingsButton: appConfig.saveSettingsButton,
  saveSettingsSuccess: appConfig.saveSettingsSuccess,
  saveSettingsError: appConfig.saveSettingsError,
  bookingCustomerNamePlaceholder: appConfig.bookingCustomerNamePlaceholder,
  bookingCustomerPhonePlaceholder: appConfig.supportPhone,
  whatsappLeadMessage: appConfig.whatsappLeadMessageTemplate.replace(
    "{siteName}",
    appConfig.siteName
  ),
  bookingRequestPrefix: appConfig.bookingRequestPrefixTemplate.replace(
    "{siteName}",
    appConfig.siteName
  ),
};

export const homepageBusinessContent = {
  heroStats: [
    {
      value: appConfig.heroStatCustomersValue,
      label: appConfig.heroStatCustomersLabel,
    },
    {
      value: appConfig.heroStatDestinationsValue,
      label: appConfig.heroStatDestinationsLabel,
    },
    { value: appConfig.businessHours, label: appConfig.heroStatSupportLabel },
  ],
  assuranceItems: [
    appConfig.assuranceInsuranceLabel,
    appConfig.assuranceDeliveryLabel,
    appConfig.assuranceSupportLabelTemplate.replace(
      "{businessHours}",
      appConfig.businessHours
    ),
    appConfig.assuranceFeesLabel,
  ],
} as const;
