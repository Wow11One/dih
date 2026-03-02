import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

const serviceIds = ['service-1', 'service-2', 'service-3', 'service-4'];
const toolIds = ['tool-1', 'tool-2', 'tool-3'];
const projectIds = ['project-1', 'project-2'];

export default function SoftwareArchitecturePage() {
  const t = useTranslations('SoftwareArchitecture');
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
                onClick={() => push('/innovation-center/digital-technologies')}
              >
                {t('breadcrumb-2')}
              </span>
              {' > '}
              {t('breadcrumb-3')}
            </div>
          </section>

          {/* Services Section */}
          <section className='w-full pb-10 px-8 lg:px-20'>
            <h1 className='text-xl lg:text-2xl font-bold mb-6'>
              {t('services-title')}
            </h1>

            <h2 className='text-lg lg:text-xl font-bold mb-4'>
              {t('autotuning')}
            </h2>

            {/* Intro paragraphs */}
            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('intro-1')}
            </p>
            <p className='text-lg lg:text-xl leading-relaxed mb-6'>
              {t('intro-2')}
            </p>

            {/* Bullet service items */}
            <div className='space-y-4 mb-6'>
              {serviceIds.map(id => (
                <div key={id} className='flex items-center gap-3'>
                  <ReactIcon width={32} height={32} className='shrink-0 mt-1' />
                  <span className='text-lg lg:text-xl leading-relaxed'>
                    {t(id)}
                  </span>
                </div>
              ))}
            </div>

            {/* Named tools */}
            <div className='space-y-6 pl-11'>
              {toolIds.map((id, index) => (
                <div key={id}>
                  <p className='text-lg lg:text-xl font-bold mb-1 italic'>
                    {t(`${id}-title`)}
                  </p>
                  {index === 0 && (
                    <p className='text-lg lg:text-xl font-bold mb-1 italic'>
                      {t('constructor-title')}
                    </p>
                  )}

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
            <p className='text-lg lg:text-xl leading-relaxed mb-4'>
              {t('provider-description-1')}
            </p>
            <p className='text-lg lg:text-xl leading-relaxed'>
              {t('provider-description-2')}
            </p>
          </section>

          {/* Projects Section */}
          <section className='w-full px-8 lg:px-20'>
            <h2 className='text-xl lg:text-2xl font-bold mb-6'>
              {t('projects-title')}
            </h2>
            <div className='space-y-4'>
              {projectIds.map(id => (
                <div key={id} className='flex items-center gap-3'>
                  <ReactIcon width={32} height={32} className='shrink-0 mt-1' />
                  <span className='text-lg lg:text-xl leading-relaxed'>
                    {t(id)}
                  </span>
                </div>
              ))}
            </div>
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
