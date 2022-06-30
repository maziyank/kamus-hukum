import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen h-auto flex justify-center bg-slate-100 dark:bg-slate-900">
      <div className="max-w-lg w-full min-h-full flex flex-col bg-slate-200 dark:bg-slate-800">
        <Navbar />
        <main className="w-full grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
