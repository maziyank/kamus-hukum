import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps<DefinisiPageProps> = async (
  context
) => {
  const definisi = context.query.definisi.toString();
  const CurrentId = parseInt(context.query.Id.toString());

  const baseUrl = process.env.API_BASE_URL;
  const xcAuth = process.env.API_XC_AUTH;

  const url = `${baseUrl}/Kamus?sort=-Tahun,-No&where=(Definisi,eq,${definisi})`;
  const urlMirip = `${baseUrl}/Kemiripan?sort=-Score&where=(Def1,eq,${CurrentId})`;

  const { list: data, pageInfo } = await fetch(url, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());

  const { list: listMirip } = await fetch(urlMirip, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());


  const excludeId = data.map(({ Id }, i) => Id);
  const listMiripScore = new Map(listMirip.filter(({ Def2 }) => !excludeId.includes(Def2) && Def2 !== CurrentId)
    .map(({ Def2: Id, Score }) => { return [Id, Score] }));

  const listMiripId = Array.from(listMiripScore.keys()).join(',')
  const urlMiripData = `${baseUrl}/Kamus?where=(Id,in,${listMiripId})`;

  const { list: miripData } = await fetch(urlMiripData, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());

  return {
    props: {
      CurrentId,
      definisi,
      data,
      pageInfo,
      listMiripScore: Object.fromEntries(listMiripScore),
      miripData
    },
    notFound: !data.length,
  };
};

export interface DefinisiPageProps {
  CurrentId: number;
  definisi: string;
  data: KamusItem[];
  miripData: KamusItem[];
  listMiripScore: any;
  pageInfo: PageInfo;
}

export default function DefinisiPage({
  CurrentId,
  definisi,
  data,
  pageInfo,
  miripData,
  listMiripScore
}: DefinisiPageProps) {

  return (
    <div className="w-full p-5">
      <div className="w-full block rounded-lg shadow-lg bg-white text-left p-6 mb-5">
        <h2 className="text-xl font-bold">{definisi}</h2>
        {data
          .filter(({ Id }, i) => CurrentId === Id)
          .map(({ Id, Url, Sumber, Verified, Keterangan }, i) => (
            <div key={Id} className="my-2 border-t border-gray-300">
              <p className="text-gray-700 text-base mt-2">{Keterangan}.</p>
              <p className="text-black text-sm bg-gray-200 rounded-md p-2 my-2 cursor-pointer">
                Sumber:{" "}
                <a
                  href={Url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {Sumber}
                </a>
              </p>
              <p className="text-black text-sm bg-gray-200 rounded-md p-2 my-2 cursor-pointer">
                Status: {Verified ? " Sudah diverifikasi" : " Belum diverifikasi"}
              </p>
            </div>
          ))}
      </div>

      {data.filter(({ Id }, i) => CurrentId !== Id).length > 0 && (<div className="w-full block rounded-lg shadow-lg bg-white text-left p-6">
        <p>
          Definisi <b>{definisi}</b> juga digunakan di dalam {pageInfo.totalRows - 1} {" "}
          Peraturan Perundang-undangan lainnya.
        </p>
        <div className="border-b border-gray-300 pt-2"></div>
        <ol className="relative border-l border-slate-200 dark:border-slate-700 mt-5 ml-4">
          {data
            .filter(({ Id }, i) => CurrentId !== Id)
            .map(({ Id, Url, Definisi, Sumber, Verified, Keterangan }, i) => (
              <li className="mb-10 ml-4" key={Id}>
                <div className="absolute w-8 h-8 bg-slate-200 rounded-full -left-4 border border-white dark:border-slate-900 dark:bg-slate-700 text-slate-700 flex justify-center items-center text-sm">{i + 1}</div>
                <div className="flex flex-row justify-between ml-2 mb-1 text-sm font-normal leading-none text-slate-400 dark:text-slate-500">
                  <a href={Url} className="pt-2" target="_blank" rel="noreferrer">
                    <span className="pt-2 cursor-pointer">{Sumber}</span>
                  </a>
                  {!Verified && (
                    <div className="has-tooltip">
                      <span className="tooltip rounded shadow-lg p-1 bg-gray-800 opacity-80 -mt-8 -ml-8 text-white text-xs">
                        Terverifikasi
                      </span>
                      <span className="bg-blue-100 h-6 w-6 mt-2 text-blue-800 text-sm font-semibold inline-flex items-center p-1 rounded-full dark:bg-blue-200 dark:text-blue-800 cursor-pointer">
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
                    pathname: "/definisi/[definisi]",
                    query: { definisi: Definisi, Id },
                  }}
                ><h3 className="ml-2 text-md font-bold text-slate-900 dark:text-white hover:text-blue-800 hover:underline cursor-pointer">{Definisi}</h3>
                </Link>

                <p className="ml-2 mb-4 text-base font-normal text-slate-500 dark:text-slate-400">{Keterangan}.</p>
              </li>
            ))}
        </ol>
      </div>)}

      <div className="w-full block rounded-lg shadow-lg bg-white text-left p-6 mt-4">
        <p>
          Definisi lain dengan penjelasan yang mirip.
        </p>
        <div className="border-b border-gray-300 pt-2"></div>
        <ol className="relative border-l border-slate-200 dark:border-slate-700 mt-5 ml-4">
          {miripData
            .filter(({ Id }, i) => CurrentId !== Id)
            .sort((a, b) => listMiripScore[b.Id] - listMiripScore[a.Id])
            .map(({ Id, Url, Definisi, Sumber, Verified, Keterangan }, i) => (
              <li className="mb-10 ml-4" key={Id}>
                <div className="absolute w-8 h-8 bg-slate-200 rounded-full -left-4 border border-white dark:border-slate-900 dark:bg-slate-700 text-slate-700 flex justify-center items-center text-sm">{i + 1}</div>
                <div className="flex flex-row justify-between ml-2 mb-1 text-sm font-normal leading-none text-slate-400 dark:text-slate-500 flex flex-row">
                  <a className="mt-2" href={Url} target="_blank" rel="noreferrer">
                    <span className="cursor-pointer">{Sumber}</span>
                  </a>
                  <div className="flex flex-row">
                    {Verified && (
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
                        {(listMiripScore[Id] * 100).toFixed(2) + '% Mirip'}
                      </span>
                      <span className="text-xs inline-block py-1 px-2 rounded bg-blue-100 text-blue-400 uppercase ml-2 cursor-pointer">
                        {(listMiripScore[Id] * 100).toFixed(2) + ' %'}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={{
                    pathname: "/definisi/[definisi]",
                    query: { definisi: Definisi, Id },
                  }}
                ><h3 className="ml-2 text-md font-bold text-slate-900 dark:text-white hover:text-blue-800 hover:underline cursor-pointer">{Definisi}</h3>
                </Link>

                <p className="ml-2 mb-4 text-base font-normal text-slate-500 dark:text-slate-400">{Keterangan}.</p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
