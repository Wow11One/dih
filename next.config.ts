import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: "uk",
    locales: ["en", "uk"]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
