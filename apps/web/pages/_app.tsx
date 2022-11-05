import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icon/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stelllar – Forum & Chat for Communities</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default appWithTranslation(App);
