import { useRouter } from 'next/router'

export default function Disclaimer() {
    const router = useRouter()

    return (
        <div className="flex w-full bg-slate-100 min-h-screen h-auto justify-center">
            <div className="max-w-lg w-full p-10 bg-slate-300">
                <h1 className="max-w-lg text-xl font-bold font-serif mb-5">Disclaimer</h1>
                <div className="w-full">
                    <p> Harap membaca dan memahai prasyarat berikut dengan seksama:</p>
                    <ol className="list-decimal pl-5 mt-2">
                        <li className="mt-2">
                            Aplikasi ini tidak terafiliasi dengan instansi manapun, karena dikembangkan atas nama pribadi untuk membantu para pihak yang membutuhkan.
                        </li>
                        <li className="mt-2">
                            Penggunaan definisi hukum dari aplikasi ini adalah tanggung jawab pengguna. Aplikasi ini hanya membantu untuk menyediakan data, sehingga pengguna tetap wajib untuk melakukan validasi dengan dokumen aslinya. Hal ini mengingat semua definisi hukum yang ada pada database kami diperoleh dengan cara melakukan <i>parsing</i> terhadap dokumen Undang-Undang yang kami kumpulkan yang sebagian besar berformat PDF. Proses <i>parsing</i> terhadap dokumen PDF memungkinkan sekali kami tidak dapat menangkap teks secara utuh. 
                        </li>
                        <li className="mt-2">
                        Beberapa definisi mungkin berasal dari Undang-Undang yang sudah tidak berlaku. Selain itu, pengguna mungkin akan menemui satu definisi di dua atau lebih peraturan yang masih berlaku dengan penjelasan yang berbeda. Hal ini dapat terjadi karena penggunaan definisi bisa dibatasi konteks yang dinyatakan dalam setiap regulasi pada Ketentuan Umum.
                        </li>
                    </ol>

                </div>
                <div className="w-full mt-5 flex justify-center">
                    <button className="h-10 w-20 text-white rounded-lg bg-blue-500 hover:bg-red-/600" onClick={e => router.back()}>Kembali</button>
                </div>
            </div>
        </div>

    )
} 