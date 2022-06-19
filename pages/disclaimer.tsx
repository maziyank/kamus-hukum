const Disclaimer = () => {
    return (
        <div className="w-full bg-slate-200 min-h-screen h-auto justify-center p-10">
            <h1 className="max-w-lg w-full text-xl font-bold font-serif mb-5">Disclaimer</h1>
            <div className="w-full">
                <p className="mb-3" >
                    <ol className="list-decimal">
                    <li>
                        Aplikasi ini tidak terafiliasi dengan instansi manapun, karena dikembangkan atas nama pribadi untuk membantu para pihak yang membutuhkan.
                    </li>
                    <li>
                        Penggunaan definisi hukum dari aplikasi ini adalah tanggung jawab pengguna. Meski kami membantu untuk menyediakan data namun pengguna tetap wajib untuk melakukan validasi dengan dokumen aslinya. Hal ini mengingat semua definisi hukum yang ada pada database kami diperoleh dengan cara melakukan parsing terhadap dokumen Undang-Undang yang kami kumpulkan. Proses parsing dilakukan secara otomatis sehingga mungkin terjadi kesalahan ketik. Selain itu, beberapa definisi mungkin berasal dari Undang-Undang yang sudah tidak berlaku.
                    </li>
                    <li>
                        Pengguna mungkin akan menemui satu definisi dengan penjelasan yang berbeda. Hal ini terjadi karena pada dasarnya definisi bisa dibatasi konteks yang dinyatakan dalam setiap regulasi pada Ketentuan Umum, sebagai contoh dalam Undang-Undang ini yang dimaksud dengan: ....
                    </li>
                </ol></p>
            </div>
        </div>
    )
}

export default Disclaimer