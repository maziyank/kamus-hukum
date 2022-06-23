import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full flex justify-center bg-gradient-to-r to-cyan-600 from-blue-800 p-3 text-white shadow-lg">
      <Link href="/about">
        <a className="mx-2 font-semibold hover:text-blue-300">
          <span>Tentang</span>
        </a>
      </Link>
      |
      <Link href="/disclaimer">
        <a className="mx-2 font-semibold hover:text-blue-300">
          <span>Disclaimer</span>
        </a>
      </Link>
    </div>
  );
}
