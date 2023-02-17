import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import SeoTags from "../../../components/seoTags";
import {
  getKamusList,
  getKamusRead,
  getDefinisiLain,
  getDefinisiMirip,
  Kamus,
  Kemiripan,
  Paginated,
} from "../../../services/DataKamusService";

export const getStaticProps: GetStaticProps<DefinisiPageProps> = async (
  context
) => {
  const definisi = context.params.definisi.toString();
  const id = parseInt(context.params.id.toString());
  const kamus = await getKamusRead(id);
  if (!kamus.id) {
    return {
      notFound: true,
    };
  }
  if (definisi !== kamus.definisi) {
    return {
      redirect: {
        destination: `/definisi/${id}/${kamus.definisi}`,
        permanent: true,
      },
    };
  }
  const definisiLain = await getDefinisiLain(definisi, id);
  const definisiMirip = await getDefinisiMirip(
    id,
    definisiLain.list.map(({ id }) => id)
  );

  return {
    props: {
      kamus,
      definisiLain,
      definisiMirip,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const kamus = await getKamusList("", "definisi", 100, 0);
  const paths = kamus.list.map((k) => ({
    params: {
      id: k.id.toString(),
      definisi: k.definisi,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export interface DefinisiPageProps {
  kamus: Kamus;
  definisiLain: Paginated<Kamus>;
  definisiMirip: Paginated<Kemiripan>;
}

export default function DefinisiPage({
  kamus,
  definisiLain,
  definisiMirip,
}: DefinisiPageProps) {
  return (
    <div className="w-full p-5">
      <SeoTags
        title={`Definisi ${kamus.definisi} menurut ${kamus.sumber} | Kamus Hukum Indonesia`}
        description={kamus.keterangan}
      />

      <div className="w-full block rounded-lg shadow-lg bg-white dark:bg-slate-700 text-left p-6 mb-5">
        <h2 className="text-xl font-bold">{kamus.definisi}</h2>

        <div className="my-2 border-t border-gray-300">
          <p className="text-base mt-2">{kamus.keterangan}.</p>
          <p className="text-sm bg-gray-200 dark:bg-slate-600 rounded-md p-2 my-2 cursor-pointer">
            Sumber:{" "}
            <a href={kamus.url} rel="noreferrer" target="_blank">
              {kamus.sumber}
            </a>
          </p>
          <p className="text-sm bg-gray-200 dark:bg-slate-600 rounded-md p-2 my-2 cursor-pointer">
            Status:{" "}
            {kamus.verified ? " Sudah diverifikasi" : " Belum diverifikasi"}
          </p>
        </div>
      </div>

      {definisiLain.list.length > 0 && (
        <div className="w-full block rounded-lg shadow-lg bg-white dark:bg-slate-700 text-left p-6">
          <p>
            Definisi <b>{kamus.definisi}</b> juga digunakan di dalam{" "}
            {definisiLain.pageInfo.totalRows} Peraturan Perundang-undangan
            lainnya.
          </p>
          <div className="border-b border-gray-300 pt-2"></div>
          <ol className="relative border-l border-slate-300 dark:border-slate-600 mt-5 ml-4">
            {definisiLain.list.map(
              ({ id, url, definisi, sumber, verified, keterangan }, i) => (
                <li className="mb-10 ml-6" key={id}>
                  <div className="absolute w-8 h-8 rounded-full -left-4 border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 flex justify-center items-center text-sm">
                    {i + 1}
                  </div>
                  <div className="flex flex-row justify-between mb-2 text-sm font-normal leading-none">
                    <a
                      href={url}
                      className="py-2 cursor-pointer"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {sumber}
                    </a>
                    {verified && (
                      <div className="has-tooltip">
                        <span className="tooltip rounded shadow-lg p-1 bg-gray-800 opacity-80 -mt-8 -ml-8 text-white text-xs">
                          Terverifikasi
                        </span>
                        <span className="bg-blue-100 h-6 w-6 text-blue-800 text-sm font-semibold inline-flex items-center p-1 rounded-full dark:bg-blue-200 dark:text-blue-800 cursor-pointer">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={{
                      pathname: "/definisi/[id]/[definisi]",
                      query: { definisi, id },
                    }}
                  >
                    <a className="text-md font-bold py-1 hover:text-blue-500 dark:hover:text-blue-300 hover:underline cursor-pointer">
                      {definisi}
                    </a>
                  </Link>

                  <p className="text-base font-normal break-words">
                    {keterangan}.
                  </p>
                </li>
              )
            )}
          </ol>
        </div>
      )}

      {definisiMirip.list.length > 0 && (
        <div className="w-full block rounded-lg shadow-lg bg-white dark:bg-slate-700 text-left p-6 mt-4">
          <p>Definisi lain dengan penjelasan yang mirip.</p>
          <div className="border-b border-gray-300 pt-2"></div>
          <ol className="relative border-l border-slate-300 dark:border-slate-600 mt-5 ml-4">
            {definisiMirip.list.map(
              (
                {
                  kamus: { id, url, definisi, sumber, verified, keterangan },
                  score,
                },
                i
              ) => (
                <li className="mb-10 ml-6" key={id}>
                  <div className="absolute w-8 h-8 bg-slate-200 rounded-full -left-4 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 flex justify-center items-center text-sm">
                    {i + 1}
                  </div>
                  <div className="flex flex-row justify-between mb-2 text-sm font-normal leading-none">
                    <a
                      className="py-2 cursor-pointer"
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {sumber}
                    </a>
                    {verified && (
                      <div className="has-tooltip">
                        <span className="tooltip rounded shadow-lg p-1 bg-gray-800 opacity-80 -mt-8 -ml-8 text-white text-xs">
                          Terverifikasi
                        </span>
                        <span className="bg-blue-100 h-6 w-6 text-blue-800 text-sm font-semibold inline-flex items-center p-1 rounded-full dark:bg-blue-200 dark:text-blue-800 cursor-pointer">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    )}
                    <div className="has-tooltip">
                      <span className="tooltip rounded shadow-lg p-1 bg-gray-800 opacity-80 -mt-7 text-white text-xs text-center">
                        {(score * 100).toFixed(2) + "% Mirip"}
                      </span>
                      <span className="text-xs inline-block py-1 px-2 rounded bg-blue-100 text-blue-700 uppercase ml-2 cursor-pointer">
                        {(score * 100).toFixed(2) + " %"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={{
                      pathname: "/definisi/[id]/[definisi]",
                      query: { definisi, id },
                    }}
                  >
                    <a className="text-md font-bold py-1 hover:text-blue-500 dark:hover:text-blue-300 hover:underline cursor-pointer">
                      {definisi}
                    </a>
                  </Link>

                  <p className="mb-4 text-base font-normal break-words">
                    {keterangan}.
                  </p>
                </li>
              )
            )}
          </ol>
        </div>
      )}
    </div>
  );
}
