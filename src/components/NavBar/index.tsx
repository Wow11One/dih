// import { AppLogo, BritishFlag, FrenchFlag, SpanishFlag, UkrainianFlag } from '@/components/Icons';
// import { ApplicationRoutes } from '@/constants/applicationRoutes';
// import { ApplicationLanguages } from '@/constants/languages';
// import { navigationItems } from '@/constants/navigationItems';
// import screenSizes from '@/constants/screenSizes';
// import useChangePage from '@/hooks/useChangePage';
// import useLocationSearch from '@/hooks/useLocationSearch';
// import { useOutsideClick } from '@/hooks/useOutsideClick';
// import useScreenSizeType from '@/hooks/useScreenSizeType';
// import { Check, ChevronDown, ChevronRight, Facebook, Linkedin, Mail, Menu } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
// import { useIntl } from 'react-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchInput from '../SearchInput';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import MenuIcon from '../icons/Menu';
import { it } from 'node:test';

// const languages = [
//   {
//     logo: <BritishFlag className='size-8 lg:size-10' />,
//     name: ApplicationLanguages.English,
//   },
//   {
//     logo: <UkrainianFlag className='size-8 lg:size-10' />,
//     name: ApplicationLanguages.Ukrainian,
//   },
//   {
//     logo: <FrenchFlag className='size-8 lg:size-10' />,
//     name: ApplicationLanguages.French,
//   },
//   {
//     logo: <SpanishFlag className='size-8 lg:size-10' />,
//     name: ApplicationLanguages.Spanish,
//   },
// ];

const routes = [
  {
    name: 'main',
    link: '/',
  },
  {
    name: 'about-us',
    link: '/about-us',
  },
  {
    name: 'innovation-center',
    link: '/innovation-center',
  },
  {
    name: 'science-service',
  },
  {
    name: 'fiware',
  },
  {
    name: 'news',
    link: '/news',
  },
];

const Navbar: FC<NavbarProps> = () => {
  //   const { formatMessage } = useIntl();
  //   const changePage = useChangePage();
  //   const locationSearch = useLocationSearch();
  //   const currentScreenType = useScreenSizeType();
  //   const { isBiggerThanCurrentSizeType, sizeTypes } = screenSizes;
  const { locale, asPath, push } = useRouter();
  const t = useTranslations('Navbar');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLanguageBarOpen, setIsLanguageBarOpen] = useState<boolean>(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null,
  );
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  //   const sidebarRef = useOutsideClick(() => setIsSidebarOpen(false), [headerRef]);
  //   const languageRef = useOutsideClick(() => setIsLanguageBarOpen(false));

  const toggleMobileSubmenu = (itemName: string) => {
    setExpandedMobileMenu(expandedMobileMenu === itemName ? null : itemName);
  };
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > headerHeight + 50
      ) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current?.offsetHeight) {
      setHeaderHeight(headerRef.current?.offsetHeight);
    }
  }, [headerRef.current?.offsetHeight]);

  return (
    <>
      <header
        className={`fixed bg-white w-full z-50 transition-transform duration-300 ${
          showHeader || isSidebarOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        ref={headerRef}
      >
        <div className='w-full mx-auto my-auto px-4 md:px-10 lg:px-16 z-50 relative'>
          <div className='flex items-center justify-between w-full'>
            {/* Logo */}
            <div className='w-full flex items-center justify-between xl:justify-baseline gap-10'>
              <div className='xl:hidden'>
                <MenuIcon
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                  className='size-8 cursor-pointer'
                />
              </div>

              <img
                src='/header/nosc.png'
                alt='nosc'
                className='w-[150px] h-[84px] lg:w-[170px] lg:h-[95px]'
              />

              <img
                className='hidden xl:block'
                src='/header/edih.png'
                alt='edih'
                width={140}
                height={55}
              />

              <img
                className='hidden xl:block'
                src='/header/fiware.png'
                alt='fiware'
                width={230}
                height={40}
              />

              <div />
            </div>

            {/* Desktop Right Side */}
            <div className='hidden xl:flex items-center xl:space-x-12 text-xl'>
              <div className='flex items-center gap-1'>
                <Link
                  href={asPath}
                  locale='uk'
                  className={`${locale === 'uk' ? 'font-bold' : ''}`}
                >
                  UA
                </Link>
                <div>|</div>
                <Link
                  href={asPath}
                  locale='en'
                  className={`${locale === 'en' ? 'font-bold' : ''}`}
                >
                  EN
                </Link>
              </div>

              <SearchInput />
            </div>
          </div>

          <nav
            className={`absolute w-full left-0 -bottom-12 px-20 transition-opacity hidden xl:flex items-center justify-between text-white text-xl ${
              showHeader || isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {routes.map(item => (
              <Link
                aria-disabled={!!item.link}
                className={`${
                  !item.link ? 'pointer-events-none opacity-40' : ''
                } hover:underline underline-offset-2 ${['/news', '/innovation-center'].some((item) => pathname.startsWith(item)) ? 'text-black' : ''}`}
                href={item.link || ''}
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <>
          <div
            className={`overflow-y-auto xl:hidden fixed z-50 left-0 h-screen w-[50%] bg-white transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{
              top: headerHeight
            }}
            // ref={sidebarRef}
          >
            <div className='flex flex-col h-full'>
              {/* Mobile Navigation */}
              <nav className='flex-1 px-4 py-6'>
                <ul className='space-y-8'>
                  {routes.map(item => (
                    <li key={item.name}>
                      {false ? (
                        <div>
                          <button
                            onClick={() => toggleMobileSubmenu(item.name)}
                            className={`text-white hover:text-blue-primary transition-colors duration-200 text-left text-xl font-semibold w-full flex items-center gap-1 ${
                              pathname.startsWith(item.link || '')
                                ? // || item.subItems?.some(route => route.route === pathname)
                                  'bg-blue-primary'
                                : ''
                            }`}
                          >
                            <span>
                              {/* {t({ id: item.name })} */}
                              {t(item.name)}
                            </span>
                            {/* <ChevronRight
                              className={`w-5 h-5 transition-transform duration-200 ${
                                expandedMobileMenu === item.name ? 'rotate-90' : ''
                              }`}
                            /> */}
                          </button>
                          {/* {expandedMobileMenu === item.name && (
                            <ul className='mt-3 ml-4 space-y-4'>
                              {item.subItems?.map(subItem => (
                                <li key={subItem.name}>
                                  <button
                                    onClick={() => {
                                      //changePage({ pathname: subItem.route! });
                                      setIsSidebarOpen(false);
                                    }}
                                    className={`cursor-pointer text-gray-300 hover:text-teal-300 transition-colors duration-200 text-left text-lg ${
                                      subItem.route === pathname ? 'font-semibold' : ''
                                    }`}
                                  >
                                    {formatMessage({ id: subItem.name })}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )} */}
                        </div>
                      ) : (
                        <button
                          className={`cursor-pointer text-blue-primary transition-colors duration-200 text-left text-xl font-medium w-full disabled:opacity-50 ${
                            pathname.startsWith(item.link || '') ? 'text-blue-primary' : ''
                          }`}
                          disabled={!item.link}
                          onClick={() => {
                            if (!item.link) return;
                            push(item.link);
                            setIsSidebarOpen(false);
                          }}
                        >
                          {t(item.name)}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </>
      </header>

      <div
        className='bg-transparent w-full'
        style={{
          height: headerHeight,
        }}
      />
    </>
  );
};

export interface NavbarProps {}

export default Navbar;
