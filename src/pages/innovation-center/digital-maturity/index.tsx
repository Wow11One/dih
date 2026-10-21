import DigitalMaturityForm from '@/components/digital-maturity/DigitalMaturityForm';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

export default function DigitalMaturity() {
  const t = useTranslations('DigitalMaturity');

  return (
    <>
      <Head>
        <title>{`DIH | ${t('title')}`}</title>
        <meta name='description' content={t('description')} />
      </Head>
      <main className='w-full flex-1 px-5 pt-14 lg:px-14 lg:pt-28 md:pb-16'>
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
