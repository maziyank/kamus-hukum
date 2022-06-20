import { useRouter } from 'next/router'

export default function Disclaimer() {
    const router = useRouter()

    return (
        <div className="flex w-full bg-slate-100 min-h-screen h-auto justify-center">
            <div className="max-w-lg w-full p-10 bg-slate-300">
                <h1 className="max-w-lg text-xl font-bold font-serif mb-5">Dislaimer</h1>
                <div className="w-full">
                    <p> Harap membaca prasyarat berikut dengan seksama:</p>
                    <ol className="list-decimal pl-5 mt-2">
                        <li>
                            Aplikasi ini tidak terafiliasi dengan instansi manapun, karena dikembangkan atas nama pribadi untuk membantu para pihak yang membutuhkan.
                        </li>
                        <li>
                            Penggunaan definisi hukum dari aplikasi ini adalah tanggung jawab pengguna. Meski kami membantu untuk menyediakan data namun pengguna tetap wajib untuk melakukan validasi dengan dokumen aslinya. Hal ini mengingat semua definisi hukum yang ada pada database kami diperoleh dengan cara melakukan parsing terhadap dokumen Undang-Undang yang kami kumpulkan. Proses parsing dilakukan secara otomatis sehingga mungkin terjadi kesalahan ketik. Selain itu, beberapa definisi mungkin berasal dari Undang-Undang yang sudah tidak berlaku.
                        </li>
                        <li>
                            Pengguna mungkin akan menemui satu definisi dengan penjelasan yang berbeda. Hal ini terjadi karena pada dasarnya definisi bisa dibatasi konteks yang dinyatakan dalam setiap regulasi pada Ketentuan Umum, sebagai contoh dalam Undang-Undang ini yang dimaksud dengan: ....
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