import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

const menuItems = [
  { key: 'menu-1', link: '/science-services/eosc' },
  { key: 'menu-2', link: '/science-services/egi' },
  { key: 'menu-3', link: '/science-services/ung' },
  { key: 'menu-4', link: '/science-services/biology' },
  { key: 'menu-5', link: '/science-services/ecology' },
  { key: 'menu-6', link: '/science-services/high-energy-physics' },
];

export default function ScienceServicesPage() {
  const t = useTranslations('ScienceServices');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | {t('title')}</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='w-full lg:pt-16 pt-10 flex-1'>
          <div className='h-full flex flex-col flex-1 items-start px-8 lg:px-20'>
            <h1 className='text-xl lg:text-2xl font-bold mt-6 lg:mt-10 mb-8'>
              {t('title')}
            </h1>

            {/* Menu */}
            <div className='flex flex-col gap-4 lg:gap-6 mb-12'>
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  disabled={!item.link}
                  onClick={() => item.link && push(item.link)}
                  className='font-bold text-left text-lg lg:text-xl underline underline-offset-2 disabled:opacity-50 enabled:cursor-pointer hover:opacity-80 transition-opacity'
                >
                  {t(item.key)}
                </button>
              ))}
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
