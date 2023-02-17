import { GetServerSideProps } from "next";
import Link from "next/link";
import {getKamusRead} from "../../../services/DataKamusService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.query.id.toString());

  const kamus = await getKamusRead(id);
  if (!kamus.id) {
    return {
      notFound: true,
    };
  }
  return {
    redirect: {
      destination: `/definisi/${id}/${kamus.definisi}`,
      permanent: true,
    },
    props: {
      id,
      definisi: kamus.definisi,
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
