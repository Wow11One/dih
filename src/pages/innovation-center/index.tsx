import CommentIcon from '@/components/icons/Comment';
import NewsDateIcon from '@/components/icons/NewsDate';
import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function InnovationCenter() {
  const t = useTranslations('InnovationCenter');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | Innovation center</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='w-full lg:pt-28 pt-14 pb-16 flex-1'>
          <div className='h-full flex flex-col flex-1 items-start justify-center px-5 lg:px-14'>
            <div className='flex gap-8 lg:gap-16'>
              <div className='flex flex-col gap-4'>
                <div className='text-xl lg:text-2xl font-bold'>
                  {t('title')}
                </div>
              </div>

              {/* <div className='self-end text-lg lg:text-xl'>
                {t('category')} ∨
              </div> */}
            </div>

            <div className='mt-6 lg:mt-10'>
              <div className='flex items-start flex-col gap-4 lg:gap-8'>
                {[
                  {
                    //link: 'innovation-center/services',
                  },
                  {
                    link: 'innovation-center/partners',
                  },
                  {
                    //link: 'innovation-center/trainings',
                  },
                  {
                    //link: 'innovation-center/projects',
                  },
                ].map((item, index) => (
                  <button
                    disabled={!item.link}
                    onClick={() => push(item.link)}
                    className='enabled:cursor-pointer text-lg lg:text-xl font-semibold underline underline-offset-2 disabled:opacity-50'
                  >
                    {t(`menu-${index + 1}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-6 lg:mt-10'>
              <p className='text-lg lg:text-xl'>{t('description')}</p>
            </div>

            <div className='mt-6 lg:mt-10 lg:px-8 w-full'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10 w-full'>
                {[
                  {
                    image: '/innovation-center/ai.webp',
                  },
                  {
                    image: '/innovation-center/data-space.webp',
                  },
                  {
                    image: '/innovation-center/blockchain.webp',
                  },
                  {
                    image: '/innovation-center/digital-technology.webp',
                  },
                  {
                    image: '/innovation-center/esg-technology.webp',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className='relative overflow-hidden rounded-[36px] py-10 lg:py-20 px-4 min-h-[120px] flex items-center justify-center'
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className='absolute inset-0 bg-blue-primary/70'></div>
                    <div className='relative z-10 text-white font-medium flex items-center justify-center'>
                      <div className='text-lg lg:text-2xl font-bold'>
                        {t(`services-${index + 1}`)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-6 lg:mt-10'>
              <p className='text-lg lg:text-xl'>{t('generalModel')}</p>
              <div className='mt-5 lg:mt-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6 lg:gap-y-6 px-8 lg:px-16'>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div className='flex items-center gap-4'>
                      <ReactIcon width={32} height={32} className='shrink-0' />
                      <div className='text-lg lg:text-xl'>
                        {t(`technologies-${index + 1}`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='mt-6 lg:mt-10'>
              <p className='text-lg lg:text-xl'>{t('purpose')}</p>
              <div className='mt-5 lg:mt-8'>
                <div className='grid grid-cols-1 gap-x-24 gap-y-6 lg:gap-y-6 px-8 lg:px-16'>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className='flex items-center gap-4'>
                      <ReactIcon width={32} height={32} className='shrink-0' />
                      <div className='text-lg lg:text-xl'>
                        {t(`purpose-${index + 1}`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='mt-6 lg:mt-10'>
          <section
            className='bg-no-repeat bg-cover bg-center w-full lg:py-14 py-8 flex-1'
            style={{
              backgroundImage: 'url("/innovation-center/background.webp")',
            }}
          >
            <div className='h-full flex flex-col items-start justify-center px-5 lg:px-14'>
              <div className='flex-1'>
                <div className='flex flex-col gap-8 text-white bg-[#DDFDFF]/10 backdrop-blur-xl rounded-4xl py-12 lg:py-32 px-8 lg:px-16'>
                  <p className='text-lg lg:text-xl leading-7.5'>{t('description-1')}</p>
                  <p className='text-lg lg:text-xl leading-7.5'>{t('description-2')}</p>
                </div>
              </div>
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
