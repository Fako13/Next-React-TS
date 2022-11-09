import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>
        <link key={1} rel="icon" href="/favicon.ico" />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}></meta>
        <meta property='og:locale' content='ru_RU'></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;