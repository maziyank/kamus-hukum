import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 max-w-lg w-full bg-slate-300 flex justify-center bg-blue-800 p-3 text-white shadow-lg">
      <Link href="/about">
        <a className="mx-2 font-semibold hover:text-blue-300" href="">
          <span>Tentang</span>
        </a>
      </Link>
      |
      <Link href="/disclaimer">
        <a className="mx-2 font-semibold hover:text-blue-300" href="">
          <span>Disclaimer</span>
        </a>
      </Link>
    </div>
  );
}