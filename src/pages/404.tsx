import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <>
      <Head>
        <title>DIH | 404</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='flex-1 flex items-center justify-center px-8 py-20'>
          <div className='flex flex-col items-center text-center gap-6'>
            <span className='text-[120px] font-bold leading-none text-blue-primary'>
              404
            </span>
            <h1 className='text-2xl lg:text-4xl font-bold'>
              {t('title')}
            </h1>
            <p className='text-lg lg:text-xl text-gray-500 max-w-md'>
              {t('description')}
            </p>
            <Link
              href='/'
              className='mt-4 text-lg lg:text-xl font-bold text-white bg-blue-secondary py-4 px-10 rounded-2xl hover:opacity-90 transition-opacity'
            >
              {t('button')}
            </Link>
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
