import Navbar from '@/components/NavBar';
import '../styles/global.css';
import '../styles/theme.css';


import { AppProps } from 'next/app';
import { IntlProvider } from 'next-intl';
import { Raleway, Open_Sans } from 'next/font/google';
import Footer from '@/components/Footer';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

const openSansMono = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <IntlProvider locale={router.locale!} messages={pageProps.messages}>
      <style jsx global>
        {`
          :root {
            --font-raleway: ${raleway.style.fontFamily};
            --font-roboto-mono: ${openSansMono.style.fontFamily};
          }
        `}
      </style>

      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </IntlProvider>
  );
}
