import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import Layout from "../components/layout";
import useNProgress from "../hooks/useNProgress";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useNProgress();

  return (
    <>
      <Head>
        <title>Kamus Hukum</title>
        <meta name="description" content="Kamus Hukum Indonesia"></meta>
        <meta
          name="google-site-verification"
          content="Y8Jgr7-kIDCWbqqboq-OIqk625BKYpDn1q7eTi45agk"
        />
      </Head>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
