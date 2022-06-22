import { useRouter } from "next/router";

export default function Disclaimer() {
  const router = useRouter();

  return (
    <>
      <div className="w-full p-8">
        <h1 className="text-xl font-bold mb-5">Disclaimer</h1>

        <p> Harap membaca dan memahai prasyarat berikut dengan seksama:</p>
        <ol className="list-decimal pl-5 mt-2">
          <li className="mt-2">
            Aplikasi ini tidak terafiliasi dengan instansi manapun, karena
            dikembangkan atas nama pribadi untuk membantu para pihak yang
            membutuhkan..
          </li>
          <li className="mt-2">
            Penggunaan definisi hukum dari aplikasi ini adalah tanggung jawab
            pengguna. Aplikasi ini hanya membantu untuk menyediakan data,
            sehingga{" "}
            <b>
              pengguna tetap wajib untuk melakukan validasi dengan dokumen
              aslinya
            </b>
            . Hal ini mengingat semua definisi hukum yang ada pada database kami
            diperoleh dengan cara melakukan <i>parsing</i> terhadap dokumen
            Undang-Undang yang kami kumpulkan yang sebagian besar berformat PDF.
            Proses <i>parsing</i> terhadap dokumen PDF memungkinkan sekali kami
            tidak dapat menangkap teks secara utuh.
          </li>
          <li className="mt-2">
            Pengguna mungkin akan menemui satu definisi dengan penjelasan yang
            berbeda. Hal ini terjadi karena pada dasarnya definisi bisa dibatasi
            konteks yang dinyatakan dalam setiap regulasi. Dalam Ketentuan Umum
            peraturan perundang-undangan umumnya dicantumkan kalimat “Dalam …
            (diisi jenis peraturan perundang-undangan) ini yang dimaksud dengan:
            ....”. Hal ini menjadi batasan dari konteks atas penjelasan definisi
            dimaksud. Selain itu, beberapa definisi mungkin berasal dari
            Undang-Undang yang sudah tidak berlaku.
          </li>
        </ol>
      </div>
      <div className="w-full my-5 flex justify-center">
        <button
          className="h-10 w-20 text-white rounded-lg bg-blue-800 hover:bg-red-/600"
          onClick={(e) => router.back()}
        >
          Kembali
        </button>
      </div>
    </>
  );
}
