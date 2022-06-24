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
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
    </button>
  );
}
