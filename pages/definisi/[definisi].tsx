import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<DefinisiPageProps> = async (
  context
) => {
  const definisi = context.query.definisi.toString();

  const baseUrl = process.env.API_BASE_URL;
  const xcAuth = process.env.API_XC_AUTH;

  const url = `${baseUrl}?sort=-Tahun,-No&where=(Definisi,eq,${definisi})`;

  const { list: data, pageInfo } = await fetch(url, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());

  return {
    props: {
      definisi,
      data,
      pageInfo,
    },
    notFound: !data.length,
  };
};

export interface DefinisiPageProps {
  definisi: string;
  data: KamusItem[];
  pageInfo: PageInfo;
}

export default function DefinisiPage({
  definisi,
  data,
  pageInfo,
}: DefinisiPageProps) {
  return (
    <div className="w-full p-5">
      <div className="w-full block rounded-lg shadow-lg bg-white text-left p-6">
        <h2 className="text-xl font-bold mb-6">{definisi}</h2>
        <p>
          Ditemukan {pageInfo.totalRows} penjelasan terkait <b>{definisi}</b>{" "}
          dalam Peraturan Perundang-undangan.
        </p>
        {data
          .filter(Boolean)
          .map(({ Id, Url, Sumber, Verified, Keterangan }, i) => (
            <div key={Id} className="my-5 border-t border-gray-300">
              <h6 className="text-lg font-bold mb-1">Definisi {i + 1}</h6>
              <p className="text-gray-700 text-base">{Keterangan}</p>
              <p className="text-black bg-gray-200 rounded-md px-2 py-6 my-6">
                Sumber:{" "}
                <a
                  href={Url}
                  className="hover:text-blue-300 underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {Sumber}
                </a>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
