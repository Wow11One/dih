import DigitalMaturityForm from '@/components/digital-maturity/DigitalMaturityForm';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';

export default function DigitalMaturity() {
  const t = useTranslations('DigitalMaturity');

  return (
    <>
      <Head>
        <title>{`DIH | ${t('title')}`}</title>
        <meta name='description' content={t('description')} />
      </Head>
      <main className='w-full flex-1 px-5 pt-8 md:px-14 md:py-12 xl:px-20 xl:pb-16 xl:pt-24'>
        <div className='mx-auto mb-6 max-w-[1120px] text-lg italic lg:text-xl'>
          <Link href='/innovation-center' className='hover:underline'>
            {t('breadcrumb')}
          </Link>{' '}
          {'>'} {t('title')}
        </div>
        <DigitalMaturityForm />
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
