import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

const serviceCards = [
  { id: 'card-1', image: '/innovation-center/cloud-technologies/compute.webp' },
  { id: 'card-2', image: '/innovation-center/cloud-technologies/storage.webp' },
  { id: 'card-3', image: '/innovation-center/cloud-technologies/security.webp' },
  { id: 'card-4', image: '/innovation-center/cloud-technologies/applications.webp' },
  { id: 'card-5', image: '/innovation-center/cloud-technologies/training.webp' },
];

const featureIds = ['feature-1', 'feature-2', 'feature-3', 'feature-4', 'feature-5'];

export default function EGIPage() {
  const t = useTranslations('EGI');
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

          {/* Intro */}
          <section className='w-full pb-10 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('intro')}</p>
          </section>

          {/* Service Cards Grid */}
          <section className='w-full pb-12 px-8 lg:px-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 place-items-center'>
              {serviceCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`self-center relative overflow-hidden rounded-3xl h-[180px] md:h-[200px] lg:h-[230px] w-full flex items-center justify-center hover:scale-105 transition-transform duration-300${index === serviceCards.length - 1 && serviceCards.length % 2 !== 0 ? ' md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className='absolute inset-0 bg-blue-primary/70' />
                  <div className='relative z-10 text-white text-xl lg:text-2xl font-semibold px-4 text-center'>
                    {t(`card-${index + 1}`)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Body Text */}
          <section className='w-full pb-6 px-8 lg:px-20 space-y-4'>
            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('body-1-pre')}{' '}
              <a
                href='https://marketplace.eosc-portal.eu/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                {t('body-1-link')}
              </a>
              .
            </p>

            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('body-2-pre')}{' '}
              <a
                href='https://www.egi.eu/wp-content/uploads/2017/08/EGI_Use_Cases.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                {t('body-2-link-1')}
              </a>
              {t('body-2-mid')}{' '}
              <a
                href='https://www.egi.eu/solutions/research-infrastructures/'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                {t('body-2-link-2')}
              </a>
              .
            </p>

            <p className='text-lg lg:text-xl leading-relaxed'>{t('body-3')}</p>
          </section>

          {/* Feature Bullet List */}
          <section className='w-full pb-8 px-8 lg:px-20 space-y-4'>
            {featureIds.map((id) => (
              <div key={id} className='flex items-center gap-3'>
                <ReactIcon width={32} height={32} className='shrink-0' />
                <span className='text-lg lg:text-xl'>{t(id)}</span>
              </div>
            ))}
          </section>

          {/* Federation Section */}
          <section className='w-full pb-6 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed mb-6'>{t('body-4')}</p>

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <ReactIcon width={32} height={32} className='shrink-0' />
                <span className='text-lg lg:text-xl'>
                  {t('federation-bullet-1-pre')}{' '}
                  <a
                    href='https://www.egi.eu/services/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    {t('federation-bullet-1-link')}
                  </a>
                  .
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <ReactIcon width={32} height={32} className='shrink-0' />
                <span className='text-lg lg:text-xl'>
                  {t('federation-bullet-2-pre')}{' '}
                  <a
                    href='https://www.egi.eu/federation/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline'
                  >
                    {t('federation-bullet-2-link')}
                  </a>
                  .
                </span>
              </div>
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
