import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import apolloClient from "../apollo-client";
import { defaultSeoConfig } from "../next-seo.config";
import LoadingDialog from "../src/components/dialog/LoadingDialog";
import ContextMenuProvider from "../src/components/ui/context/ContextMenuProvider";
import { usePageLoading } from "../src/hooks/usePageLoading";
import { usePreviousRoute } from "../src/hooks/usePreviousRoute";
import MainLayout from "../src/layouts/MainLayout";
import * as gtag from "../src/lib/gtag";
import "../src/styles/global.css";
import "../src/styles/index.css";
import "../src/styles/tippy.css";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { previousRoute } = usePreviousRoute();
  const { isPageLoading } = usePageLoading();

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Forum & Chat for Communities - Stelllar</title>
      </Head>

      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />

      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4961852375681131"
        crossOrigin="anonymous"
      ></Script>

      <main className="app">
        <ApolloProvider client={apolloClient}>
          <SessionProvider session={session}>
            <ContextMenuProvider>
              <div style={{ height: "100%" }} className="flex">
                <LoadingDialog isOpen={isPageLoading} />
                <MainLayout>
                  <Component {...{ ...pageProps, previousRoute }} />
                </MainLayout>
              </div>
            </ContextMenuProvider>
          </SessionProvider>
        </ApolloProvider>
      </main>
    </>
  );
}

export default appWithTranslation(App);
