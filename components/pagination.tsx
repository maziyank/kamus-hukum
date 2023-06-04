import Link from "next/link";
import { useRouter } from "next/router";
import { PageInfo } from "../services/DataKamusService";

export interface PaginationProps {
  pageInfo: PageInfo;
  maxItems: number;
}

export default function Pagination({ pageInfo, maxItems }: PaginationProps) {
  const router = useRouter();

  const lastPage = Math.ceil(pageInfo.totalRows / pageInfo.pageSize);

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
          className="px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-md hover:bg-blue-400 dark:hover:bg-blue-600"
        >
            Awal
        </Link>
      )}
      {items.map((i) => (
        <Link key={i} href={{ query: { ...router.query, page: i } }} className={`px-4 py-2 rounded-md hover:bg-blue-400 dark:hover:bg-blue-600 ${
          i == pageInfo["page"]
            ? "bg-blue-300 dark:bg-blue-700 font-bold"
            : "bg-slate-300 dark:bg-slate-700"
        }`}>
            {i}
        </Link>
      ))}
      {!pageInfo.isLastPage && (
        <Link key="last" href={{ query: { ...router.query, page: lastPage } }} className="px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-md hover:bg-blue-400 dark:hover:bg-blue-600">
            Akhir
        </Link>
      )}
    </div>
  );
}
