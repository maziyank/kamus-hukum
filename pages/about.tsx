import { useRouter } from 'next/router'

const About = () => {
    const router = useRouter()

    return (
        <div className="flex w-full bg-slate-100 min-h-screen h-auto justify-center">
            <div className="max-w-lg w-full p-10 bg-slate-300">
                <h1 className="max-w-lg text-xl font-bold font-serif mb-5">Tentang Aplikasi</h1>
                <div className="w-full">
                    <p className="mb-3" >Aplikasi Kamus Hukum memuat kumpulan definisi hukum yang diambil dari peraturan perundang-undangan yang ada di Indonesia. Aplikasi ini dapat dimanfaatkan oleh praktisi hukum, akademisi atau masyarakat yang memerlukan cara cepat untuk mencari definisi dari sebuah terminologi hukum secara cepat.</p>
                    <p className="mb-3">Saat ini, fitur aplikasi dan database masih dalam proses pengembangan. Kami berkomitmen untuk terus memperbaharui fitur aplikasi dan daftar terminologi hukum di database kami agar semakin dapat memberikan nilai tambah kepada pengguna.</p>
                    <p>Kontributor Kamus Hukum:</p>
                    <ol className="pl-4 list-decimal">
                        <li>
                            Bakhtiar Amaludin
                        </li>
                        <li>
                            Sukirno
                        </li>
                        <li>
                            I Gede Yudi Paramartha
                        </li>
                    </ol>

                    <div className="mt-4 bg-slate-100 border-l-4 border-slate-500 text-slate-700 p-2" role="alert">
                        <p className="font-bold">Berkontribusi</p>
                        <p>Jika anda tertarik untuk menjadi kontributor silahkan kunjungi laman repository aplikasi ini <a className="font-bold text-blue-600" href="https://github.com/maziyank/kamus-hukum" target="_blank">di sini</a></p>
                    </div>


                </div>
                <div className="w-full mt-5 flex justify-center">
                    <button className="h-10 w-20 text-white rounded-lg bg-blue-500 hover:bg-red-/600" onClick={e => router.back()}>Kembali</button>

                </div>
            </div>
        </div>
    )
}

export default About;