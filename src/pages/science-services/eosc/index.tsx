import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

const serviceCards = [
  { id: 'card-1', image: '/science-services/eosc/physical-einfrastructures.webp' },
  { id: 'card-2', image: '/science-services/eosc/aggregators-integrators.webp' },
  { id: 'card-3', image: '/science-services/eosc/process-analysis.webp' },
  { id: 'card-4', image: '/science-services/eosc/security-operations.webp' },
  { id: 'card-5', image: '/science-services/eosc/sharing-discovery.webp' },
  { id: 'card-6', image: '/science-services/eosc/training-support.webp' },
];

export default function EOSCPage() {
  const t = useTranslations('EOSC');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | {t('breadcrumb-2')}</title>
      </Head>
      <main className='w-full flex flex-col'>
        <div className='w-full lg:pt-24 pt-12 pb-16 flex-1'>
          {/* Breadcrumbs */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <div className='text-lg lg:text-xl italic'>
              <span
                className='cursor-pointer'
                onClick={() => push('/science-services')}
              >
                {t('breadcrumb-1')}
              </span>
              {' > '}
              {t('breadcrumb-2')}
            </div>
          </section>

          {/* Intro Text */}
          <section className='w-full pb-10 px-8 lg:px-20 space-y-4'>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('intro-1')}</p>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('intro-2')}</p>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('intro-3')}</p>
          </section>

          {/* Service Cards Grid */}
          <section className='w-full pb-12 px-8 lg:px-28'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 place-items-center'>
              {serviceCards.map((card, index) => (
                <div
                  key={card.id}
                  className='relative overflow-hidden rounded-3xl h-[180px] md:h-[200px] lg:h-[230px] w-full flex items-center justify-center hover:scale-105 transition-transform duration-300'
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className='absolute inset-0 bg-blue-primary/70'></div>
                  <div className='relative z-10 text-white text-xl lg:text-2xl font-semibold px-4 text-center'>
                    {t(`card-${index + 1}`)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Body Text */}
          <section className='w-full pb-8 px-8 lg:px-20 space-y-4'>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('body-1')}</p>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('body-2')}</p>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('body-3')}</p>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('body-4')}</p>
          </section>

          {/* Governance Bullet List */}
          <section className='w-full pb-8 px-8 lg:px-20 space-y-4'>
            <div className='flex items-center gap-3'>
              <ReactIcon width={32} height={32} className='shrink-0' />
              <span className='text-lg lg:text-xl'>{t('governance-1')}</span>
            </div>

            <div className='flex items-center gap-3'>
              <ReactIcon width={32} height={32} className='shrink-0' />
              <span className='text-lg lg:text-xl'>
                {t('governance-2-pre')}{' '}
                <a
                  href='https://eosc.eu/eosc-association'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  {t('governance-2-link')}
                </a>
              </span>
            </div>

            <div className='flex items-center gap-3'>
              <ReactIcon width={32} height={32} className='shrink-0' />
              <span className='text-lg lg:text-xl'>{t('governance-3')}</span>
            </div>
          </section>

          {/* Final Paragraph */}
          <section className='w-full px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('final')}</p>
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
