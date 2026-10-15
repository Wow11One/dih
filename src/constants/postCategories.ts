// Post categories are fixed in code: adding one also means adding its page.
export const POST_CATEGORIES = [
  {
    value: 'news',
    label: { uk: 'Новини', en: 'News' },
    basePath: '/news',
  },
  {
    value: 'biology',
    label: { uk: 'Біологія', en: 'Biology' },
    basePath: '/science-services/biology',
  },
  {
    value: 'ecology',
    label: { uk: 'Екологія', en: 'Ecology' },
    basePath: '/science-services/ecology',
  },
  {
    value: 'high-energy-physics',
    label: { uk: 'Фізика високих енергій', en: 'High-energy physics' },
    basePath: '/science-services/high-energy-physics',
  },
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number]['value'];

export const SCIENCE_CATEGORIES = POST_CATEGORIES.filter(
  category => category.value !== 'news',
);

export const getCategory = (value: string) =>
  POST_CATEGORIES.find(category => category.value === value);

export const getPostPath = (post: { category: string; slug?: string | null }) =>
  `${getCategory(post.category)?.basePath ?? '/news'}/${post.slug}`;
