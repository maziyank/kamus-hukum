import { useRouter } from "next/router";
import HighlightText from "./highlightText";

export interface SearchResultItemProps {
  kamusItem: KamusItem;
  onCopyToClipboardClicked?: (s: string) => void;
}

export default function SearchResultItem({
  kamusItem: { Id, Definisi, Keterangan, Sumber, Url, Verified },
  onCopyToClipboardClicked,
}: SearchResultItemProps) {
  const router = useRouter();

  return (
    <div className="w-full p-6 border-b border-gray-300" key={Id}>
      <div className="flex flex-row w-full justify-between">
        <a href={Url} target="_blank" rel="noreferrer">
          <span className="text-xs inline-block py-1 px-2 uppercase rounded bg-slate-200 uppercase mb-3">
            {Sumber}
          </span>
        </a>
        {Verified && (
          <span className="bg-blue-100 h-6 w-6 text-blue-800 text-sm font-semibold inline-flex items-center p-1 rounded-full dark:bg-blue-200 dark:text-blue-800">
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
        )}
      </div>
      <p className="text-gray-700 text-base mb-4">
        <HighlightText
          text={Definisi}
          keyword={router.query.query.toString()}
        />
        <br />
        <HighlightText
          text={Keterangan}
          keyword={router.query.query.toString()}
        />
      </p>
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="inline-block p-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg"
          aria-label="Copy to clipboard"
          onClick={() => onCopyToClipboardClicked?.(Keterangan)}
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
}
