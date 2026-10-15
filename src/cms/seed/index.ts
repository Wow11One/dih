import path from 'path';
import type { Payload } from 'payload';
import type { Post } from '@/payload-types';
import { lexicalFromText } from '../utils/lexical';
import { slugify } from '../utils/slugify';

type SeedPost = {
  category: Post['category'];
  publishedAt: string;
  coverFile?: string;
  uk: { title: string; excerpt: string; content: string };
  en?: { title: string; excerpt: string; content: string };
};

// Content that was hardcoded in the old mock pages.
const POSTS: SeedPost[] = [
  {
    category: 'news',
    publishedAt: '2025-02-14T10:00:00.000Z',
    coverFile: 'public/news/nosc-dih.webp',
    uk: {
      title: 'NOSC-UA DIH надаватиме підтримку стартапам',
      excerpt:
        'NOSC-UA DIH надаватиме підтримку стартапам Стартап-школи Academ.City, що стала одним з шести переможців конкурсного відбору експериментального проєкту Міністерства освіти і науки України зі створення стартап-шкіл–інкубаторів–акселераторів на базі закладів вищої освіти та наукових установ.',
      content: `NOSC-UA DIH надаватиме підтримку стартапам Стартап-школи Academ.City, що стала одним з шести переможців конкурсного відбору експериментального проєкту Міністерства освіти і науки України зі створення стартап-шкіл–інкубаторів–акселераторів на базі закладів вищої освіти та наукових установ. Під час презентації старту проєкту, який реалізується КАУ у партнерстві з Національним університетом «Києво-Могилянська академія», керівник Віртуального центру цифрових інновацій Володимир Ночвай розповів про заплановані воркшопи для учасників стартап-школи з упровадження цифрових рішень.

Більше інформації за посиланням «Як академічні стартапи стають рушійною силою інноваційної економіки. (Пост-анонс Стартап-школа Academ.city)»`,
    },
  },
  {
    category: 'news',
    publishedAt: '2024-10-04T10:00:00.000Z',
    uk: {
      title: '10-й Глобальний Саміт FIWARE',
      excerpt:
        'Відбувся 10-й Глобальний саміт FIWARE в Неаполі, Італія, став надихаючим заходом, на якому відбулися змістовні дискусії, цінні знайомства та інноваційні ідеї для зміни цифрового майбутнього.',
      content:
        'Відбувся 10-й Глобальний саміт FIWARE в Неаполі, Італія, став надихаючим заходом, на якому відбулися змістовні дискусії, цінні знайомства та інноваційні ідеї для зміни цифрового майбутнього. На саміті було представлено комплексний порядок денний, який, серед іншого, наголошував на вирішальній ролі місцевої...',
    },
  },
  {
    category: 'ecology',
    publishedAt: '2021-10-23T10:00:00.000Z',
    uk: {
      title: 'Чисельне метеорологічне прогнозування',
      excerpt:
        'Сервіс Чисельне метеорологічне прогнозування для регіонального прогнозу погоди. Веб сервіс дозволяє здійснити запит на розрахунок для окремого регіону та одержати прогноз на Google-мапі.',
      content:
        "Сервіс Чисельне метеорологічне прогнозування для регіонального прогнозу погоди. Веб сервіс дозволяє здійснити запит на розрахунок для окремого регіону та одержати прогноз на Google-мапі. Обчислювальний сервіс реалізується на основі застосування чисельних методів та моделей паралельних обчислень для розв'язання задач метеорологічного прогнозування...",
    },
    en: {
      title: 'Numerical Weather Prediction',
      excerpt:
        'The Numerical Weather Prediction service for regional weather forecasting allows users to submit calculation requests for a specific region and receive forecasts on Google Maps.',
      content:
        'The Numerical Weather Prediction service for regional weather forecasting allows users to submit calculation requests for a specific region and receive forecasts on Google Maps. The computing service is implemented based on numerical methods and parallel computing models for solving meteorological forecasting problems...',
    },
  },
  {
    category: 'high-energy-physics',
    publishedAt: '2019-11-26T10:00:00.000Z',
    uk: {
      title: 'Integrated HydroKinetic Model (iHKM)',
      excerpt:
        'Integrated Hydro-Kinetic Model (iHKM) is the powerful tool for simulation of a relativistic heavy ion collision, which allows to describe or predict a wide variety of measured bulk observables.',
      content:
        'Integrated Hydro-Kinetic Model (iHKM) is the powerful tool for simulation of a relativistic heavy ion collision, which allows to describe or predict a wide variety of measured bulk observables. Naturally, a researcher is interested in finding the connection between...',
    },
  },
];

const createPost = async (payload: Payload, post: SeedPost) => {
  let cover: number | undefined;
  if (post.coverFile) {
    const media = await payload.create({
      collection: 'media',
      data: { alt: post.uk.title },
      filePath: path.resolve(process.cwd(), post.coverFile),
    });
    cover = media.id;
  }

  const created = await payload.create({
    collection: 'posts',
    locale: 'uk',
    draft: false,
    data: {
      ...post.uk,
      content: lexicalFromText(post.uk.content),
      slug: slugify(post.uk.title),
      category: post.category,
      publishedAt: post.publishedAt,
      cover,
      _status: 'published',
    },
  });

  if (post.en) {
    await payload.update({
      collection: 'posts',
      id: created.id,
      locale: 'en',
      data: {
        ...post.en,
        content: lexicalFromText(post.en.content),
        _status: 'published',
      },
    });
  }
};

// Runs on startup. Seeds only a brand-new install (no users and no posts),
// so posts deleted later by admins never come back.
export const seedIfEmpty = async (payload: Payload) => {
  const [users, posts] = await Promise.all([
    payload.count({ collection: 'users' }),
    payload.count({ collection: 'posts' }),
  ]);
  if (users.totalDocs > 0 || posts.totalDocs > 0) return;

  payload.logger.info('Seeding initial posts…');
  for (const post of POSTS) {
    await createPost(payload, post);
  }
  payload.logger.info(`Seeded ${POSTS.length} posts.`);
};
