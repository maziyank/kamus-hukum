import { GetServerSideProps } from "next";
import Link from "next/link";
import DataKamusService from "../../../services/DataKamusService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.query.id.toString());

  const dataKamusService = new DataKamusService();

  const kamus = await dataKamusService.getKamusRead(id);
  if (!kamus.Id) {
    return {
      notFound: true,
    };
  }
  return {
    redirect: {
      destination: `/definisi/${id}/${kamus.Definisi}`,
      permanent: true,
    },
    props: {
      id,
      definisi: kamus.Definisi,
    },
  };
};

export default function DefinisiIndex({ id, definisi }) {
  return (
    <Link
      href={{
        pathname: "/definisi/[id]/[definisi]",
        query: {
          id,
          definisi,
        },
      }}
    ></Link>
  );
}
