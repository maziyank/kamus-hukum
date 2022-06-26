import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<DefinisiPageProps> = async (
  context
) => {
  const definisi = context.query.definisi.toString();
  const CurrentId = parseInt(context.query.Id.toString());

  const baseUrl = process.env.API_BASE_URL;
  const xcAuth = process.env.API_XC_AUTH;

  const url = `${baseUrl}/Kamus?sort=-Tahun,-No&where=(Definisi,eq,${definisi})`;
  const urlMirip = `${baseUrl}/Kemiripan?sort=-Tahun,-No&where=(Def1,eq,${CurrentId})`;

  const { list: data, pageInfo } = await fetch(url, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());

  const { list: listMirip } = await fetch(urlMirip, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());


  const excludeId = data.map(({ Id }, i) => Id);
  const listMiripMap = new Map(listMirip.filter(({ Def2 }) => !excludeId.includes(Def2) && Def2 !== CurrentId)
    .map(({ Def2: Id, Score }) => { return [Id, Score] }));


  const listMiripId = Array.from(listMiripMap.keys()).join(',')
  const urlMiripData = `${baseUrl}/Kamus?sort=-Tahun,-No&where=(Id,in,${listMiripId})`;

  const { list: miripData } = await fetch(urlMiripData, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());

  return {
    props: {
      CurrentId,
      definisi,
      data,
      pageInfo,
      listMiripMap: Object.fromEntries(listMiripMap),
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
  listMiripMap: any;
  pageInfo: PageInfo;
}

export default function DefinisiPage({
  CurrentId,
  definisi,
  data,
  pageInfo,
  miripData,
  listMiripMap
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
              <p className="text-black text-sm bg-gray-200 rounded-md p-2 my-2 hover:bg-blue-300 cursor-pointer">
                Sumber:{" "}
                <a
                  href={Url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {Sumber}
                </a>
              </p>
            </div>
          ))}
      </div>

      <div className="w-full block rounded-lg shadow-lg bg-white text-left p-6">
        <p>
          Definisi <b>{definisi}</b> juga digunakan di dalam {pageInfo.totalRows - 1} {" "}
          Peraturan Perundang-undangan lainnya.
        </p>
        <div className="border-b border-gray-300 pt-2"></div>
        <ol className="relative border-l border-slate-200 dark:border-slate-700 mt-5 ml-4">
          {data
            .filter(({ Id }, i) => CurrentId !== Id)
            .map(({ Id, Url, Sumber, Verified, Keterangan }, i) => (
              <li className="mb-10 ml-4" key={Id}>
                <div className="absolute w-8 h-8 bg-slate-200 rounded-full -left-4 border border-white dark:border-slate-900 dark:bg-slate-700 text-slate-700 flex justify-center items-center text-sm">{i + 1}</div>
                <div className="ml-2 mb-1 text-sm font-normal leading-none text-slate-400 dark:text-slate-500">{Sumber}</div>
                <h3 className="ml-2 text-md font-bold text-slate-900 dark:text-white">{definisi}</h3>
                <p className="ml-2 mb-4 text-base font-normal text-slate-500 dark:text-slate-400">{Keterangan}.</p>
              </li>
            ))}
        </ol>
      </div>

      <div className="w-full block rounded-lg shadow-lg bg-white text-left p-6 mt-4">
        <p>
          Daftar definisi lain dengan penjelasan yang mirip.
        </p>
        <div className="border-b border-gray-300 pt-2"></div>
        <ol className="relative border-l border-slate-200 dark:border-slate-700 mt-5 ml-4">
          {miripData
            .filter(({ Id }, i) => CurrentId !== Id)
            .map(({ Id, Url, Definisi, Sumber, Verified, Keterangan }, i) => (
              <li className="mb-10 ml-4" key={Id}>
                <div className="absolute w-8 h-8 bg-slate-200 rounded-full -left-4 border border-white dark:border-slate-900 dark:bg-slate-700 text-slate-700 flex justify-center items-center text-sm">{i + 1}</div>
                <div className="ml-2 mb-1 text-sm font-normal leading-none text-slate-400 dark:text-slate-500 flex flex-row justify-between ">
                  <span className="pt-2">{Sumber}</span>
                  <span className="text-xs inline-block py-1 px-2 rounded bg-blue-100 text-blue-400 uppercase ml-2">
                    { (listMiripMap[Id] * 100).toFixed(2) + ' %'}
                  </span>
                </div>
                <h3 className="ml-2 text-md font-bold text-slate-900 dark:text-white">{Definisi}</h3>
                <p className="ml-2 mb-4 text-base font-normal text-slate-500 dark:text-slate-400">{Keterangan}.</p>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
