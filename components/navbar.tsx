import Link from "next/link";
import ThemeTogglerButton from "./themeTogglerButton";
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between flex-wrap bg-gradient-to-r to-cyan-600 from-blue-800 p-3 shadow-lg">
      <Link href="/">
        <a className="font-semibold text-xl text-white tracking-tight">
         <h1><Image src="/logo.png" alt="me" width="16" height="16" /> {"  "} Kamus Hukum Indonesia</h1>
        </a>
      </Link>
      <ThemeTogglerButton />
    </nav>
  );
}
