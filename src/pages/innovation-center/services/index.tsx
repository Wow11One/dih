import ReactIcon from '@/components/icons/React';
import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function InnovationCenterServices() {
  const t = useTranslations('InnovationCenterServices');
  const { push } = useRouter();
  
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      title: t('service-1-title'),
      description: t('service-1-description'),
    },
    {
      title: t('service-2-title'),
      description: t('service-2-description'),
    },
    {
      title: t('service-3-title'),
      description: t('service-3-description'),
    },
    {
      title: t('service-4-title'),
      description: t('service-4-description'),
    },
    {
      title: t('service-5-title'),
      description: t('service-5-description'),
    },
    {
      title: t('service-6-title'),
      description: t('service-6-description'),
    },
    {
      title: t('service-7-title'),
      description: t('service-7-description'),
    },
    {
      title: t('service-8-title'),
      description: t('service-8-description'),
    },
    {
      title: t('service-9-title'),
      description: t('service-9-description'),
    },
    {
      title: t('service-10-title'),
      description: t('service-10-description'),
    },
    {
      title: t('service-11-title'),
      description: t('service-11-description'),
    },
    {
      title: t('service-12-title'),
      description: t('service-12-description'),
    },
  ];

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>DIH | Services</title>
      </Head>
      <main className='w-full flex flex-col flex-1'>
        <section
          className='bg-no-repeat bg-cover bg-center bg-fixed w-full lg:py-14 py-8 flex-1'
          style={{
            backgroundImage:
              'url("/innovation-center/services/background.jpg")',
          }}
        >
          <div className='flex flex-col gap-4 px-8 lg:px-20 text-white mt-6 lg:mt-10'>
            <div className='text-lg lg:text-xl italic'>
              <span
                className='cursor-pointer'
                onClick={() => push('/innovation-center')}
              >
                {t('breadcrumb')}
              </span> {'>'} {t('title')}
            </div>
          </div>

          <div className='h-full flex flex-col items-start justify-center px-5 lg:px-14 mt-6 lg:mt-10'>
            {/* Header Section */}
            <div className='flex-1 w-full mb-8 lg:mb-12'>
              <div className='flex flex-col items-center gap-6 text-white bg-[#DDFDFF]/10 backdrop-blur-xl rounded-4xl py-12 lg:py-16 px-8 lg:px-16'>
                <h1 className='text-2xl lg:text-4xl font-bold text-center'>
                  {t('title')}
                </h1>
                <p className='text-lg lg:text-xl leading-7.5 text-center max-w-4xl'>
                  {t('description')}
                </p>
              </div>
            </div>

            {/* Services List */}
            <div className='w-full'>
              <div className='bg-white backdrop-blur-md rounded-4xl py-8 lg:py-12 px-6 lg:px-12'>
                <div className=''>
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className='border-b border-gray-200 last:border-b-0'
                    >
                      <button
                        onClick={() => toggleService(index)}
                        className='w-full flex items-center gap-4 lg:gap-6 py-6 text-left hover:bg-blue-primary/5 transition-colors duration-200 px-4'
                      >
                        <ReactIcon
                          width={32}
                          height={32}
                          className='shrink-0 mt-1'
                        />
                        <div className='flex-1'>
                          <h3 className='text-lg lg:text-xl font-semibold'>
                            {service.title}
                          </h3>
                        </div>
                        <svg
                          className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                            expandedService === index ? 'rotate-180' : ''
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </button>

                      {/* Expandable Description */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedService === index
                            ? 'max-h-[2000px] opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className='px-4 lg:px-16 pb-6 pt-2'>
                          <div className='text-base lg:text-lg text-gray-700 leading-relaxed whitespace-pre-line'>
                            {service.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
