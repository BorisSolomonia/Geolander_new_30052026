import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { appConfig } from "./src/lib/app-config";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "development"
    ? {
        allowedDevOrigins: appConfig.devOrigins,
      }
    : {}),
};

export default withNextIntl(nextConfig);
