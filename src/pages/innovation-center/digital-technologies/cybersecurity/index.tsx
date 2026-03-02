import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

const serviceIds = [
  'service-1',
  'service-2',
  'service-3',
  'service-4',
  'service-5',
  'service-6',
];

export default function CybersecurityPage() {
  const t = useTranslations('Cybersecurity');
  const { push } = useRouter();

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
                onClick={() =>
                  push('/innovation-center/digital-technologies')
                }
              >
                {t('breadcrumb-2')}
              </span>
              {' > '}
              {t('breadcrumb-3')}
            </div>
          </section>

          {/* Services Section */}
          <section className='w-full pb-12 px-8 lg:px-20'>
            <h1 className='text-xl lg:text-2xl font-bold mb-8'>
              {t('services-title')}
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
              {serviceIds.map((id) => (
                <div key={id} className='flex flex-col gap-3'>
                  <h3 className='text-lg lg:text-xl font-bold text-center'>
                    {t(`${id}-title`)}
                  </h3>
                  <p className='text-lg lg:text-xl leading-relaxed'>
                    {t(`${id}-description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Service Provider Section */}
          <section className='w-full pb-10 px-8 lg:px-20'>
            <h2 className='text-xl lg:text-2xl font-bold mb-4'>
              {t('providers-title')}
            </h2>
            <p className='text-lg lg:text-xl mb-4'>
              iSolutions{' '}
              <a
                href='https://solutions.com.ua'
                className='underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://solutions.com.ua
              </a>
            </p>
            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('provider-description-1')}
            </p>
            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('provider-description-2')}
            </p>
            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('provider-description-3')}
            </p>
          </section>

          {/* Experience / Use Cases Section */}
          <section className='w-full px-8 lg:px-20'>
            <h2 className='text-xl lg:text-2xl font-bold mb-6'>
              {t('experience-title')}
            </h2>
            <h3 className='text-lg lg:text-xl font-bold mb-2'>
              {t('experience-project-title')}
            </h3>
            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('experience-project-description')}
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
