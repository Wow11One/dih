import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Pages Router i18n. The Payload admin (App Router, /admin) ignores it.
  i18n: {
    defaultLocale: 'uk',
    locales: ['en', 'uk'],
    localeDetection: false,
  },
  // The questionnaire used to live at the top level.
  redirects: async () => [
    {
      source: '/digital-maturity',
      destination: '/innovation-center/digital-maturity',
      permanent: true,
    },
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: webpackConfig => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    return webpackConfig;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
