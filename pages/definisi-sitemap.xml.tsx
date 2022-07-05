import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import DataKamusService from "../services/DataKamusService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rootUrl =
    process.env.NEXT_PUBLIC_ROOT_URL ?? "https://www.kamus-hukum.com";
  const dataKamusService = new DataKamusService();

  const { list } = await dataKamusService.getKamusList("", "Definisi", 100, 0);

  return getServerSideSitemap(
    context,
    list.map(({ Id, Definisi }) => ({
      loc: `${rootUrl}/definisi/${Id}/${Definisi}`,
      lastmod: new Date().toISOString(),
    }))
  );
};

export default function DefinisiSitemapXml() {}
