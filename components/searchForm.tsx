import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export default function SearchForm() {
  const router = useRouter();

  const [query, setQuery] = useState(router.query.query);
  const [field, setField] = useState(router.query.field);

  const onQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value),
    []
  );
  const onFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setField(event.target.value),
    []
  );
  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      router.push({
        query: {
          query,
          field,
        },
      });
      event.preventDefault();
    },
    [router, query, field]
  );

  return (
    <form method="GET" onSubmit={onFormSubmit}>
      <div className="relative pt-3 px-5">
        <input
          type="text"
          className="h-14 w-full mt-5 pl-5 pr-20 rounded-lg z-0 focus:shadow focus:outline-none shadow-lg"
          id="inputQuery"
          name="query"
          placeholder="Cari istilah hukum di sini..."
          value={query}
          onChange={onQueryChange}
        />
        <div className="absolute top-10 right-7">
          <button
            className="h-10 w-20 text-white rounded-lg bg-blue-800 hover:bg-red-600"
            type="submit"
          >
            Cari
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-2 p-3">
        <div className="form-check form-check-inline mx-2">
          <input
            className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="field"
            id="fieldDefinisi"
            value="Definisi"
            checked={field === "Definisi"}
            onChange={onFieldChange}
          />
          <label
            htmlFor="fieldDefinisi"
            className="form-check-label inline-block text-gray-800 cursor-pointer"
          >
            Terminologi
          </label>
        </div>
        <div className="form-check form-check-inline mx-2">
          <input
            className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="field"
            id="fieldKeterangan"
            value="Keterangan"
            checked={field === "Keterangan"}
            onChange={onFieldChange}
          />
          <label
            htmlFor="fieldKeterangan"
            className="form-check-label inline-block text-gray-800 cursor-pointer"
          >
            Penjelasan
          </label>
        </div>
      </div>
    </form>
  );
}
