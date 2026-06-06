function getEnv(name: string, fallback: string) {
  return process.env[name]?.trim() || fallback;
}

function getEnvList(name: string, fallback: string[]) {
  const value = process.env[name]?.trim();
  if (!value) return fallback;
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

const appPort = getEnv("APP_PORT", "3015");

export const appConfig = {
  appPort,
  siteName: getEnv("NEXT_PUBLIC_SITE_NAME", "Geolander"),
  siteDescription: getEnv(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Premium car rental in Georgia. Explore the Caucasus with comfort and reliability."
  ),
  seoDescription: getEnv(
    "NEXT_PUBLIC_SITE_SEO_DESCRIPTION",
    "Premium car rental service in Georgia. Explore the beauty of the Caucasus with comfort and reliability. Toyota RAV4, Mercedes E-Class, Hyundai Tucson."
  ),
  siteUrl: getEnv("NEXT_PUBLIC_SITE_URL", "https://geo-lander.com"),
  defaultLocale: getEnv("NEXT_PUBLIC_DEFAULT_LOCALE", "en"),
  locales: getEnvList("NEXT_PUBLIC_LOCALES", ["en", "ka"]),
  supportPhone: getEnv("NEXT_PUBLIC_SUPPORT_PHONE", "+995551330414"),
  supportEmail: getEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "info@geo-lander.com"),
  supportAddress: getEnv(
    "NEXT_PUBLIC_SUPPORT_ADDRESS",
    "8/5 Vedzini St, Tbilisi 0108"
  ),
  businessHours: getEnv("NEXT_PUBLIC_BUSINESS_HOURS", "24/7"),
  whatsappNumber: getEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+995551330414"),
  instagramUrl: getEnv("NEXT_PUBLIC_INSTAGRAM_URL", ""),
  facebookUrl: getEnv(
    "NEXT_PUBLIC_FACEBOOK_URL",
    "https://www.facebook.com/profile.php?id=61586702468991"
  ),
  whatsappBaseUrl: getEnv("NEXT_PUBLIC_WHATSAPP_BASE_URL", "https://wa.me/"),
  officeGoogleMapsUrl: getEnv(
    "NEXT_PUBLIC_OFFICE_GOOGLE_MAPS_URL",
    "https://maps.app.goo.gl/WKGqAsFnKuGPK49E7"
  ),
  devOrigins: getEnvList("DEV_ALLOWED_ORIGINS", [
    `http://localhost:${appPort}`,
    `http://127.0.0.1:${appPort}`,
  ]),
  adminPanelTitle: getEnv("NEXT_PUBLIC_ADMIN_PANEL_TITLE", "Admin Panel"),
  siteConfigurationTitle: getEnv(
    "NEXT_PUBLIC_SITE_CONFIGURATION_TITLE",
    "Site Configuration"
  ),
  saveSettingsButton: getEnv(
    "NEXT_PUBLIC_SAVE_SETTINGS_BUTTON",
    "Save Settings"
  ),
  saveSettingsSuccess: getEnv(
    "NEXT_PUBLIC_SAVE_SETTINGS_SUCCESS",
    "Settings saved successfully!"
  ),
  saveSettingsError: getEnv(
    "NEXT_PUBLIC_SAVE_SETTINGS_ERROR",
    "Failed to save settings"
  ),
  bookingCustomerNamePlaceholder: getEnv(
    "NEXT_PUBLIC_BOOKING_CUSTOMER_NAME_PLACEHOLDER",
    "John Doe"
  ),
  whatsappLeadMessageTemplate: getEnv(
    "NEXT_PUBLIC_WHATSAPP_LEAD_MESSAGE_TEMPLATE",
    "Hello! I'm interested in renting a car from {siteName}."
  ),
  bookingRequestPrefixTemplate: getEnv(
    "NEXT_PUBLIC_BOOKING_REQUEST_PREFIX_TEMPLATE",
    "New Booking Request - {siteName}"
  ),
  heroStatCustomersValue: getEnv(
    "NEXT_PUBLIC_HERO_STAT_CUSTOMERS_VALUE",
    "50+"
  ),
  heroStatCustomersLabel: getEnv(
    "NEXT_PUBLIC_HERO_STAT_CUSTOMERS_LABEL",
    "Happy Customers"
  ),
  heroStatDestinationsValue: getEnv(
    "NEXT_PUBLIC_HERO_STAT_DESTINATIONS_VALUE",
    "12"
  ),
  heroStatDestinationsLabel: getEnv(
    "NEXT_PUBLIC_HERO_STAT_DESTINATIONS_LABEL",
    "Destinations"
  ),
  heroStatSupportLabel: getEnv(
    "NEXT_PUBLIC_HERO_STAT_SUPPORT_LABEL",
    "Support"
  ),
  assuranceInsuranceLabel: getEnv(
    "NEXT_PUBLIC_ASSURANCE_INSURANCE_LABEL",
    "Full Insurance Included"
  ),
  assuranceDeliveryLabel: getEnv(
    "NEXT_PUBLIC_ASSURANCE_DELIVERY_LABEL",
    "Free Airport Delivery"
  ),
  assuranceSupportLabelTemplate: getEnv(
    "NEXT_PUBLIC_ASSURANCE_SUPPORT_LABEL_TEMPLATE",
    "{businessHours} Support"
  ),
  assuranceFeesLabel: getEnv(
    "NEXT_PUBLIC_ASSURANCE_FEES_LABEL",
    "No Hidden Fees"
  ),
  carAdminBackToCars: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_BACK_TO_CARS",
    "Back to Cars"
  ),
  carAdminAddNewTitle: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_ADD_NEW_TITLE",
    "Add New Car"
  ),
  carAdminBrandLabel: getEnv("NEXT_PUBLIC_CAR_ADMIN_BRAND_LABEL", "Brand"),
  carAdminModelLabel: getEnv("NEXT_PUBLIC_CAR_ADMIN_MODEL_LABEL", "Model"),
  carAdminRegistrationLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_REGISTRATION_LABEL",
    "Registration Number"
  ),
  carAdminYearLabel: getEnv("NEXT_PUBLIC_CAR_ADMIN_YEAR_LABEL", "Year"),
  carAdminColorLabel: getEnv("NEXT_PUBLIC_CAR_ADMIN_COLOR_LABEL", "Color"),
  carAdminBodyTypeLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_BODY_TYPE_LABEL",
    "Body Type"
  ),
  carAdminLicenseCategoryLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_LICENSE_CATEGORY_LABEL",
    "License Category"
  ),
  carAdminPricePerDayLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICE_PER_DAY_LABEL",
    "From Price per Day ($)"
  ),
  carAdminSeatsLabel: getEnv("NEXT_PUBLIC_CAR_ADMIN_SEATS_LABEL", "Seats"),
  carAdminTransmissionLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_TRANSMISSION_LABEL",
    "Transmission"
  ),
  carAdminFuelTypeLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_FUEL_TYPE_LABEL",
    "Fuel Type"
  ),
  carAdminDescriptionEnLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_DESCRIPTION_EN_LABEL",
    "Description (English)"
  ),
  carAdminDescriptionKaLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_DESCRIPTION_KA_LABEL",
    "Description (Georgian)"
  ),
  carAdminSeasonalPricingTitle: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_SEASONAL_PRICING_TITLE",
    "Seasonal Pricing"
  ),
  carAdminPricingPeriodLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_PERIOD_LABEL",
    "Period"
  ),
  carAdminPricingDays1To2Label: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_1_2_LABEL",
    "1-2 Days"
  ),
  carAdminPricingDays3To4Label: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_3_4_LABEL",
    "3-4 Days"
  ),
  carAdminPricingDays5To7Label: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_5_7_LABEL",
    "5-7 Days"
  ),
  carAdminPricingDays8To12Label: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_8_12_LABEL",
    "8-12 Days"
  ),
  carAdminPricingDays13To18Label: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_13_18_LABEL",
    "13-18 Days"
  ),
  carAdminPricingDays19To30Label: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_19_30_LABEL",
    "19-30 Days"
  ),
  carAdminPricingDays31PlusLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_PRICING_DAYS_31_PLUS_LABEL",
    "31+ Days"
  ),
  carAdminSortOrderLabel: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_SORT_ORDER_LABEL",
    "Sort Order"
  ),
  carAdminCreateButton: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_CREATE_BUTTON",
    "Create Car"
  ),
  carAdminEditPrefix: getEnv("NEXT_PUBLIC_CAR_ADMIN_EDIT_PREFIX", "Edit:"),
  carAdminDeleteButton: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_DELETE_BUTTON",
    "Delete"
  ),
  carAdminDeleteConfirm: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_DELETE_CONFIRM",
    "Are you sure you want to delete this car?"
  ),
  carAdminSaveChangesButton: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_SAVE_CHANGES_BUTTON",
    "Save Changes"
  ),
  carAdminCreateSuccess: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_CREATE_SUCCESS",
    "Car created successfully!"
  ),
  carAdminCreateError: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_CREATE_ERROR",
    "Failed to create car"
  ),
  carAdminUpdateSuccess: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_UPDATE_SUCCESS",
    "Car updated successfully!"
  ),
  carAdminUpdateError: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_UPDATE_ERROR",
    "Failed to update car"
  ),
  carAdminDeleteSuccess: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_DELETE_SUCCESS",
    "Car deleted"
  ),
  carAdminDeleteError: getEnv(
    "NEXT_PUBLIC_CAR_ADMIN_DELETE_ERROR",
    "Failed to delete car"
  ),
};

