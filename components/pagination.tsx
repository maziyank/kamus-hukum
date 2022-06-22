import Link from "next/link";

export interface PaginationProps {
  pageInfo: PageInfo;
  maxItems: number;
}

export default function Pagination({ pageInfo, maxItems }: PaginationProps) {
  const lastPage = Math.ceil(pageInfo.totalRows / parseInt(pageInfo.pageSize));

  const items = [pageInfo.page];
  let i = 1;
  while (items.length < maxItems) {
    if (pageInfo.page - i > 0) items.unshift(pageInfo.page - i);
    if (items.length > maxItems) break;
    if (pageInfo.page + i <= lastPage) items.push(pageInfo.page + i);
    i++;
  }

  return (
    <div className="max-w-full flex justify-center space-x-1 my-5">
      {!pageInfo.isFirstPage && (
        <Link
          key="first"
          href={{
            query: { page: 1 },
          }}
        >
          <a className="px-4 py-2 bg-slate-300 rounded-md hover:bg-blue-400 hover:text-white">
            Awal
          </a>
        </Link>
      )}
      {items.map((i) => (
        <Link key={i} href={{ query: { page: i } }}>
          <a
            className={`px-4 py-2 text-gray-700  rounded-md hover:bg-blue-400 hover:text-white ${
              i == pageInfo["page"]
                ? "bg-blue-400 font-bold text-blue-800"
                : "bg-slate-300"
            }`}
          >
            {i}
          </a>
        </Link>
      ))}
      <Link key="last" href={{ query: { page: lastPage } }}>
        <a className="px-4 py-2 bg-slate-300 rounded-md hover:bg-blue-400 hover:text-white">
          Akhir
        </a>
      </Link>
    </div>
  );
}