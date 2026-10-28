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
    // One canonical host: the admin talks to NEXT_PUBLIC_SERVER_URL (no www),
    // so an admin opened on www breaks with CORS / lost session.
    // English pages first (`locale: false` keeps the /en prefix), then the rest.
    ...['/en', '/en/:path*'].map(source => ({
      source,
      has: [{ type: 'host' as const, value: 'www.noscuadih.org' }],
      destination: `https://noscuadih.org${source}`,
      permanent: true,
      locale: false as const,
    })),
    // /api is not redirected: a page still open on www (opened before the
    // redirect, or with a draft in its localStorage) must be able to submit.
    // A cross-origin redirect would turn the POST into a blocked CORS request.
    {
      source: '/',
      has: [{ type: 'host', value: 'www.noscuadih.org' }],
      destination: 'https://noscuadih.org/',
      permanent: true,
    },
    {
      source: '/:path((?!api(?:/|$)).*)',
      has: [{ type: 'host', value: 'www.noscuadih.org' }],
      destination: 'https://noscuadih.org/:path',
      permanent: true,
    },
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
