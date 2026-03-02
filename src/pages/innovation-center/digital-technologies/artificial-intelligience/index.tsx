import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ArtificialIntelligencePage() {
  const t = useTranslations('ArtificialIntelligence');
  const { push } = useRouter();

  const services = ['service-1', 'service-2', 'service-3', 'service-4'];

  return (
    <>
      <Head>
        <title>DIH | {t('breadcrumb-3')}</title>
      </Head>
      <main className='w-full flex flex-col'>
        <div className='w-full lg:pt-24 pt-12 pb-16 flex-1'>
          {/* Breadcrumbs */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <div className='text-lg lg:text-xl italic'>
              <span
                className='cursor-pointer'
                onClick={() => push('/innovation-center')}
              >
                {t('breadcrumb-1')}
              </span>
              {' > '}
              <span
                className='cursor-pointer'
                onClick={() => push('/innovation-center/digital-technologies')}
              >
                {t('breadcrumb-2')}
              </span>
              {' > '}
              {t('breadcrumb-3')}
            </div>
          </section>

          {/* Services Section */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <h1 className='text-xl lg:text-2xl font-bold mb-6'>
              {t('services-title')}
            </h1>
            <div className='space-y-4'>
              {services.map((key) => (
                <div key={key} className='flex items-center gap-3'>
                  <ReactIcon width={32} height={32} className='shrink-0' />
                  <span className='text-lg lg:text-xl'>{t(key)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Service Provider Section */}
          <section className='w-full px-8 lg:px-20'>
            <h2 className='text-xl lg:text-2xl font-bold mb-4'>
              {t('providers-title')}
            </h2>
            <p className='text-lg lg:text-xl'>
              {t('provider-name')}{' '}
              <a
                href='http://fin.ukma.edu.ua'
                className='underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                http://fin.ukma.edu.ua
              </a>
            </p>
          </section>
        </div>
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
