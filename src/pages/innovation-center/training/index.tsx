import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function InnovationCenterTraining() {
  const t = useTranslations('InnovationCenterTraining');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | Training & Courses</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='w-full lg:pt-28 pt-14 pb-8 flex-1'>
          <div className='h-full flex flex-col flex-1 items-start justify-center px-5 lg:px-14'>
            {/* Breadcrumb */}
            <div className='text-lg lg:text-xl italic'>
              <span
                className='cursor-pointer'
                onClick={() => push('/innovation-center')}
              >
                {t('breadcrumb')}
              </span>{' '}
              {'>'} {t('title')}
            </div>

            {/* EOSC Section */}
            <div className='w-full my-12 lg:my-16'>
              <h2 className='text-2xl lg:text-3xl font-bold mb-6'>EOSC</h2>
              <a
                href='https://marketplace.eosc-portal.eu/services/c/training-support'
                className='text-base lg:text-lg mb-6 underline underline-offset-2'
                target='_blank'
              >
                Training & Support
              </a>
            </div>

            {/* EGI Section */}
            <div className='w-full mb-12 lg:mb-16'>
              <h2 className='text-2xl lg:text-3xl font-bold mb-6 lg:mb-8'>
                EGI
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
                <div
                  className='bg-no-repeat bg-cover bg-center rounded-4xl overflow-hidden'
                  style={{
                    backgroundImage:
                      'url("/innovation-center/training/events.webp")',
                  }}
                >
                  <div className='w-full h-[200px] lg:h-[250px] bg-blue-primary/70 rounded-4xl flex items-center justify-center'>
                    <div className='text-white font-bold text-xl lg:text-2xl'>
                      {t('events')}
                    </div>
                  </div>
                </div>

                <div
                  className='bg-no-repeat bg-cover bg-center rounded-4xl overflow-hidden'
                  style={{
                    backgroundImage:
                      'url("/innovation-center/training/training.webp")',
                  }}
                >
                  <div className='w-full h-[200px] lg:h-[250px] bg-blue-primary/70 rounded-4xl flex items-center justify-center'>
                    <div className='text-white font-bold text-xl lg:text-2xl'>
                      {t('training')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KAU Section */}
            <div className='w-full mb-6 lg:mb-8'>
              <h2 className='text-2xl lg:text-3xl font-bold mb-6 lg:mb-8'>
                KAU
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
                <div
                  className='bg-no-repeat bg-cover bg-center rounded-4xl overflow-hidden'
                  style={{
                    backgroundImage:
                      'url("/innovation-center/training/courses.webp")',
                  }}
                >
                  <div className='w-full h-[200px] lg:h-[250px] bg-blue-primary/70 rounded-4xl flex items-center justify-center'>
                    <div className='text-white font-bold text-xl lg:text-2xl text-center px-4'>
                      {t('training-courses')}
                    </div>
                  </div>
                </div>

                <div
                  className='bg-no-repeat bg-cover bg-center rounded-4xl overflow-hidden'
                  style={{
                    backgroundImage:
                      'url("/innovation-center/training/lectures.webp")',
                  }}
                >
                  <div className='w-full h-[200px] lg:h-[250px] bg-blue-primary/70 rounded-4xl flex items-center justify-center'>
                    <div className='text-white font-bold text-xl lg:text-2xl text-center px-4'>
                      {t('lectures')}
                    </div>
                  </div>
                </div>
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
