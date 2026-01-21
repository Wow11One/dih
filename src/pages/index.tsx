import DeveloperIcon from '@/components/icons/Developer';
import GlobalLearningIcon from '@/components/icons/GlobalLearning';
import InvestmentSelectionIcon from '@/components/icons/InvestmentSelection';
import LandingNetworkIcon from '@/components/icons/LandingNetwork';
import LandingWifiIcon from '@/components/icons/LandingWifi';
import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';


export default function Landing() {
  const t = useTranslations('Landing');

  return (
    <>
      <Head>
        <title>DIH | Landing</title>
      </Head>
      <main className='w-full'>
        <section
          className='bg-no-repeat bg-cover h-[calc(100vh-98px)] bg-center w-full'
          style={{
            backgroundImage: 'url("/landing/preview.webp")',
          }}
        >
          <div className='h-full flex flex-col flex-1 items-start justify-center px-5 lg:px-14'>
            <div className='text-white bg-[#DDFDFF]/10 max-w-3xl backdrop-blur-xl rounded-4xl py-12 lg:py-24 px-10 lg:px-20 space-y-2 lg:space-y-4'>
              <div className='text-2xl lg:text-6xl font-bold'>
                {t('nosc-is-title')}
              </div>
              <div className='text-lg lg:text-xl'>
                {t('nosc-is-description')}
              </div>
            </div>
          </div>
        </section>

        <section
          className='bg-no-repeat bg-cover h-[calc(100vh)] bg-center'
          style={{
            backgroundImage: 'url("/landing/robotic-hand.webp")',
          }}
        >
          <div className='h-full flex flex-col flex-1 items-end justify-center px-5 lg:px-14'>
            <div className='text-black bg-[#DDFDFF]/15 max-w-4xl backdrop-blur-xl rounded-4xl py-6 lg:py-14 px-6 lg:px-12 space-y-3 lg:space-y-6'>
              <div className='text-xl lg:text-3xl font-bold'>
                {t('nosc-purpose-title')}:
              </div>

              <div className='text-lg lg:text-xl space-y-3 lg:space-y-6'>
                {[1, 2, 3].map(index => (
                  <div className='flex items-center gap-3 lg:gap-6'>
                    <ReactIcon width={32} height={32} />
                    <div>{t(`nosc-purpose-description-${index}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className='mt-8 lg:mt-14 mx-6 lg:mx-10'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-12'>
            {features.map((feature, index) => (
              <div className='flex flex-col items-center gap-4'>
                <div className='rounded-full bg-blue-primary p-6 lg:p-12'>
                  {feature.icon}
                </div>
                <div className='text-left text-lg lg:text-xl'>
                  {t(`feature-${index + 1}`)}
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 lg:mt-12 flex justify-center'>
            <button className='text-lg lg:text-xl font-bold text-white bg-blue-secondary py-5 px-9 rounded-2xl'>
              {t('more-services')}
            </button>
          </div>
        </section>

        <section className='relative mt-4 min-h-screen px-4'>
          <div
            className='bg-no-repeat bg-contain absolute top-0 left-0 -z-1'
            style={{
              backgroundImage: 'url("/landing/coordinates.webp")',
              maxWidth: 900,
              maxHeight: 1025,
            }}
          />

          <div className='font-raleway font-bold text-xl lg:text-3xl text-center pt-10 lg:pt-20'>
            {t('industries-title')}
          </div>
          <div className='mt-10 lg:mt-16 gap-12 lg:gap-24 flex items-center content-center self-stretch flex-wrap justify-center text-white underline underline-offset-2 font-raleway font-bold text-xl lg:text-2xl'>
            {industries.map((industry, index) => (
              <div
                className='bg-no-repeat bg-cover bg-center rounded-4xl'
                style={{
                  backgroundImage: `url("/landing/${industry.image}.webp")`,
                }}
              >
                <div className='text-center w-[330px] h-[300px] bg-blue-primary/70 rounded-4xl flex items-center justify-center'>
                  <div
                    style={{
                      maxWidth: industry.maxWidth,
                    }}
                  >
                    {t(`industries-${index + 1}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='my-10 sm:my-14 lg:my-28 mx-8 sm:mx-12 lg:mx-24'>
          <div className='text-center text-lg lg:text-xl'>
            {t('partners-description')}
          </div>
          <div className='mt-10 lg:mt-14 flex flex-col lg:flex-row justify-center items-center gap-12'>
            <div
              className='bg-no-repeat bg-cover bg-center'
              style={{
                backgroundImage: 'url("/landing/itf.webp")',
                width: '288px',
                height: '168px',
              }}
            />

            <div
              className='bg-no-repeat bg-cover bg-center'
              style={{
                backgroundImage: 'url("/landing/kau.webp")',
                width: '288px',
                height: '264px',
              }}
            />

            <div
              className='bg-no-repeat bg-cover bg-center'
              style={{
                backgroundImage: 'url("/landing/academ-city.webp")',
                width: '288px',
                height: '70px',
              }}
            />
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

const features = [
  {
    icon: <DeveloperIcon />,
  },
  {
    icon: <InvestmentSelectionIcon />,
  },
  {
    icon: <LandingNetworkIcon />,
  },
  {
    icon: <GlobalLearningIcon />,
  },
  {
    icon: <LandingWifiIcon />,
  },
];

const industries = [
  {
    image: 'agriculture',
    maxWidth: '200px',
  },
  {
    image: 'digitalization',
    maxWidth: '200px',
  },
  {
    image: 'green-transition',
    maxWidth: '200px',
  },
  {
    image: 'center-control',
    maxWidth: '300px',
  },
  {
    image: 'new-materials',
    maxWidth: '300px',
  },
];
