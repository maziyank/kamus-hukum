import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between flex-wrap bg-gradient-to-r to-cyan-600 from-blue-800 p-3 shadow-lg">
      <Link href="/">
        <a className="font-semibold text-xl text-white tracking-tight">
          Kamus Hukum Indonesia
        </a>
      </Link>
    </nav>
  );
}
