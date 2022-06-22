import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

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

  const url = `${baseUrl}?limit=${limit}&offset=${offset}&where=(${searchField},like,${searchQuery})`;

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
  pageInfo: {};
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

  const createPageSequence = (page: number) => {
    return Array.from(
      { length: Math.ceil(pageInfo["totalRows"] / 10) },
      (x, i) => i + (page <= 2 ? 1 : page - 2)
    );
  };

  const buildLink = (page: number) => {
    return `?query=${searchQuery}&field=${searchField}&page=${page}`;
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
        <div className="relative pt-3 px-3">
          <input
            type="text"
            className="h-14 w-full pl-5 pr-20 rounded-lg z-0 focus:shadow focus:outline-none shadow-lg"
            id="inputQuery"
            placeholder="Cari istilah hukum di sini..."
            name="query"
            defaultValue={searchQuery}
          />
          <div className="absolute top-5 right-5">
            <button
              className="h-10 w-20 text-white rounded-lg bg-blue-500 hover:bg-red-/600"
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
              id="inlineRadio1"
              value="Definisi"
              defaultChecked={searchField === "Definisi"}
            />
            <label className="form-check-label inline-block text-gray-800 cursor-pointer">
              Terminologi
            </label>
          </div>
          <div className="form-check form-check-inline mx-2">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="field"
              id="inlineRadio2"
              value="Keterangan"
              defaultChecked={searchField === "Keterangan"}
            />
            <label className="form-check-label inline-block text-gray-800 cursor-pointer">
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
                <a href={item.Url} target="_blank" rel="noreferrer">
                  <span className="text-xs inline-block py-1 px-2 uppercase rounded bg-slate-200 uppercase mb-3">
                    {item.Sumber}
                  </span>
                </a>
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
        {searchResult && searchResult.length > 0 && (
          <div className="max-w-full flex justify-center space-x-1 mt-5 pb-20">
            <Link key={-1} href={buildLink(Math.max(pageInfo["page"] - 1, 1))}>
              <a className="flex items-center px-4 py-2 bg-slate-300 rounded-md">
                Prev
              </a>
            </Link>
            {createPageSequence(pageInfo["page"]).map((i) => (
              <Link key={i} href={buildLink(i)}>
                <a
                  className={`px-4 py-2 text-gray-700  rounded-md hover:bg-blue-400 hover:text-white ${
                    i == pageInfo["page"]
                      ? "bg-blue-400 font-bold text-blue-800"
                      : "bg-slate-300"
                  }`}
                >
                  {" "}
                  {i}{" "}
                </a>
              </Link>
            ))}
            <Link key={0} href={buildLink(pageInfo["page"] + 1)}>
              <a className="px-4 py-2 bg-slate-300 rounded-md hover:bg-blue-400 hover:text-white">
                Next
              </a>
            </Link>
          </div>
        )}

        {searchResult && searchResult.length == 0 && (
          <div className="p-6 m-6 border-gray-200 text-center shadow-lg bg-white rounded-md">
            Maaf, tidak ditemukan hasil. <br /> Silakan coba dengan kata kunci
            yang lain.
          </div>
        )}
      </div>
    </>
  );
}
