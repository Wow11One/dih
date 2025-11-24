import Navbar from '@/components/NavBar';
import '../styles/global.css';
import '../styles/theme.css';


import { AppProps } from 'next/app';
import { Raleway, Open_Sans } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

const openSansMono = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-raleway: ${raleway.style.fontFamily};
            --font-roboto-mono: ${openSansMono.style.fontFamily};
          }
        `}
      </style>

      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
