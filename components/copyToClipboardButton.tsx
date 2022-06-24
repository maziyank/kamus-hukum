import { useCallback, useState } from "react";

export interface CopyToClipboardButtonProps {
  data: string;
}

export default function CopyToClipboardButton({
  data,
}: CopyToClipboardButtonProps) {
  const onButtonClick = useCallback(() => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 750);
  }, [data]);

  const [copied, setCopied] = useState(false)

  return (
    <div className='has-tooltip'>
      <span className='tooltip rounded shadow-lg p-1 bg-gray-800 opacity-80 -mt-8 -ml-4 text-white text-xs'>{copied ? 'Teks Disalin' :
        'Salin Teks'}</span>
      <button
        type="button"
        className={`inline-block p-2 ${copied ? 'bg-green-500 hover:bg-green-700' : 'bg-slate-400 hover:bg-slate-700'} text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg`}
        aria-label="Copy to clipboard"
        onClick={onButtonClick}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {!copied && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>}
          {copied && <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />}
        </svg>
      </button>
    </div>
  );
}
