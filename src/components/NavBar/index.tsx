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
import Image from 'next/image';

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

const Navbar: FC<NavbarProps> = () => {
  //   const { formatMessage } = useIntl();
  //   const changePage = useChangePage();
  //   const locationSearch = useLocationSearch();
  //   const currentScreenType = useScreenSizeType();
  //   const { isBiggerThanCurrentSizeType, sizeTypes } = screenSizes;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLanguageBarOpen, setIsLanguageBarOpen] = useState<boolean>(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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

      if (currentScrollY > lastScrollY.current && currentScrollY > window.innerHeight / 2.5) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`bg-white w-full z-50 transition-transform duration-300 ${
          showHeader || isSidebarOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        ref={headerRef}
      >
        <div className='mx-auto my-auto px-4 md:px-10 lg:px-16 z-200'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center gap-10'>
              <img src='/header/nosc.png' alt='nosc' width={190} height={110} />

              <img src='/header/edih.png' alt='edih' width={160} height={70} />

              <img src='/header/fiware.png' alt='fiware' width={260} height={50} />
            </div>

            {/* Desktop Navigation */}
            {/* <nav className='hidden xl:flex items-center space-x-14'>
              {navigationItems.map(item => (
                <div key={item.name} className='relative group'>
                  {item.hasDropdown ? (
                    <div className='relative'>
                      <button
                        onClick={() => item.route && changePage({ pathname: item.route })}
                        className={`py-1 text-white group-hover:text-teal-300 transition-colors duration-200 flex items-center space-x-1 text-base ${
                          item.route ? 'cursor-pointer' : ''
                        } ${
                          item.route === pathname ||
                          item.subItems?.some(route => route.route === pathname)
                            ? '!text-teal-300 !font-semibold'
                            : ''
                        }`}
                      >
                        <span className='uppercase'>{formatMessage({ id: item.name })}</span>
                        <ChevronDown className='w-4 h-4' />
                      </button>
                      <div className={`absolute top-full left-0 mt-1 min-w-42 max-w-56 grid grid-cols-1 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 ${showHeader ? 'group-hover:visible' : 'group-hover:invisible'} transition-all duration-200 z-50`}>
                        {item.subItems?.map(subItem => (
                          <button
                            onClick={() => changePage({ pathname: subItem.route })}
                            key={subItem.name}
                            className={`${
                              subItem.route === pathname ? 'font-semibold' : ''
                            } text-blue-primary cursor-pointer block w-full text-left px-4 py-2 bg-white border-x-2 border-blue-secondary hover:bg-blue-secondary hover:text-white transition-all duration-300 first:rounded-t-md first:border-t-2 last:rounded-b-md last:border-b-2`}
                          >
                            {formatMessage({ id: subItem.name })}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => changePage({ pathname: item.route! })}
                      className={`${
                        item.route === pathname ? '!text-teal-300 !font-semibold' : ''
                      } cursor-pointer text-white uppercase hover:text-teal-300 transition-colors duration-200 flex items-center space-x-1 text-base`}
                    >
                      {formatMessage({ id: item.name })}
                    </button>
                  )}
                </div>
              ))}
            </nav> */}

            {/* Desktop Right Side */}
            <div className='flex items-center xl:space-x-12 text-2xl'>
              <div className='flex items-center gap-1'>
                <div className='font-bold'>UA</div>
                <div>|</div>
                <div>EN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <>
          <div
            className={`overflow-y-auto xl:hidden fixed z-50 left-0 top-15 h-screen w-[50%] bg-blue-primary transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            // ref={sidebarRef}
          >
            <div className='flex flex-col h-full'>
              {/* Mobile Navigation */}
              {/* <nav className='flex-1 px-4 py-6'>
                <ul className='space-y-8'>
                  {navigationItems.map(item => (
                    <li key={item.name}>
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => toggleMobileSubmenu(item.name)}
                            className={`text-white hover:text-teal-300 transition-colors duration-200 text-left text-xl font-semibold w-full flex items-center gap-1 ${
                              item.route === pathname ||
                              item.subItems?.some(route => route.route === pathname)
                                ? '!text-teal-300'
                                : ''
                            }`}
                          >
                            <span>{formatMessage({ id: item.name })}</span>
                            <ChevronRight
                              className={`w-5 h-5 transition-transform duration-200 ${
                                expandedMobileMenu === item.name ? 'rotate-90' : ''
                              }`}
                            />
                          </button>
                          {expandedMobileMenu === item.name && (
                            <ul className='mt-3 ml-4 space-y-4'>
                              {item.subItems?.map(subItem => (
                                <li key={subItem.name}>
                                  <button
                                    onClick={() => {
                                      changePage({ pathname: subItem.route! });
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
                          )}
                        </div>
                      ) : (
                        <button
                          className={`text-white hover:text-teal-300 transition-colors duration-200 text-left text-xl font-medium w-full ${
                            item.route === pathname ? '!text-teal-300' : ''
                          }`}
                          onClick={() => {
                            changePage({ pathname: item.route! });
                            setIsSidebarOpen(false);
                          }}
                        >
                          {formatMessage({ id: item.name })}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </nav> */}
            </div>
          </div>
        </>
      </header>

      <div
        className={`xl:hidden fixed top-0 left-0 w-full h-screen bg-black/40 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export interface NavbarProps {}

export default Navbar;
