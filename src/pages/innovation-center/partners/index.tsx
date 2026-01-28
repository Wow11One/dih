import CommentIcon from '@/components/icons/Comment';
import NewsDateIcon from '@/components/icons/NewsDate';
import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function InnovationCenterPartners() {
  const t = useTranslations('InnovationCenterPartners');
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>DIH | Partners</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section
          className='bg-no-repeat bg-cover bg-center w-full lg:py-14 py-8 flex-1'
          style={{
            backgroundImage:
              'url("/innovation-center/partners/background.webp")',
          }}
        >
          <div className='flex flex-col gap-4 px-8 lg:px-20 text-white mt-5 lg:mt-8'>
            <div className='text-lg lg:text-xl italic'>
              <span className='cursor-pointer' onClick={() => push('/innovation-center')}>
                {t('title')}
              </span> {'>'} {t('partners')}
            </div>
          </div>
          <div className='h-full flex w-full flex-col items-start justify-center px-8 lg:px-24 mt-5 lg:mt-8'>
            <h2 className='w-full flex items-center text-2xl lg:text-3xl font-bold text-center mb-5 lg:mb-8 text-white'>
              <div className='flex-1 items-center text-center'>
                {t('international-partners')}
              </div>
            </h2>
            <div className='w-full'>
              <div className='bg-[#DDFDFF]/20 backdrop-blur-md rounded-[36px] py-12 lg:py-16 px-8 lg:px-16'>
                <div className='flex flex-wrap items-center justify-center gap-8 lg:gap-12'>
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-center'
                    >
                      <Image
                        src={partner.image}
                        alt={partner.alt}
                        width={partner.width}
                        height={partner.height}
                        className='object-contain transition-transform hover:scale-110'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='my-8 lg:my-16 mx-8 lg:mx-16 flex flex-col gap-4 lg:gap-8'>
          <div className='flex flex-col gap-3 lg:gap-8'>
            <h3 className='font-bold text-xl lg:text-3xl lg:text-left text-center'>
              {t('ecosystem-participant')}
            </h3>
            <div className='flex flex-col gap-6'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div className='flex items-center gap-4'>
                  <ReactIcon width={32} height={32} className='shrink-0' />
                  <div className='text-lg lg:text-xl max-w-[85%]'>
                    {t(`ecosystem-participant-${index + 1}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3 lg:gap-6'>
            <h3 className='font-bold text-xl lg:text-3xl lg:text-left text-center'>
              {t('dih-network')}
            </h3>
            <div className='flex flex-col gap-6'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div className='flex items-center gap-4'>
                  <ReactIcon width={32} height={32} className='shrink-0' />
                  <div className='text-lg lg:text-xl max-w-[85%]'>
                    {t(`dih-network-${index + 1}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-3 lg:gap-6'>
            <h3 className='font-bold text-xl lg:text-3xl lg:text-left text-center'>
              {t('enterprise')}
            </h3>
            <div className='flex flex-col gap-6'>
              {Array.from({ length: 10 }).map((_, index) => (
                <div className='flex items-center gap-4'>
                  <ReactIcon width={32} height={32} className='shrink-0' />
                  <div className='text-lg lg:text-xl max-w-[85%]'>
                    {t(`enterprise-${index + 1}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const partners = [
    {
      image: '/innovation-center/partners/dashboard/fiware.webp',
      alt: 'FIWARE',
      width: 210,
      height: 50,
    },
    {
      image: '/innovation-center/partners/dashboard/wageningen.webp',
      alt: 'Wageningen University',
      width: 190,
      height: 40,
    },
    {
      image: '/innovation-center/partners/dashboard/nicosia.webp',
      alt: 'University of Nicosia',
      width: 230,
      height: 40,
    },
    {
      image: '/innovation-center/partners/dashboard/uni-systems.webp',
      alt: 'Uni Systems',
      width: 150,
      height: 65,
    },
    {
      image: '/innovation-center/partners/dashboard/okp4.webp',
      alt: 'ØKP4',
      width: 120,
      height: 35,
    },
    {
      image: '/innovation-center/partners/dashboard/rez-brands.webp',
      alt: 'REZ Brands',
      width: 140,
      height: 80,
    },
    {
      image: '/innovation-center/partners/dashboard/smart-agro.webp',
      alt: 'Smart Agro Hub',
      width: 170,
      height: 85,
    },
    {
      image: '/innovation-center/partners/dashboard/ubitech.webp',
      alt: 'Ubitech',
      width: 205,
      height: 35,
    },
    {
      image: '/innovation-center/partners/dashboard/zeropovoka.webp',
      alt: 'Zeropovoka',
      width: 185,
      height: 70,
    },
    {
      image: '/innovation-center/partners/dashboard/hao.webp',
      alt: 'HAO',
      width: 230,
      height: 45,
    },
    {
      image: '/innovation-center/partners/dashboard/insme.webp',
      alt: 'INSME',
      width: 205,
      height: 65,
    },
    {
      image: '/innovation-center/partners/dashboard/agrotransilvania.webp',
      alt: 'AgroTransilvania Cluster',
      width: 200,
      height: 35,
    },
    {
      image: '/innovation-center/partners/dashboard/lietuvos.webp',
      alt: 'Lietuvos',
      width: 155,
      height: 80,
    },
    {
      image: '/innovation-center/partners/dashboard/dih-agrifood.webp',
      alt: 'DIH AgriFoodCroatia',
      width: 250,
      height: 30,
    },
  ];

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      locale,
    },
  };
};
