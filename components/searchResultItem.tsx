import Link from "next/link";
import { useRouter } from "next/router";
import { Kamus } from "../services/DataKamusService";
import CopyToClipboardButton from "./copyToClipboardButton";
import HighlightText from "./highlightText";

export interface SearchResultItemProps {
  kamusItem: Kamus;
}

export default function SearchResultItem({
  kamusItem: { id, definisi, keterangan, sumber, url, verified },
}: SearchResultItemProps) {
  const router = useRouter();
  const keyword = router.query.query?.toString();

  return (
    <div className="w-full p-6 border-b border-gray-300">
      <div className="flex flex-row w-full justify-between">
        <Link
          href={{
            pathname: "/definisi/[id]/[definisi]",
            query: { definisi, id },
          }}
          className="hover:text-blue-500 dark:hover:text-blue-300 underline mr-2"
        >
            <h2 className="font-bold mb-2">
              <HighlightText text={definisi} keyword={keyword} />
            </h2>
        </Link>

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

      <p className="text-slate-700 dark:text-slate-50 text-base mb-4 break-words">
        <HighlightText text={keterangan + "."} keyword={keyword} />
      </p>
      <div className="w-full flex justify-between">
        <a href={url} target="_blank" rel="noreferrer">
          <span className="text-xs inline-block py-1 px-2 rounded bg-slate-200 dark:bg-slate-600 hover:bg-blue-100 uppercase mb-3">
            {sumber}
          </span>
        </a>
        <CopyToClipboardButton data={keterangan} />
      </div>
    </div>
  );
}
