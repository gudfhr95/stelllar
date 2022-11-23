import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import apolloClient from "../apollo-client";
import { defaultSeoConfig } from "../next-seo.config";
import ContextMenuProvider from "../src/components/ui/context/ContextMenuProvider";
import { usePreviousPath } from "../src/hooks/usePreviousPath";
import MainLayout from "../src/layouts/MainLayout";
import "../src/styles/global.css";
import "../src/styles/index.css";
import "../src/styles/tippy.css";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const previousPath = usePreviousPath();

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Forum & Chat for Communities - Stelllar</title>
      </Head>
      <main className="app">
        <ApolloProvider client={apolloClient}>
          <SessionProvider session={session}>
            <ContextMenuProvider>
              <div style={{ height: "100%" }} className="flex">
                <MainLayout>
                  <Component {...{ ...pageProps, previousPath }} />
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
