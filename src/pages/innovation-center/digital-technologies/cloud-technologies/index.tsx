import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CloudTechnologiesPage() {
  const t = useTranslations('CloudTechnologies');
  const { push } = useRouter();

  const serviceCards = [
    { id: 'compute', image: '/innovation-center/cloud-technologies/compute.webp' },
    { id: 'storage-data', image: '/innovation-center/cloud-technologies/storage.webp' },
    { id: 'security', image: '/innovation-center/cloud-technologies/security.webp' },
    { id: 'applications', image: '/innovation-center/cloud-technologies/applications.webp' },
    { id: 'training', image: '/innovation-center/cloud-technologies/training.webp' },
  ];

  const pillars = [
    { number: '1', key: 'pillar1' },
    { number: '2', key: 'pillar2' },
    { number: '3', key: 'pillar3' },
    { number: '4', key: 'pillar4' },
  ];

  const gridServices = [
    { name: 'CMS and ALICE', description: 'high-energy-physics' },
    { name: 'MoIDynGrid', description: 'molecular-biology' },
    { name: 'VIRGO.UA', description: 'cosmology-and-astrophysics' },
    {
      name: 'SysBio',
      description: 'reconstruction-gene',
    },
    {
      name: 'MatModEn',
      description: 'mathematical-modelling',
    },
    {
      name: 'Medgrid',
      description: 'medical-grid-system',
    },
    {
      name: 'Multiscale',
      description: 'solution-wide-range',
    },
    {
      name: 'GEOPAR3D',
      description: 'calculation-of-three-dimensional',
    },
    { name: 'CompuChemGridUA', description: 'quantum-chemistry' },
  ];

  const checklistItems = [
    'computing and storage resources',
    'consultancy services',
    'software development',
    'integration of applications (porting)',
    'training',
  ];

  return (
    <>
      <Head>
        <title>DIH | Хмарні технології</title>
      </Head>
      <main className='w-full flex flex-col'>
        <div className='w-full lg:pt-24 pt-12 pb-16 flex-1'>
          {/* Breadcrumbs */}

          {/* Page Title */}
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
              </span>{' '}
              {'>'} {t('breadcrumb-3')}
            </div>
            <h1 className='text-xl lg:text-3xl font-bold mt-4 lg:mt-8'>
              {t('title')}
            </h1>
          </section>

          {/* Service Cards Grid */}
          <section className='w-full pb-12 px-8 lg:px-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 place-items-center'>
              {serviceCards.map((card, index) => (
                <div
                  key={card.id}
                  className={`self-center relative overflow-hidden rounded-3xl h-[180px] md:h-[200px] lg:h-[230px] w-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300${index === serviceCards.length - 1 && serviceCards.length % 2 !== 0 ? ' md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className='absolute inset-0 bg-blue-primary/70'></div>
                  <div className='relative z-10 text-white text-xl lg:text-2xl font-semibold px-4 text-center'>
                    {t(`serviceCards-${index + 1}`)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Introduction Text */}
          <section className='w-full pb-12 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('introduction')}
            </p>
          </section>

          {/* Four Pillars */}
          <section className='w-full pb-12 px-8 lg:px-20 flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-y-16 lg:gap-x-28 max-w-5xl'>
              {pillars.map(pillar => (
                <div
                  key={pillar.number}
                  className='flex flex-col items-center text-center'
                >
                  <div className='text-6xl lg:text-8xl font-semibold text-blue-secondary mb-4'>
                    {pillar.number}
                  </div>
                  <p className='text-lg lg:text-xl leading-relaxed text-left'>
                    {t(`pillars-${pillar.number}`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Ukrainian National Grid Section */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed mb-6'>
              {t('ukrainianGrid-intro')}
            </p>

            <div className='space-y-4 max-w-5xl'>
              {checklistItems.map((item, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <ReactIcon width={32} height={32} className='shrink-0' />
                  <span className='text-lg lg:text-xl'>
                    {t(`ukrainianGrid-services-${index + 1}`)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Service Providers Title */}
          <section className='w-full pt-4 pb-4 px-8 lg:px-20'>
            <h2 className='text-xl lg:text-2xl font-bold'>
              {t('providers-title')}
            </h2>
          </section>

          {/* EGI Federation Section */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('providers-egi-intro')}
            </p>

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <ReactIcon width={32} height={32} className='shrink-0' />

                <p className='text-lg lg:text-xl leading-relaxed'>
                  {t('providers-egi-point-1')}
                </p>
              </div>

              <div className='flex items-center gap-3'>
                <ReactIcon width={32} height={32} className='shrink-0' />

                <p className='text-lg lg:text-xl leading-relaxed'>
                  {t('providers-egi-point-2')}
                </p>
              </div>
            </div>
          </section>

          {/* EOSC DIH Section */}
          <section className='w-full pb-8 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('providers-eosc-intro')}
            </p>

            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('providers-eosc-registered')}
            </p>

            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('providers-eosc-project')}
            </p>

            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('providers-eosc-ukrainianGrid')}
            </p>
          </section>

          {/* Grid Services Table */}
          <section className='w-full pb-12 px-8 lg:px-20'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {gridServices.map((service, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center text-center p-4'
                >
                  <h3 className='text-lg lg:text-xl font-bold mb-2'>{service.name}</h3>
                  <p className='text-lg lg:text-xl'>
                    {t(service.description)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* UNG Partnership Section */}
          <section className='w-full pb-6 px-8 lg:px-20'>
            <p className='text-lg lg:text-xl leading-relaxed max-w-5xl'>
              {t('partnership-ung')}
            </p>
          </section>

          {/* Experience & Use Cases */}
          <section className='w-full px-8 lg:px-20'>
            <h2 className='text-xl lg:text-2xl font-bold mb-6'>
              {t('experience-title')}
            </h2>

            <p className='text-lg lg:text-xl leading-relaxed max-w-5xl mb-4'>
              {t('experience-intro')}{' '}
              <a
                href='https://www.egi.eu/wp-content/uploads/2017/08/EGI_Use_Cases.pdf'
                className='underline'
              >
                {t('experience-linkText1')}
              </a>
              .
            </p>

            <p className='text-lg lg:text-xl leading-relaxed max-w-5xl mb-4'>
              {t('experience-seeAlso')}{' '}
              <a
                href='https://www.egi.eu/solutions/success-stories'
                className='underline'
              >
                {t('experience-linkText2')}
              </a>
              .
            </p>

            <p className='text-lg lg:text-xl leading-relaxed max-w-5xl'>
              {t('experience-ongoing')}{' '}
              <a
                href='https://eosc-dih.eu/pilots'
                className='underline'
              >
                {t('experience-linkText3')}
              </a>
              .
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
