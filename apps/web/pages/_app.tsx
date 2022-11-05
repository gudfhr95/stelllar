import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import { BottomBar } from "../src/components/BottomBar";

import "../src/styles/global.css";

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
        <div className="flex-grow">
          <div
            className="flex items-stretch"
            style={{ height: "calc(100% - 1.375rem)" }}
          >
            <Component {...pageProps} />
          </div>

          <BottomBar />
        </div>
      </main>
    </>
  );
}

export default appWithTranslation(App);
