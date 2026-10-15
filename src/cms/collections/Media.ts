import path from 'path';
import type { CollectionConfig } from 'payload';
import { isAuthenticated } from '../access';

const webp = { format: 'webp' as const, options: { quality: 82 } };

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { uk: 'Файл', en: 'File' },
    plural: { uk: 'Медіа', en: 'Media' },
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: { uk: 'Опис (alt)', en: 'Alt text' },
    },
  ],
  upload: {
    // Used only when S3 isn't configured (local dev).
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.*',
      'application/vnd.ms-excel',
      'application/vnd.ms-powerpoint',
      'application/zip',
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, formatOptions: webp },
      { name: 'card', width: 800, formatOptions: webp },
      { name: 'large', width: 1600, formatOptions: webp, withoutEnlargement: true },
    ],
  },
};
