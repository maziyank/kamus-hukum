import { GetServerSideProps } from "next";
import Pagination from "../components/pagination";
import SearchForm from "../components/searchForm";
import SearchResultItem from "../components/searchResultItem";

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
      pageInfo,
    },
  };
};

export interface HomeProps {
  searchResult: KamusItem[];
  pageInfo: PageInfo;
}

export default function Home({
  searchResult,
  pageInfo,
}: HomeProps) {

  return (
    <>
      <SearchForm />

      <div className="w-full flex flex-col mt-4 px-5">
        <div className="w-full block rounded-lg shadow-lg bg-white text-left ">
          {searchResult && searchResult.length > 0 && (
            <div className="py-3 px-6 border-b border-gray-300 font-medium">
              Hasil Pencarian ({pageInfo["totalRows"]} ditemukan)
            </div>
          )}

          {searchResult.map((item) => {
            return (<SearchResultItem kamusItem={item} />
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
