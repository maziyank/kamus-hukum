import Link from "next/link";
import { useRouter } from "next/router";
import CopyToClipboardButton from "./copyToClipboardButton";
import HighlightText from "./highlightText";

export interface SearchResultItemProps {
  kamusItem: KamusItem;
}

export default function SearchResultItem({
  kamusItem: { Id, Definisi, Keterangan, Sumber, Url, Verified },
}: SearchResultItemProps) {
  const router = useRouter();
  const keyword = router.query.query?.toString();

  return (
    <div className="w-full p-6 border-b border-gray-300">
      <div className="flex flex-row w-full justify-between">
        <a href={Url} target="_blank" rel="noreferrer">
          <span className="text-xs inline-block py-1 px-2 rounded bg-slate-200 hover:bg-blue-100 uppercase mb-3">
            {Sumber}
          </span>
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
      </div>
      <Link
        href={{
          pathname: "/definisi/[id]/[definisi]",
          query: { definisi: Definisi, id: Id },
        }}
      >
        <a className="hover:text-blue-300 underline">
          <h6 className="font-bold mb-2">
            <HighlightText text={Definisi} keyword={keyword} />
          </h6>
        </a>
      </Link>
      <p className="text-gray-700 text-base mb-4">
        <HighlightText text={Keterangan + "."} keyword={keyword} />
      </p>
      <div className="w-full flex justify-end">
        <CopyToClipboardButton data={Keterangan} />
      </div>
    </div>
  );
}
