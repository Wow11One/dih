import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { en } from '@payloadcms/translations/languages/en';
import { uk } from '@payloadcms/translations/languages/uk';
import path from 'path';
import { buildConfig, type SharpDependency } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from './cms/collections/Media';
import { Posts } from './cms/collections/Posts';
import { Users } from './cms/collections/Users';
import { seedIfEmpty } from './cms/seed';
import { migrations } from './migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
);

const DISABLED_EDITOR_FEATURES = [
  'relationship',
  'checklist',
  'inlineCode',
  'subscript',
  'superscript',
];

export default buildConfig({
  // serverURL also becomes the CSRF allowlist, so in dev it stays empty:
  // otherwise the admin breaks when `pnpm dev` lands on a port other than
  // the one in NEXT_PUBLIC_SERVER_URL.
  serverURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SERVER_URL || ''
      : '',
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — DIH' },
  },
  collections: [Posts, Media, Users],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) =>
      defaultFeatures.filter(
        feature => !DISABLED_EDITOR_FEATURES.includes(feature.key),
      ),
  }),
  localization: {
    locales: [
      { code: 'uk', label: 'Українська' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'uk',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { uk, en },
    fallbackLanguage: 'uk',
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Dev pushes schema changes automatically; production applies migrations
    // from src/migrations on startup.
    prodMigrations: migrations,
  }),
  // sharp's own typings are newer than the version Payload is typed against.
  sharp: sharp as unknown as SharpDependency,
  graphQL: { disable: true },
  telemetry: false,
  // Runs scheduled publish jobs inside the app process.
  jobs: {
    autoRun: [{ cron: '* * * * *', queue: 'default', limit: 10 }],
  },
  plugins: [
    s3Storage({
      enabled: s3Enabled,
      collections: {
        media: { prefix: process.env.S3_PREFIX || 'dih' },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'auto',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: seedIfEmpty,
});
