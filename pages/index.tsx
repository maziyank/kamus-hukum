import { GetServerSideProps } from "next";
import Pagination from "../components/pagination";

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const searchQuery = context.query.query?.toString() ?? "";
  const searchField =
    context.query.field?.toString() === "Keterangan"
      ? "Keterangan"
      : "Definisi";

  const page = parseInt(context.query.page?.toString()) || 1;
  const itemsPerPage = parseInt(context.query.itemsPerPage?.toString()) || 10;
  const limit = itemsPerPage;
  const offset = (page - 1) * limit;

  const baseUrl = process.env.API_BASE_URL;
  const xcAuth = process.env.API_XC_AUTH;

  const url = `${baseUrl}?limit=${limit}&offset=${offset}&sort=-Tahun,-No&where=(${searchField},like,${searchQuery})`;

  const { list: searchResult, pageInfo } = await fetch(url, {
    headers: { "xc-auth": xcAuth },
  }).then((response) => response.json());

  return {
    props: {
      searchResult,
      searchQuery,
      searchField,
      pageInfo,
    },
  };
};

export interface HomeProps {
  searchResult: any[];
  searchQuery: string;
  searchField: "Definisi" | "Keterangan";
  pageInfo: any;
}

export default function Home({
  searchResult,
  searchQuery,
  searchField,
  pageInfo,
}: HomeProps) {
  const clipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const markText = (text: string, keyword: string): string => {
    if (!keyword || keyword.length == 0) {
      return text;
    }

    return text.replace(
      new RegExp(keyword, "gi"),
      (match) => `<span class="bg-yellow-100">${match}</span>`
    );
  };

  return (
    <>
      <form method="GET">
        <div className="relative pt-3 px-5">
          <input
            type="text"
            className="h-14 w-full mt-5 pl-5 pr-20 rounded-lg z-0 focus:shadow focus:outline-none shadow-lg"
            id="inputQuery"
            placeholder="Cari istilah hukum di sini..."
            name="query"
            defaultValue={searchQuery}
          />
          <div className="absolute top-10 right-7">
            <button
              className="h-10 w-20 text-white rounded-lg bg-blue-800 hover:bg-red-600"
              type="submit"
            >
              Cari
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-2 p-3">
          <div className="form-check form-check-inline mx-2">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="field"
              id="fieldDefinisi"
              value="Definisi"
              defaultChecked={searchField === "Definisi"}
            />
            <label
              htmlFor="fieldDefinisi"
              className="form-check-label inline-block text-gray-800 cursor-pointer"
            >
              Terminologi
            </label>
          </div>
          <div className="form-check form-check-inline mx-2">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="field"
              id="fieldKeterangan"
              value="Keterangan"
              defaultChecked={searchField === "Keterangan"}
            />
            <label
              htmlFor="fieldKeterangan"
              className="form-check-label inline-block text-gray-800 cursor-pointer"
            >
              Penjelasan
            </label>
          </div>
        </div>
      </form>

      <div className="w-full flex flex-col mt-4 px-5">
        <div className="w-full block rounded-lg shadow-lg bg-white text-left ">
          {searchResult && searchResult.length > 0 && (
            <div className="py-3 px-6 border-b border-gray-300 font-medium">
              Hasil Pencarian ({pageInfo["totalRows"]} ditemukan)
            </div>
          )}

          {searchResult.map((item) => {
            return (
              <div
                className="w-full p-6 border-b border-gray-300"
                key={item.Id}
              >
                <div className="flex flex-row w-full justify-between">
                  <a href={item.Url} target="_blank" rel="noreferrer">
                    <span className="text-xs inline-block py-1 px-2 uppercase rounded bg-slate-200 uppercase mb-3">
                      {item.Sumber}
                    </span>
                  </a>
                  {item.Verified && (
                    <span className="bg-blue-100 h-6 w-6 text-blue-800 text-sm font-semibold inline-flex items-center p-1 rounded-full dark:bg-blue-200 dark:text-blue-800">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </span>)
                  }
                </div>
                <p
                  className="text-gray-700 text-base mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      "<b>" +
                      markText(item.Definisi, searchQuery) +
                      "</b> <br/>" +
                      markText(item.Keterangan, searchQuery),
                  }}
                ></p>
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    className="inline-block p-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg"
                    aria-label="Copy to clipboard"
                    onClick={(e) => clipboard(item.Keterangan)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {searchResult.length && <Pagination pageInfo={pageInfo} maxItems={5} />}

        {!searchResult.length && (
          <div className="p-6 m-6 border-gray-200 text-center shadow-lg bg-white rounded-md">
            Maaf, tidak ditemukan hasil. <br /> Silakan coba dengan kata kunci
            yang lain.
          </div>
        )}

        <div className="h-10"></div>
      </div>
    </>
  );
}
