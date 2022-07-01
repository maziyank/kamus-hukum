import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import SeoTags from "../components/seoTags";

const About = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  return (
    <>
      <SeoTags
        title="Tentang Kami | Kamus Hukum Indonesia"
        description="Laman berisi hal-hal tentang Kamus Hukum Indonesia dan pihak-pihak yang berkontribusi."
      />
      <div className="p-8">
        <div className="flex justify-center mb-5">
          <img
            src={
              resolvedTheme == "dark"
                ? "/long_logo_white.png"
                : "/long_logo.png"
            }
            alt="me"
            width="300"
            height="30"
          />
        </div>
        <p className="mb-3">
          Aplikasi Kamus Hukum memuat kumpulan definisi hukum yang diambil dari
          peraturan perundang-undangan yang ada di Indonesia. Aplikasi ini dapat
          dimanfaatkan oleh praktisi hukum, akademisi atau masyarakat yang
          memerlukan cara cepat untuk mencari definisi dari sebuah terminologi
          hukum secara cepat.
        </p>
        <p className="mb-3">
          Saat ini, fitur aplikasi dan database masih dalam proses pengembangan.
          Kami berkomitmen untuk terus memperbaharui fitur aplikasi dan daftar
          terminologi hukum di database kami agar semakin dapat memberikan nilai
          tambah kepada pengguna.
        </p>
        <p className="font-bold text-xl mb-2 mt-5">Kontributor Kamus Hukum:</p>
        <div className="border-t border-gray-400 w-full h-2"></div>
        <p className="font-semibold">Developer</p>
        <ol className="pl-4 list-decimal">
          <li>
            <a
              href="https://github.com/maziyank"
              rel="noreferrer"
              target="_blank"
            >
              Bakhtiar Amaludin
            </a>
          </li>
          <li>
            <a
              href="https://github.com/mblonyox"
              rel="noreferrer"
              target="_blank"
            >
              Sukirno
            </a>
          </li>
          <li>
            <a
              href="https://github.com/tayarsutayar"
              rel="noreferrer"
              target="_blank"
            >
              Achmadaniar Anindya Rosadi
            </a>
          </li>
        </ol>
        <p className="font-semibold mt-2">Data Management:</p>
        <ol className="pl-4 list-decimal">
          <li>
            <a href="#" rel="noreferrer" target="_blank">
              Zachroni
            </a>
          </li>
          <li>
            <a
              href="https://id.linkedin.com/in/i-gede-yudi-paramartha-99613073"
              rel="noreferrer"
              target="_blank"
            >
              I Gede Yudi Paramartha
            </a>
          </li>
          <li>
            <a
              href="https://id.linkedin.com/in/putujasprayana"
              rel="noreferrer"
              target="_blank"
            >
              Putu Jasprayana M.P.
            </a>
          </li>
          <li>
            <a
              href="https://id.linkedin.com/in/ismulaksan92"
              rel="noreferrer"
              target="_blank"
            >
              Ismul Aksan
            </a>
          </li>
          <li>
            <a
              href="https://id.linkedin.com/in/ika-kardian-rahmatullah-ba84a685"
              rel="noreferrer"
              target="_blank"
            >
              Ika Kardian Rahmatullah
            </a>
          </li>
          <li>
            <a
              href="https://id.linkedin.com/in/iqbal-irsyaddi-70988a5a"
              rel="noreferrer"
              target="_blank"
            >
              Iqbal Irsyaddi
            </a>
          </li>
        </ol>

        <div
          className="mt-4 bg-slate-100 border-l-4 border-slate-500 text-slate-700 p-2"
          role="alert"
        >
          <p className="font-bold">Berkontribusi</p>
          <p>
            Jika anda tertarik untuk menjadi kontributor silahkan kunjungi laman
            repository aplikasi ini{" "}
            <a
              className="font-bold text-blue-600"
              href="https://github.com/maziyank/kamus-hukum"
              rel="noreferrer"
              target="_blank"
            >
              di sini{" "}
            </a>{" "}
            atau kirimkan pesan ke{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href="mailto:admin@kamus-hukum.com"
            >
              admin@kamus-hukum.com
            </a>
          </p>
        </div>
      </div>
      <div className="w-full mb-10 mt-2 flex justify-center">
        <button
          className="h-10 w-20 text-white rounded-lg bg-blue-700 hover:bg-red-600"
          onClick={(e) => router.back()}
        >
          Kembali
        </button>
      </div>
    </>
  );
};

export default About;
