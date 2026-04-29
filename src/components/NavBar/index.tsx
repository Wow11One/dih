import { FC, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
    link: '/science-services',
  },
  {
    name: 'fiware',
    link: '/fiware',
  },
  {
    name: 'news',
    link: '/news',
  },
];

const Navbar: FC<NavbarProps> = () => {
  const { locale, asPath, push } = useRouter();
  const t = useTranslations('Navbar');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
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
  }, [headerHeight]);

  useEffect(() => {
    if (headerRef.current?.offsetHeight) {
      setHeaderHeight(headerRef.current?.offsetHeight);
    }
  }, [headerRef.current?.offsetHeight]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    const previousPosition = style.position;
    const previousTop = style.top;
    const previousWidth = style.width;

    style.overflow = 'hidden';
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.width = '100%';

    return () => {
      style.overflow = previousOverflow;
      style.position = previousPosition;
      style.top = previousTop;
      style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [isSidebarOpen]);

  const isActiveRoute = (route: typeof routes[0]) => {
    if (!route.link) return false;
    
    // Exact match for home page
    if (route.link === '/' && pathname === '/') return true;
    
    // For other routes, check if pathname starts with the route link
    if (route.link !== '/' && pathname.startsWith(route.link)) return true;
    
    return false;
  };

  const getTextColor = (route: typeof routes[0]) => {
    // Check if current page matches specific routes that should be black
    const blackRoutes = [
      { link: '/innovation-center/digital-technologies', exact: false },
      { link: '/science-services', exact: false },
      { link: '/news', exact: false },
      { link: '/innovation-center', exact: true },
      { link: '/innovation-center/training', exact: true },
      { link: '/fiware', exact: false },
    ];

    const shouldBeBlack = blackRoutes.some(item =>
      item.exact
        ? pathname === item.link
        : pathname.startsWith(item.link),
    );

    return shouldBeBlack ? 'text-black' : 'text-white';
  };

  return (
    <>
      <header
        className={`absolute bg-white w-full z-50 transition-transform duration-300`}
        ref={headerRef}
      >
        <div className='w-full mx-auto my-auto px-4 md:px-10 lg:px-16 z-50 relative'>
          <div className='flex items-center justify-between w-full'>
            {/* Logo */}
            <div className='w-full flex items-center justify-between xl:justify-baseline gap-10'>
              <div className='xl:hidden'>
                {/* Menu Icon SVG */}
                <svg
                  onClick={() => setIsSidebarOpen(prev => !prev)}
                  className='size-8 cursor-pointer'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M3 12H21M3 6H21M3 18H21'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>

              <img
                src='/header/nosc.png'
                alt='nosc'
                className='w-[150px] h-[84px] lg:w-[170px] lg:h-[95px] cursor-pointer'
                onClick={() => push('/')}
              />

              <img
                className='hidden xl:block cursor-pointer'
                src='/header/edih.png'
                alt='edih'
                width={140}
                height={55}
                onClick={() => push('/')}
              />

              <img
                className='hidden xl:block cursor-pointer'
                src='/header/fiware.png'
                alt='fiware'
                width={230}
                height={40}
                onClick={() => push('/')}
              />

              <div />
            </div>

            {/* Desktop Right Side */}
            <div className='hidden xl:flex items-center xl:space-x-12 text-xl'>
              {/* Search Input Placeholder */}
              <div className='relative invisible'>
                <input
                  type='text'
                  placeholder='Search...'
                  className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              
              <div className='flex items-center gap-1'>
                <Link
                  href={asPath}
                  locale='uk'
                  className={`transition-all ${locale === 'uk' ? 'font-bold' : 'hover:font-semibold'}`}
                >
                  UA
                </Link>
                <div>|</div>
                <Link
                  href={asPath}
                  locale='en'
                  className={`transition-all ${locale === 'en' ? 'font-bold' : 'hover:font-semibold'}`}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={`absolute w-full left-0 -bottom-12 px-20 transition-opacity hidden xl:flex items-center justify-between text-xl ${
              showHeader || isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {routes.map(item => (
              <Link
                key={item.name}
                aria-disabled={!item.link}
                className={`relative transition-all duration-200 ${
                  !item.link ? 'pointer-events-none opacity-40' : ''
                } ${getTextColor(item)} ${
                  isActiveRoute(item)
                    ? 'font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current'
                    : 'hover:opacity-80'
                }`}
                href={item.link || ''}
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`overflow-y-auto xl:hidden fixed z-50 left-0 h-screen w-[70%] bg-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{
            top: headerHeight,
          }}
        >
          <div className='flex flex-col h-full'>
            {/* Mobile Navigation */}
            <nav className='flex-1 px-4 py-6'>
              <ul className='space-y-6'>
                {routes.map(item => (
                  <li key={item.name}>
                    <button
                      className={`relative text-left text-xl font-medium w-full transition-all duration-200 ${
                        !item.link 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'cursor-pointer hover:translate-x-2'
                      } ${
                        isActiveRoute(item)
                          ? 'text-blue-primary font-bold border-l-4 border-blue-primary pl-4'
                          : 'text-gray-700 pl-4'
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
                  </li>
                ))}
              </ul>

              {/* Mobile Language Switcher */}
              <div className='mt-8 pt-8 border-t border-gray-200'>
                <div className='flex items-center gap-4 px-4'>
                  <Link
                    href={asPath}
                    locale='uk'
                    className={`text-lg transition-all ${
                      locale === 'uk' 
                        ? 'font-bold text-blue-primary' 
                        : 'text-gray-600 hover:text-blue-primary'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    UA
                  </Link>
                  <div className='text-gray-400'>|</div>
                  <Link
                    href={asPath}
                    locale='en'
                    className={`text-lg transition-all ${
                      locale === 'en' 
                        ? 'font-bold text-blue-primary' 
                        : 'text-gray-600 hover:text-blue-primary'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    EN
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Overlay Background */}
        {isSidebarOpen && (
          <div
            className='fixed inset-0 bg-black/50 xl:hidden'
            style={{
              top: headerHeight,
            }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
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
