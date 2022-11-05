import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import MainLayout from "../src/layouts/MainLayout";

import "../src/styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Stelllar – Forum & Chat for Communities</title>
      </Head>
      <main className="app">
        <div style={{ height: "100%" }} className="flex">
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </div>
      </main>
    </>
  );
}

export default appWithTranslation(App);
