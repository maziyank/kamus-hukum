import { GetServerSideProps } from "next";
import { getServerSideSitemapIndex } from "next-sitemap";
import DataKamusService from "../services/DataKamusService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rootUrl =
    process.env.NEXT_PUBLIC_ROOT_URL ?? "https://www.kamus-hukum.com";
  const dataKamusService = new DataKamusService();

  const { list } = await dataKamusService.getKamusList("", "Definisi", 100, 0);

  return getServerSideSitemapIndex(
    context,
    list.map(({ Id, Definisi }) => `${rootUrl}/definisi/${Id}/${Definisi}`)
  );
};

export default function DefinisiSitemapXml() {}
