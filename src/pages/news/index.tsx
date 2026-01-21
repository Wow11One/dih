import CommentIcon from '@/components/icons/Comment';
import NewsDateIcon from '@/components/icons/NewsDate';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Link from 'next/link';

export default function News() {
  const t = useTranslations('News');

  return (
    <>
      <Head>
        <title>DIH | News</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section className='w-full lg:pt-28 pt-14 pb-16 flex-1'>
          <div className='h-full flex flex-col flex-1 items-start justify-center px-5 lg:px-14'>
            <div className='flex gap-8 lg:gap-16'>
              <div className='flex flex-col gap-4'>
                <div className='text-xl lg:text-2xl font-bold'>
                  {t('title')}
                </div>

                <div className='text-lg lg:text-xl'>
                  {'<'} 03.10.24 - 17.02.2025 {'>'}
                </div>
              </div>

              {/* <div className='self-end text-lg lg:text-xl'>
                {t('category')} ∨
              </div> */}
            </div>

            <div className='mt-8 lg:mt-14 space-y-8 lg:space-y-16'>
              {news.map(item => (
                <div className='flex flex-col gap-4 lg:gap-6'>
                  <div className='space-y-2'>
                    <Link
                      className='text-xl lg:text-2xl font-bold underline underline-offset-2' 
                      href="/news/1"
                    >
                      {item.title}
                    </Link>
                    <div className='flex gap-1.5 items-center'>
                      <div style={{ paddingTop: 3 }}>
                        <NewsDateIcon />
                      </div>
                      <div className='text-lg lg:text-xl'>
                        {item.date}
                      </div>
                    </div>
                  </div>

                  <div className='text-lg lg:text-xl space-y-2'>
                    <div>
                      {item.description}
                    </div>
                    <div className='flex items-center gap-1'>
                      <CommentIcon />
                      <div className='italic'>
                        {t('leaveComment')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log(
    '(await import(`@/messages/${locale}.json`))',
    (await import(`@/messages/${locale}.json`)).default,
  );
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};

const news = [
  {
    title: 'NOSC-UA DIH надаватиме підтримку стартапам',
    date: '14.02.25',
    description:
      'NOSC-UA DIH надаватиме підтримку стартапам Стартап-школи Academ.City, що стала одним з шести переможців конкурсного відбору eкспериментального проєкту Міністерства освіти і науки України зі створенння стартап-шкіл–інкубаторів–акселераторів на базі закладів вищої освіти та наукових установ. Під час презентації старту проєкту, який реалізується КАУ...',
  },
  {
    title: '10-й Глобальний Саміт FIWARE',
    date: '04.10.24',
    description:
      'Відбувся 10-й Глобальний саміт FIWARE в Неаполі, Італія, став надихаючим заходом, на якому відбулися змістовні дискусії, цінні знайомства та інноваційні ідеї для зміни цифрового майбутнього. На саміті було представлено комплексний порядок денний, який, серед іншого, наголошував на вирішальній ролі місцевої...',
  },
];
