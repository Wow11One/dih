import CommentIcon from '@/components/icons/Comment';
import NewsDateIcon from '@/components/icons/NewsDate';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function NewsById() {
  const t = useTranslations('News');
  const { query } = useRouter();
  const id = query.id;

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
                <div className='text-lg lg:text-xl italic'>
                  {t('title')} {'>'} {news.title}
                </div>
              </div>
            </div>

            <div className='mt-4 lg:mt-8 space-y-8 lg:space-y-16'>
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <div className='text-xl lg:text-2xl font-bold'>
                    {news.title}
                  </div>
                  <div className='flex gap-1.5 items-center'>
                    <div style={{ paddingTop: 3 }}>
                      <NewsDateIcon />
                    </div>
                    <div className='text-lg lg:text-xl'>{news.date}</div>
                  </div>
                </div>

                <div
                  className='text-lg lg:text-xl'
                  dangerouslySetInnerHTML={{
                    __html: news.description,
                  }}
                />

                <img
                  src='/news/nosc-dih.webp'
                  alt='news image'
                  className='h-[90%]'
                />

                <div className='flex flex-col gap-3 text-lg lg:text-xl'>
                  <div className='flex items-center gap-1'>
                    <CommentIcon />
                    <div className='italic'>{t('leaveComment')}</div>
                  </div>

                  <div className='italic'>{t('authorizeToLeaveComment')}</div>
                </div>
              </div>
              {/* {news.map(item => (
                <div className='flex flex-col gap-4 lg:gap-6'>
                  <div className='space-y-2'>
                    <div className='text-xl lg:text-2xl font-bold underline underline-offset-2'>
                      {item.title}
                    </div>
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
              ))} */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const id = params?.id;
  return {
    props: {
      id,
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};

const news = {
  title: 'NOSC-UA DIH надаватиме підтримку стартапам',
  date: '14.02.25',
  description: 'NOSC-UA DIH надаватиме підтримку стратапам Стартап-школи Academ.City, що стала одним з шести переможців конкурсного відборукспериментального проєкту Міністерства освіти і науки України зі створенння стартап-шкіл–інкубаторів–акселераторів на базі закладів вищої освіти та наукових установ. Під час презентації старту проєкту, який реалізується КАУ у партнерстві з Національним університетом «Києво-Могилянська академія»,керівник Віртуального центру цифрових інновацій Володимир Ночвай розповів, про заплановані воркшопи для учасників стартап-школи з упровадження цифрових рішень.<br /> <br /> Більше інформації за посиланням “Як академічні стартапи стають рушійною силою інноваційної економіки. (Пост-анонс Стартап-школа Academ.city)”'
};


