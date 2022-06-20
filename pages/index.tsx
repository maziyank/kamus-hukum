import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Home() {
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pageInfo, setpageInfo] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchIn, setSearchIn] = useState('Definisi');
  const [pristineSearch, setpristineSearch] = useState(true);
  const router = useRouter()

  const searchData = async () => {
    try {
      if (!router.query.field || !router.query.query) {
        console.log("not ready");
        return
      }

      // fetch data
      setIsSearching(true);
      const page = router.query.page || 1;
      let ENDPOINT = `${process.env.NEXT_PUBLIC_SEARCH_ENDPOINT}?limit=10&offset=${(page as number - 1) * 10}&where=(${router.query.field},like,${router.query.query})`
      let response = await fetch(ENDPOINT, { headers: { 'xc-auth': process.env.NEXT_PUBLIC_AUTH } });
      response = await response.json();

      // update state
      setSearchResult(response['list']);
      setSearchIn(router.query.field as string);
      setSearchKeyword(router.query.query as string);
      setpageInfo(response['pageInfo']);
      setpristineSearch(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  React.useEffect(() => { searchData() }, [router])

  const markText = (text: string, keyword: string): string => {
    if (!keyword || keyword.length == 0) {
      return text;
    }

    return text.replace(
      new RegExp(keyword, "gi"),
      (match) => `<span class="bg-yellow-100">${match}</span>`,
    );
  }

  const clipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  const createPageSequence = (page: number) => {
    return Array.from({ length: 5 }, (x, i) => i + (page <= 2 ? 1 : (page - 2)))
  }

  const buildLink = (page: number) => {
    return `?query=${searchKeyword}&field=${searchIn}&page=${page}`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Kamus Hukum</title>
        <meta name="description" content="Kamus Hukum Indonesia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className="flex w-full bg-slate-100 min-h-screen h-auto justify-center">
          <div className="max-w-lg w-full bg-slate-300">

            <nav className="fixed top-0 max-w-lg z-50 w-full flex items-center justify-between flex-wrap bg-blue-900 p-3 shadow-lg">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Kamus Hukum Indonesia</span>
              </div>
            </nav>

            <form method='GET'>
              <div className='mt-20 mx-2 relative pt-3 px-3'>
                <input type="text" className="h-14 w-full pl-5 pr-20 rounded-lg z-0 focus:shadow focus:outline-none shadow-lg" id="inputQuery" placeholder="Cari istilah hukum di sini..." name="query" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
                <div className="absolute top-5 right-5">
                  <button className="h-10 w-20 text-white rounded-lg bg-blue-500 hover:bg-red-/600" type='submit'>Cari</button>
                </div>
              </div>

              <div className="flex justify-center mt-2 p-3">
                <div className="form-check form-check-inline mx-2">
                  <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="field" id="inlineRadio1" value="Definisi" checked={searchIn == 'Definisi'} onChange={e => setSearchIn(e.target.value)} />
                  <label className="form-check-label inline-block text-gray-800 cursor-pointer">Terminologi</label>
                </div>
                <div className="form-check form-check-inline mx-2">
                  <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="field" id="inlineRadio2" value="Keterangan" checked={searchIn == 'Keterangan'} onChange={e => setSearchIn(e.target.value)} />
                  <label className="form-check-label inline-block text-gray-800 cursor-pointer">Penjelasan</label>
                </div>
              </div>
            </form>

            <div className="w-full flex mt-4 px-5">
              <div className="w-full block rounded-lg shadow-lg bg-white text-left ">
                {searchResult && searchResult.length > 0 && (
                  <div className="py-3 px-6 border-b border-gray-300 font-medium">
                    Hasil Pencarian ({pageInfo['totalRows']} ditemukan)
                  </div>
                )}

                {
                  isSearching &&
                  Array.from(Array(10).keys()).map((item, index) => (
                    <div key={index} className="w-full p-6 border-b border-gray-300">
                      <div className="animate-pulse text-gray-700 text-base">
                        <div className="w-full bg-gray-300 h-4 rounded-md mb-2"></div>
                        <div className="w-full bg-gray-300 h-4 rounded-md mb-2"></div>
                        <div className="w-full bg-gray-300 h-4 rounded-md mb-2"></div>
                        <div className='w-full flex justify-end mt-5'>
                          <div className="w-10 mx-1 bg-gray-300 h-6 rounded-md mb-2"></div>
                          <div className="w-10 mx-1 bg-gray-300 h-6 rounded-md mb-2"></div>
                          <div className="w-10 mx-1 bg-gray-300 h-6 rounded-md mb-2"></div>
                        </div>
                      </div>
                    </div>
                  ))
                }

                {!isSearching && searchResult.map(item => {
                  return (
                    <div className="w-full p-6 border-b border-gray-300" key={item.Id}>
                      <a href={item.Url} target="_blank" rel="noreferrer"><span className="text-xs inline-block py-1 px-2 uppercase rounded bg-slate-200 uppercase mb-3">
                        {item.Sumber}
                      </span></a>
                      <p className="text-gray-700 text-base mb-4" dangerouslySetInnerHTML={{ __html: '<b>' + markText(item.Definisi, searchKeyword) + '</b> <br/>' + markText(item.Keterangan, searchKeyword) }}>

                      </p>
                      <div className='w-full flex justify-end'>
                        <button type="button" className="inline-block p-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg" onClick={e => clipboard(item.Keterangan)}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        </button>
                      </div>
                    </div>

                  )
                })}
              </div>

            </div>
            {searchResult && searchResult.length > 0 && (
              <div className='max-w-full flex justify-center space-x-1 mt-5 pb-20'>
                <Link key={-1} href={buildLink(Math.max(pageInfo["page"] - 1, 1))}>
                  <a className="flex items-center px-4 py-2 bg-slate-300 rounded-md">
                    Prev
                  </a>
                </Link>
                {createPageSequence(pageInfo['page']).map(i => (
                  <Link key={i} href={buildLink(i)}>
                    <a className={`px-4 py-2 text-gray-700  rounded-md hover:bg-blue-400 hover:text-white ${i == pageInfo["page"] ? 'bg-blue-400 font-bold text-blue-800' : 'bg-slate-300'}`}> {i} </a>
                  </Link>
                ))}
                <Link key={0} href={buildLink(pageInfo["page"] + 1)}>
                  <a className="px-4 py-2 bg-slate-300 rounded-md hover:bg-blue-400 hover:text-white">
                    Next
                  </a>
                </Link>
              </div>
            )}

            {!pristineSearch  && searchResult && searchResult.length == 0 && (
              <div className="p-6 m-6 border-gray-200 text-center shadow-lg bg-white rounded-md">
                Maaf, tidak ditemukan hasil. <br /> Silakan coba dengan kata kunci yang lain.
              </div>
            )}

            <div className='fixed bottom-0 max-w-lg w-full bg-slate-300 flex justify-center bg-blue-800 p-3 text-white shadow-lg'>
              <Link href="/about">
                <a className="mx-2 font-semibold hover:text-blue-300" href=""><span>Tentang</span></a>
              </Link> |
              <Link href="/disclaimer">
                <a className="mx-2 font-semibold hover:text-blue-300" href=""><span>Disclaimer</span></a>
              </Link>
            </div>
          </div>


        </div>


      </main>


    </div>
  )
}
