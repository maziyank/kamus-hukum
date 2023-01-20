import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import SeoTags from "../components/seoTags";
import useNProgress from "../hooks/useNProgress";
import { Analytics } from '@vercel/analytics/react';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useNProgress();

  return (
    <>
      <SeoTags
        title="Kamus Hukum Indonesia"
        description="Aplikasi Kamus Hukum memuat kumpulan definisi hukum yang diambil dari peraturan perundang-undangan yang ada di Indonesia."
      />
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
