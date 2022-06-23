export interface HighlightTextProps {
  text: string;
  keyword?: string;
  markClassName?: string;
}

export default function HighlightText({
  text,
  keyword,
  markClassName,
}: HighlightTextProps) {
  if (!keyword || !keyword.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`,
    "i"
  );

  return (
    <span>
      {text
        .split(regex)
        .filter(String)
        .map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className={markClassName ?? "bg-yellow-100"}>
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
    </span>
  );
}