export const defaultSiteSettings = {
  site_name: appConfig.siteName,
  site_description: appConfig.siteDescription,
  seo_title: `${appConfig.siteName} - Premium Car Rental in Georgia`,
  seo_description: appConfig.seoDescription,
  site_url: appConfig.siteUrl,
  whatsapp_number: appConfig.whatsappNumber,
  business_hours: appConfig.businessHours,
  phone: appConfig.supportPhone,
  email: appConfig.supportEmail,
  address: appConfig.supportAddress,
  office_name: appConfig.siteName,
  office_google_maps_url: appConfig.officeGoogleMapsUrl,
  office_latitude: "",
  office_longitude: "",
  instagram: appConfig.instagramUrl,
  facebook: appConfig.facebookUrl,
  organization_name: appConfig.siteName,
  organization_logo_url: "/logo.png",
  seo_og_image_url: "/logo.png",
  // GEO/AEO signals — sourced from the real Google Business Profile.
  // AggregateRating schema is emitted ONLY when both rating and count are set.
  // Keep these in sync with the live Google rating.
  google_rating: "5.0",
  google_review_count: "81",
  price_range: "$$",
  payment_provider: "",
  payment_currency: "USD",
  payment_mode: "full",
  payment_enabled: "false",
};

export function withSettingFallback(
  settings: Partial<Record<keyof typeof defaultSiteSettings, string>>
) {
  return {
    ...defaultSiteSettings,
    ...settings,
  };
}
