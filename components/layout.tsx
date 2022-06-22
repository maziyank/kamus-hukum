import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen h-auto justify-center pt-12 bg-slate-100">
      <Navbar />
      <main className="max-w-lg w-full min-h-full bg-slate-300">
        {children}
      </main>
      <Footer />
    </div>
  );
}
