import { GetServerSideProps } from "next";
import Link from "next/link";
import DataKamusService, {
  Kamus,
  Paginated,
} from "../../../services/DataKamusService";

export const getServerSideProps: GetServerSideProps<DefinisiPageProps> = async (
  context
) => {
  const definisi = context.query.definisi.toString();
  const id = parseInt(context.query.id.toString());

  const dataKamusService = new DataKamusService();

  const kamus = await dataKamusService.getKamusRead(id);
  if (!kamus.Id) {
    return {
      notFound: true,
    };
  }
  if (definisi !== kamus.Definisi) {
    return {
      redirect: {
        destination: `/definisi/${id}/${kamus.Definisi}`,
        permanent: true,
      },
    };
  }
  const definisiLain = await dataKamusService.getDefinisiLain(definisi, id);
  const definisiMirip = await dataKamusService.getDefinisiMirip(
    id,
    definisiLain.list.map(({ Id }) => Id)
  );

  return {
    props: {
      kamus,
      definisiLain,
      definisiMirip,
    },
  };
};

export interface DefinisiPageProps {
  kamus: Kamus;
  definisiLain: Paginated<Kamus>;
  definisiMirip: Paginated<{ kamus: Kamus; Score: string }>;
}

export default function DefinisiPage({
  kamus,
  definisiLain,
  definisiMirip,
}: DefinisiPageProps) {
  return (
    <div className="w-full p-5">
      <div className="w-full block rounded-lg shadow-lg bg-white dark:bg-slate-700 text-left p-6 mb-5">
        <h2 className="text-xl font-bold">{kamus.Definisi}</h2>

        <div className="my-2 border-t border-gray-300">
          <p className="text-base mt-2">{kamus.Keterangan}.</p>
          <p className="text-sm bg-gray-200 dark:bg-slate-600 rounded-md p-2 my-2 cursor-pointer">
            Sumber:{" "}
            <a href={kamus.Url} rel="noreferrer" target="_blank">
              {kamus.Sumber}
            </a>
          </p>
          <p className="text-sm bg-gray-200 dark:bg-slate-600 rounded-md p-2 my-2 cursor-pointer">
            Status:{" "}
            {kamus.Verified ? " Sudah diverifikasi" : " Belum diverifikasi"}
          </p>
        </div>
      </div>

      {definisiLain.list.length > 0 && (
        <div className="w-full block rounded-lg shadow-lg bg-white dark:bg-slate-700 text-left p-6">
          <p>
            Definisi <b>{kamus.Definisi}</b> juga digunakan di dalam{" "}
            {definisiLain.pageInfo.totalRows} Peraturan Perundang-undangan
            lainnya.
          </p>
          <div className="border-b border-gray-300 pt-2"></div>
          <ol className="relative border-l border-slate-300 dark:border-slate-600 mt-5 ml-4">
            {definisiLain.list.map(
              ({ Id, Url, Definisi, Sumber, Verified, Keterangan }, i) => (
                <li className="mb-10 ml-6" key={Id}>
                  <div className="absolute w-8 h-8 rounded-full -left-4 border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 flex justify-center items-center text-sm">
                    {i + 1}
                  </div>
                  <div className="flex flex-row justify-between mb-2 text-sm font-normal leading-none">
                    <a
                      href={Url}
                      className="pt-2"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="pt-2 cursor-pointer">{Sumber}</span>
                    </a>
                    {!Verified && (
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
                      query: { definisi: Definisi, id: Id },
                    }}
                  >
                    <a className="text-md font-bold hover:text-blue-500 dark:hover:text-blue-300 hover:underline cursor-pointer">
                      {Definisi}
                    </a>
                  </Link>

                  <p className="text-base font-normal break-words">
                    {Keterangan}.
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
                  kamus: { Id, Url, Definisi, Sumber, Verified, Keterangan },
                  Score,
                },
                i
              ) => (
                <li className="mb-10 ml-6" key={Id}>
                  <div className="absolute w-8 h-8 bg-slate-200 rounded-full -left-4 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 flex justify-center items-center text-sm">
                    {i + 1}
                  </div>
                  <div className="flex flex-row justify-between mb-2 text-sm font-normal leading-none">
                    <a
                      className="pt-2"
                      href={Url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="cursor-pointer">{Sumber}</span>
                    </a>
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
                        {(parseFloat(Score) * 100).toFixed(2) + "% Mirip"}
                      </span>
                      <span className="text-xs inline-block py-1 px-2 rounded bg-blue-100 text-blue-700 uppercase ml-2 cursor-pointer">
                        {(parseFloat(Score) * 100).toFixed(2) + " %"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={{
                      pathname: "/definisi/[id]/[definisi]",
                      query: { definisi: Definisi, id: Id },
                    }}
                  >
                    <a className="text-md font-bold hover:text-blue-500 dark:hover:text-blue-300 hover:underline cursor-pointer">
                      {Definisi}
                    </a>
                  </Link>

                  <p className="mb-4 text-base font-normal break-words">
                    {Keterangan}.
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
