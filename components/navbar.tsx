import Link from "next/link";
import ThemeTogglerButton from "./themeTogglerButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between flex-wrap bg-gradient-to-r to-cyan-600 from-blue-800 p-3 shadow-lg">
      <Link href="/">
        <img className="inline mr-2 -mt-1" src="/logo.png" alt="logo" width="20" height="20" />
        <h1 className="font-semibold text-xl text-white tracking-tight inline">Kamus Hukum Indonesia</h1>
      </Link>
      <ThemeTogglerButton />
    </nav>
  );
}
