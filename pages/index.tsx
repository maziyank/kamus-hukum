import Head from 'next/head'
import styles from '../styles/Home.module.css'
import react, { useState } from 'react';

export default function Home() {
  const [searchResult, setSearchResult] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const query = async () => {
    setIsSearching(true);
    const inputQuery = document.querySelector('#inputQuery') as HTMLInputElement;
    if (!inputQuery.value) {
      setIsSearching(false);
      return
    }
    const ENDPOINT = `https://api.baserow.io/api/database/rows/table/71285/?user_field_names=true&search=${inputQuery.value}`;
    let response = await fetch(ENDPOINT, {
      headers: {
        Authorization: 'Token z8XXWteBKfhsyTKxwMmFcg7cEVswU7pt'
      }
    });

    response = await response.json();
    setSearchResult(response['results']);
    setIsSearching(false);
  }

  const handleSearchEnter = (event) => {
    if (event.keyCode === 13) {
      query()
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Kamus Hukum</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="flex w-full bg-slate-200 h-auto justify-center">
          <div className='max-w-lg w-full'>
            <h1 className='pt-10 h-auto text-center text-3xl text-slate-600 w-full align-center font-bold'>Kamus Hukum Indonesia</h1>
            <div className='mt-10 mx-2 relative'>
              <input type="text" className="h-14 w-full pl-5 pr-20 rounded-lg z-0 focus:shadow focus:outline-none shadow-lg" id="inputQuery" placeholder="Cari istilah hukum di sini..." onKeyDown={(e) => handleSearchEnter(e)} />
              <div className="absolute top-2 right-2">
                <button className="h-10 w-20 text-white rounded-lg bg-blue-500 hover:bg-red-600" onClick={() => query()}>Cari</button>
              </div>
            </div>

            <div className="w-full flex mt-4 px-2">
              <div className="w-full block rounded-lg shadow-lg bg-white text-left ">
                {searchResult && searchResult.length > 0 && (
                  <div className="py-3 px-6 border-b border-gray-300 font-medium">
                    Hasil Pencarian
                  </div>
                )
                }

                {
                  isSearching && (
                    <div className="w-full p-6 border-b border-gray-300">
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
                  )

                }
                {searchResult.map(item => {
                  return (
                    <div className="w-full p-6 border-b border-gray-300" key={item.id}>
                      <span className="text-xs inline-block py-1 px-2 uppercase rounded bg-slate-200 uppercase mb-3">
                        {item.source}
                      </span>
                      <p className="text-gray-700 text-base mb-4">
                        <b>{item.alias}</b> : {item.definition}
                      </p>
                      <div className='w-full flex justify-end'>
                        <button type="button" className="inline-block mx-2 p-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        </button>
                        <button type="button" className="inline-block p-2 bg-slate-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-700 hover:shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </button>
                      </div>
                    </div>

                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main >


    </div >
  )
}
