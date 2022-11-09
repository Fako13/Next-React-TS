import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
      ym('hit', url);
    }
  });

  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link key={1} rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}></meta>
        <meta property="og:locale" content="ru_RU"></meta>
      </Head>
      <YMInitializer 
        accounts={[]}
        options={{ webvisor: true, defer: true }}
        version="2"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;