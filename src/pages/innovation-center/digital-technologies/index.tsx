import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function DigitalTechnologiesPage() {
  const t = useTranslations('DigitalTechnologies');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | {t('title')}</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        {/* Hero Section */}
        <section className='w-full lg:pt-16 pt-10 pb-16 flex-1'>
          <div className='h-full flex flex-col flex-1 items-start justify-center px-8 lg:px-20'>
            <div className='flex flex-col gap-4 mt-6'>
              <div className='text-lg lg:text-xl italic'>
                <span
                  className='cursor-pointer'
                  onClick={() => push('/innovation-center')}
                >
                  {t('breadcrumb')}
                </span>{' '}
                {'>'} {t('title')}
              </div>
            </div>
            {/* Navigation Menu */}
            <div className='mt-6 lg:mt-10'>
              <div className='flex items-start flex-col gap-4 lg:gap-8'>
                {[
                  {
                    link: '/innovation-center/digital-technologies/cloud-technologies',
                  },
                  {
                    link: '/innovation-center/digital-technologies/artificial-intelligience',
                  },
                  {
                    link: '/innovation-center/digital-technologies/cybersecurity',
                  },
                  {
                    link: '/innovation-center/digital-technologies/blockchain',
                  },
                  {
                    link: '/innovation-center/digital-technologies/software-architecture',
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    disabled={!item.link}
                    onClick={() => item.link && push(item.link)}
                    className='font-bold enabled:cursor-pointer text-lg lg:text-xl underline underline-offset-2 disabled:opacity-50 hover:opacity-80 transition-opacity'
                  >
                    {t(`menu-${index + 1}`)}
                  </button>
                ))}
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
