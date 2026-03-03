import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

const serviceIds = ['service-1', 'service-2', 'service-3', 'service-4', 'service-5'];

const gridServices = [
  { name: 'CMS and ALICE', descKey: 'high-energy-physics' },
  { name: 'MolDynGrid', descKey: 'molecular-biology' },
  { name: 'VIRGO.UA', descKey: 'cosmology-and-astrophysics' },
  { name: 'SysBio', descKey: 'reconstruction-gene' },
  { name: 'MatModEn', descKey: 'mathematical-modelling' },
  { name: 'Medgrid', descKey: 'medical-grid-system' },
  { name: 'Multiscale', descKey: 'solution-wide-range' },
  { name: 'GEOPARD', descKey: 'calculation-of-three-dimensional' },
  { name: 'CompuChemGridUA', descKey: 'quantum-chemistry' },
];

export default function UNGPage() {
  const t = useTranslations('UNG');
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

          {/* Title + Intro + Bullet Services */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <h1 className='text-xl lg:text-2xl font-bold mb-6'>{t('title')}</h1>
            <p className='text-lg lg:text-xl leading-relaxed mb-6'>{t('intro')}</p>
            <div className='space-y-4'>
              {serviceIds.map((id) => (
                <div key={id} className='flex items-center gap-3'>
                  <ReactIcon width={32} height={32} className='shrink-0' />
                  <span className='text-lg lg:text-xl'>{t(id)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* UNG Intro + Grid Services */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed mb-8'>{t('ung-intro')}</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {gridServices.map((service) => (
                <div key={service.name} className='flex flex-col items-center text-center p-4'>
                  <h3 className='text-lg lg:text-xl font-bold mb-2'>{service.name}</h3>
                  <p className='text-lg lg:text-xl'>{t(service.descKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing Paragraphs */}
          <section className='w-full px-8 lg:px-20 space-y-4'>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('partnership-ung')}</p>
            <p className='text-lg lg:text-xl leading-relaxed'>{t('founding')}</p>
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
