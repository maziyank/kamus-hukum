import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { getKamusList } from "../services/DataKamusService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const rootUrl =
    process.env.NEXT_PUBLIC_ROOT_URL ?? "https://www.kamus-hukum.com";

  const { list } = await getKamusList("", "definisi", 100, 0);

  return getServerSideSitemap(
    context,
    list.map(({ id, definisi, updated_at }) => ({
      loc: `${rootUrl}/definisi/${id}/${definisi}`,
      lastmod: new Date(updated_at).toISOString(),
    }))
  );
};

export default function DefinisiSitemapXml() {}
