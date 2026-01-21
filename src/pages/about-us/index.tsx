import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';


export default function AboutUs() {
  const t = useTranslations('AboutUs');

  return (
    <>
      <Head>
        <title>DIH | About us</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section
          className='bg-no-repeat bg-cover bg-center w-full lg:pt-28 pt-14 pb-16 flex-1'
          style={{
            backgroundImage: 'url("/landing/preview.webp")',
          }}
        >
          <div className='h-full flex flex-col flex-1 items-start justify-center px-5 lg:px-14'>
            <div className='text-white bg-[#DDFDFF]/10 backdrop-blur-xl rounded-4xl py-6 lg:py-10 px-8 lg:px-16'>
              <p className='text-lg lg:text-xl'>{t('paragraph-1')}</p>
            </div>

            <div className='mt-6 lg:mt-12 text-white bg-[#DDFDFF]/10 backdrop-blur-xl rounded-4xl py-6 lg:py-10 px-8 lg:px-16'>
              <div className='flex flex-col text-lg lg:text-xl gap-7 lg:gap-14'>
                {[2, 3, 4].map((index) => (
                  <p>{t(`paragraph-${index}`)}</p>
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
  console.log('(await import(`@/messages/${locale}.json`))', (await import(`@/messages/${locale}.json`)).default)
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    }
  };
};