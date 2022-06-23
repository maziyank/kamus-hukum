import Link from "next/link";
import { useRouter } from "next/router";

export interface PaginationProps {
  pageInfo: PageInfo;
  maxItems: number;
}

export default function Pagination({ pageInfo, maxItems }: PaginationProps) {
  const router = useRouter();

  const lastPage = Math.ceil(pageInfo.totalRows / parseInt(pageInfo.pageSize));

  const items = [pageInfo.page];
  let i = 1;
  while (items.length < maxItems) {
    const prev = pageInfo.page - i;
    if (prev > 0) items.unshift(prev);
    if (items.length > maxItems) break;
    const next = pageInfo.page + i;
    if (next <= lastPage) items.push(next);
    if (prev <= 0 && next > lastPage) break;
    i++;
  }

  return (
    <div className="max-w-full flex justify-center space-x-1 my-5">
      {!pageInfo.isFirstPage && (
        <Link
          key="first"
          href={{
            query: { ...router.query, page: 1 },
          }}
        >
          <a className="px-4 py-2 bg-slate-300 rounded-md hover:bg-blue-400 hover:text-white">
            Awal
          </a>
        </Link>
      )}
      {items.map((i) => (
        <Link key={i} href={{ query: { ...router.query, page: i } }}>
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
      {!pageInfo.isLastPage && (
        <Link key="last" href={{ ...router.query, query: { page: lastPage } }}>
          <a className="px-4 py-2 bg-slate-300 rounded-md hover:bg-blue-400 hover:text-white">
            Akhir
          </a>
        </Link>
      )}
    </div>
  );
}
