import { postgresAdapter } from '@payloadcms/db-postgres';
import { importExportPlugin } from '@payloadcms/plugin-import-export';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { en } from '@payloadcms/translations/languages/en';
import { uk } from '@payloadcms/translations/languages/uk';
import path from 'path';
import { buildConfig, type Field, type SharpDependency } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Assessments } from './cms/collections/Assessments';
import { Media } from './cms/collections/Media';
import { Posts } from './cms/collections/Posts';
import { Users } from './cms/collections/Users';
import { seedIfEmpty } from './cms/seed';
import { assessmentsBeforeExport } from './cms/utils/assessmentCsv';
import { migrations } from './migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
);

// serverURL is also the CSRF allowlist (requests from other origins lose
// their admin session). In dev it stays empty so any port works; in
// production the www/non-www twin of the domain is allowed too.
const serverURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_SERVER_URL || ''
    : '';

const withWwwTwin = (url: string) => {
  if (!url) return [];
  const { protocol, host } = new URL(url);
  const twin = host.startsWith('www.') ? host.slice(4) : `www.${host}`;
  return [url, `${protocol}//${twin}`];
};

// Recursively sets admin.hidden on the named field (it sits inside a
// collapsible in the plugin's export collection).
const hideField = (fields: Field[], name: string): Field[] =>
  fields.map(field => {
    if ('name' in field && field.name === name) {
      return { ...field, admin: { ...field.admin, hidden: true } } as Field;
    }
    if ('fields' in field && Array.isArray(field.fields)) {
      return { ...field, fields: hideField(field.fields, name) } as Field;
    }
    return field;
  });

const DISABLED_EDITOR_FEATURES = [
  'relationship',
  'checklist',
  'inlineCode',
  'subscript',
  'superscript',
];

export default buildConfig({
  serverURL,
  csrf: withWwwTwin(serverURL),
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' — DIH' },
  },
  collections: [Posts, Media, Assessments, Users],
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
    // CSV export of assessments from the admin list ("⋮" → Export).
    // Download only: exports aren't stored, to avoid piling up copies of
    // personal data. Import is disabled: assessments come only from the form.
    importExportPlugin({
      collections: [
        {
          slug: 'assessments',
          import: false,
          export: {
            format: 'csv',
            disableSave: true,
            disableJobsQueue: true,
            hooks: { before: assessmentsBeforeExport },
            // The CSV always has every column (built in assessmentsBeforeExport),
            // so hide the field picker: it pre-fills from the list columns and
            // would otherwise leave most of the CSV empty.
            overrideCollection: ({ collection }) => ({
              ...collection,
              fields: hideField(collection.fields, 'fields'),
            }),
          },
        },
      ],
    }),
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
