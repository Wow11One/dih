import {
  slugField,
  ValidationError,
  type CollectionBeforeChangeHook,
  type CollectionConfig,
} from 'payload';
import { POST_CATEGORIES } from '@/constants/postCategories';
import { isAuthenticated, publishedOrAuthenticated } from '../access';
import { isEmptyLexical } from '../utils/lexical';
import { slugify } from '../utils/slugify';

const YOUTUBE_URL =
  /^https?:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)[\w-]{11}/;

// Ukrainian is mandatory, English is optional (falls back to Ukrainian), so
// these fields are checked only when publishing the uk version instead of
// using `required`, which would apply to every locale.
const REQUIRED_IN_UK = ['title', 'excerpt', 'content'] as const;

const requireUkrainian: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
  req,
}) => {
  if (data._status !== 'published' || req.locale !== 'uk') return data;

  const errors = REQUIRED_IN_UK.filter(name => {
    const value = data[name] ?? originalDoc?.[name];
    return name === 'content'
      ? isEmptyLexical(value)
      : !String(value ?? '').trim();
  }).map(path => ({ path, message: req.t('validation:required') }));

  if (errors.length) {
    throw new ValidationError({ collection: 'posts', errors, req });
  }
  return data;
};

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { uk: 'Публікація', en: 'Post' },
    plural: { uk: 'Публікації', en: 'Posts' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'publishedAt'],
    listSearchableFields: ['title', 'slug'],
  },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  versions: {
    drafts: { schedulePublish: true },
    maxPerDoc: 20,
  },
  hooks: {
    beforeChange: [
      requireUkrainian,
      // The date is never typed in by hand: it's stamped on first publish
      // (including scheduled publish). Seed data passes its own date.
      ({ data }) => {
        if (data._status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { uk: 'Заголовок', en: 'Title' },
      localized: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: { uk: 'Короткий опис', en: 'Excerpt' },
      admin: {
        description: {
          uk: 'Показується у списку публікацій.',
          en: 'Shown in the list of posts.',
        },
      },
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: { uk: 'Текст', en: 'Content' },
      localized: true,
      hooks: {
        beforeChange: [
          ({ value }) => (isEmptyLexical(value) ? null : value),
        ],
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: { uk: 'Відео з YouTube', en: 'YouTube video' },
      admin: {
        description: {
          uk: 'Посилання на відео, наприклад https://www.youtube.com/watch?v=…',
          en: 'Video link, e.g. https://www.youtube.com/watch?v=…',
        },
      },
      validate: (value: string | null | undefined) =>
        !value || YOUTUBE_URL.test(value) || 'Невірне посилання на YouTube',
    },
    {
      name: 'attachments',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: { uk: 'Файли', en: 'Attachments' },
      admin: {
        description: {
          uk: 'PDF, документи тощо — для завантаження відвідувачами.',
          en: 'PDFs, documents etc. for visitors to download.',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      label: { uk: 'Категорія', en: 'Category' },
      required: true,
      index: true,
      defaultValue: 'news',
      options: POST_CATEGORIES.map(category => ({
        value: category.value,
        label: { ...category.label },
      })),
      admin: { position: 'sidebar' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: { uk: 'Обкладинка', en: 'Cover' },
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        position: 'sidebar',
        description: {
          uk: 'Необов’язково. Без неї буде стандартна картинка DIH.',
          en: 'Optional. A default DIH image is used otherwise.',
        },
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: { uk: 'Дата публікації', en: 'Published at' },
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { displayFormat: 'dd.MM.yyyy HH:mm' },
        description: {
          uk: 'Ставиться автоматично під час публікації.',
          en: 'Set automatically on publish.',
        },
      },
    },
    slugField({
      slugify: ({ valueToSlugify }) => slugify(String(valueToSlugify ?? '')),
    }),
  ],
};
