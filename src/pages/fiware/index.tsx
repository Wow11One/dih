import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';

const ihubPoints = [1, 2, 3, 4];
const dataSpacePoints = [1, 2, 3];
const stats = [
  { value: '39+', labelKey: 'stat-hubs-label' },
  { value: '8000+', labelKey: 'stat-devs-label' },
  { value: '#1', labelKey: 'stat-region-label' },
];

const renderHighlightedLead = (text: string) => {
  const separatorIndex = text.indexOf(':');

  if (separatorIndex === -1) {
    return text;
  }

  const lead = text.slice(0, separatorIndex + 1);
  const tail = text.slice(separatorIndex + 1).trimStart();

  return (
    <>
      <strong>{lead}</strong>{' '}
      {tail}
    </>
  );
};

export default function FiwarePage() {
  const t = useTranslations('Fiware');

  return (
    <>
      <Head>
        <title>DIH | FIWARE iHUB</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='w-full pt-10 lg:pt-16 pb-10 lg:pb-16'>
          <div className='px-8 lg:px-20 flex flex-col gap-8 lg:gap-12'>
            <h1 className='text-xl lg:text-2xl font-bold mt-6 lg:mt-10'>
              {t('eyebrow')}
            </h1>

            <div>
              <div className='flex flex-col gap-4 lg:gap-6'>
                <h1 className='text-xl lg:text-2xl font-bold leading-tight max-w-5xl'>
                  {t('title')}
                </h1>

                <div className='flex flex-col gap-4 text-lg lg:text-xl leading-8'>
                  <p>{t('intro-1')}</p>
                  <p>{t('intro-2')}</p>
                </div>

                <h2 className='text-xl lg:text-2xl font-bold mt-4'>
                  {t('foundation-title')}
                </h2>

                <div>
                  <div className='flex flex-col gap-4 text-lg lg:text-xl leading-8'>
                    <p>{t('foundation-1')}</p>
                    <p>{t('foundation-2')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='px-8 lg:px-20 pb-10 lg:pb-16'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8'>
            <article className='rounded-[32px] bg-white border border-[#D5E8EC] p-6 lg:p-8'>
              <h2 className='text-xl lg:text-2xl font-bold leading-tight mb-4'>
                {t('section-1-title')}
              </h2>
              <div className='flex flex-col gap-4 text-lg lg:text-xl leading-8 text-slate-800'>
                <p>{t('section-1-p1')}</p>
                <p>{t('section-1-p2')}</p>
              </div>

              <div className='mt-6'>
                <div className='text-xl lg:text-2xl font-bold leading-tight mb-4'>
                  {t('section-1-list-title')}
                </div>
                <div className='grid grid-cols-1 gap-4'>
                  {ihubPoints.map(index => (
                    <div key={index} className='flex items-start gap-4'>
                      <ReactIcon
                        width={28}
                        height={28}
                        className='shrink-0 mt-1'
                      />
                      <div className='text-lg lg:text-xl leading-8 text-slate-800'>
                        {renderHighlightedLead(t(`section-1-list-${index}`))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className='mt-6 text-lg lg:text-xl leading-8 text-slate-800'>
                {t('section-1-note')}
              </p>
            </article>

            <article className='rounded-[32px] bg-[#F4FAFB] border border-[#D5E8EC] p-6 lg:p-8'>
              <h2 className='text-xl lg:text-2xl font-bold leading-tight mb-4'>
                {t('section-2-title')}
              </h2>
              <div className='flex flex-col gap-4 text-lg lg:text-xl leading-8 text-slate-800'>
                <p>{t('section-2-p1')}</p>
                <p>{t('section-2-p2')}</p>
              </div>

              <div className='mt-6'>
                <div className='text-xl lg:text-2xl font-bold leading-tight mb-4'>
                  {t('section-2-list-title')}
                </div>
                <div className='grid grid-cols-1 gap-4'>
                  {dataSpacePoints.map(index => (
                    <div key={index} className='flex items-start gap-4'>
                      <ReactIcon
                        width={28}
                        height={28}
                        className='shrink-0 mt-1'
                      />
                      <div className='text-lg lg:text-xl leading-8 text-slate-800'>
                        {renderHighlightedLead(t(`section-2-list-${index}`))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className='mt-6 text-lg lg:text-xl leading-8 text-slate-800'>
                {t('section-2-p3')}
              </p>
            </article>
          </div>
        </section>

        <section className='px-8 lg:px-20 pb-14 lg:pb-20'>
          <div className='rounded-[36px] bg-blue-primary text-white px-6 lg:px-10 py-8 lg:py-10'>
            <div className='max-w-4xl flex flex-col gap-4'>
              <h2 className='text-2xl lg:text-3xl font-bold'>
                {t('section-3-title')}
              </h2>
              <p className='text-lg lg:text-xl leading-8 text-white/90'>
                {t('section-3-p1')}
              </p>
              <p className='text-lg lg:text-xl leading-8 text-white/90'>
                {t('section-3-p2')}
              </p>
              <div className='pt-2 text-lg lg:text-xl leading-8'>
                <span className='text-white/80'>{t('cta-title')} </span>
                <Link
                  href='https://docs.google.com/forms/d/e/1FAIpQLScR-Kmt14coaVomFkr8NYbO0J2W7l3lcmmevXYroSw0uDcQ_g/viewform'
                  target='_blank'
                  className='font-semibold underline underline-offset-4 hover:opacity-85 transition-opacity'
                >
                  {t('cta-link')}
                </Link>
              </div>
            </div>
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
