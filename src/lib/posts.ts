import config from '@payload-config';
import { getPayload, type Where } from 'payload';
import type { Post } from '@/payload-types';
import type { PostCategory } from '@/constants/postCategories';

type Locale = 'uk' | 'en';

export type PostListItem = Pick<
  Post,
  'id' | 'title' | 'excerpt' | 'slug' | 'category' | 'publishedAt'
>;

const published = (category: PostCategory): Where => ({
  and: [
    { category: { equals: category } },
    { _status: { equals: 'published' } },
  ],
});

// getServerSideProps props must be plain JSON (no `undefined`).
const toJSON = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const toLocale = (locale?: string): Locale => (locale === 'en' ? 'en' : 'uk');

export const getPosts = async (
  category: PostCategory,
  locale?: string,
): Promise<PostListItem[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: published(category),
    sort: '-publishedAt',
    limit: 100,
    depth: 0,
    locale: toLocale(locale),
    fallbackLocale: 'uk',
    overrideAccess: false,
    select: {
      title: true,
      excerpt: true,
      slug: true,
      category: true,
      publishedAt: true,
    },
  });
  return toJSON(docs as PostListItem[]);
};

export const getPost = async (
  category: PostCategory,
  slug: string,
  locale?: string,
): Promise<Post | null> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [published(category), { slug: { equals: slug } }] },
    limit: 1,
    depth: 1,
    locale: toLocale(locale),
    fallbackLocale: 'uk',
    overrideAccess: false,
  });
  return docs[0] ? toJSON(docs[0]) : null;
};
