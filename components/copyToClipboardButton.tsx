import { useCallback } from "react";

export interface CopyToClipboardButtonProps {
  data: string;
}

export default function CopyToClipboardButton({
  data,
}: CopyToClipboardButtonProps) {
  const onButtonClick = useCallback(() => {
    navigator.clipboard.writeText(data);
    alert("Definisi berhasil disalin.");
  }, [data]);

  return (
    <button
      type="button"
      className="inline-block p-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg"
      aria-label="Copy to clipboard"
      onClick={onButtonClick}
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
  );
}
