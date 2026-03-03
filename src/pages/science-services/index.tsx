import CommentIcon from '@/components/icons/Comment';
import NewsDateIcon from '@/components/icons/NewsDate';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  { key: 'menu-1', link: '/science-services/eosc' },
  { key: 'menu-2', link: '/science-services/egi' },
  { key: 'menu-3', link: '/science-services/ung' },
  { key: 'menu-4' },
  { key: 'menu-5' },
  { key: 'menu-6' },
];

const articles = [
  {
    titleKey: 'article-1-title',
    date: '23.10.21',
    categoryKey: 'article-1-category',
    descKey: 'article-1-description',
  },
  {
    titleKey: 'article-2-title',
    date: '26.11.19',
    categoryKey: 'article-2-category',
    descKey: 'article-2-description',
  },
];

export default function ScienceServicesPage() {
  const t = useTranslations('ScienceServices');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | {t('title')}</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='w-full lg:pt-16 pt-10 flex-1'>
          <div className='h-full flex flex-col flex-1 items-start px-8 lg:px-20'>
            <h1 className='text-xl lg:text-2xl font-bold mt-6 lg:mt-10 mb-8'>
              {t('title')}
            </h1>

            {/* Menu */}
            <div className='flex flex-col gap-4 lg:gap-6 mb-12'>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  disabled={!item.link}
                  onClick={() => item.link && push(item.link)}
                  className='font-bold text-left text-lg lg:text-xl underline underline-offset-2 disabled:opacity-50 enabled:cursor-pointer hover:opacity-80 transition-opacity'
                >
                  {t(item.key)}
                </button>
              ))}
            </div>

            {/* Articles */}
            {/* <div className='space-y-8 lg:space-y-16 w-full'>
              {articles.map((article, index) => (
                <div key={index} className='flex flex-col gap-4 lg:gap-6'>
                  <div className='space-y-2'>
                    <Link
                      className='text-xl lg:text-2xl font-bold underline underline-offset-2'
                      href='#'
                    >
                      {t(article.titleKey)}
                    </Link>
                    <div className='flex gap-3 items-center text-lg lg:text-xl'>
                      <div className='flex gap-1.5 items-center'>
                        <div style={{ paddingTop: 3 }}>
                          <NewsDateIcon />
                        </div>
                        <span>{article.date}</span>
                      </div>
                      <span>|</span>
                      <span>{t(article.categoryKey)}</span>
                    </div>
                  </div>
                  <div className='text-lg lg:text-xl space-y-2'>
                    <p>{t(article.descKey)}</p>
                    <div className='flex items-center gap-1'>
                      <CommentIcon />
                      <span className='italic'>{t('leave-comment')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};
