import { Database } from "../lib/database.types";
import { supabase } from "../lib/supabase";

export async function getKamusList(
  keyword: string,
  field: "definisi" | "keterangan",
  limit = 10,
  offset = 0
): Promise<Paginated<Kamus>> {
  let countQuery = supabase
    .from("kamus")
    .select("*", { head: true, count: "exact" });
  let dataQuery = supabase
    .from("kamus")
    .select()
    .order("verified", { ascending: false })
    .order("id", { ascending: false })
    .range(offset, offset + limit);
  if (keyword.trim().length) {
    countQuery = countQuery.textSearch(field, keyword.trim(), {
      type: "websearch",
    });
    dataQuery = dataQuery.textSearch(field, keyword.trim(), {
      type: "websearch",
    });
  }
  const countResult = await countQuery;
  if (countResult.error)
    throw Error("Error getting totalRows: " + countResult.error.message);
  const count = countResult.count;
  const { data, error } = await dataQuery;
  if (error) throw Error("Error getting kamus datas: " + error.message);
  return {
    list: data,
    pageInfo: {
      isFirstPage: offset === 0,
      isLastPage: offset + limit < count,
      totalRows: count,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
    },
  };
}

export async function getKamusRead(id: number): Promise<Kamus> {
  const { data, error } = await supabase
    .from("kamus")
    .select()
    .eq("id", id)
    .single();
  if (error) throw Error("Error getting single kamus data: " + error.message);
  return data;
}

export async function getDefinisiLain(
  definisi: string,
  exclude_id: number
): Promise<Paginated<Kamus>> {
  const { count, data, error } = await supabase
    .from("kamus")
    .select("*", { count: "exact" })
    .eq("definisi", definisi)
    .neq("id", exclude_id);
  if (error)
    throw Error("Error getting definisi lain kamus datas: " + error.message);
  return {
    list: data,
    pageInfo: {
      isFirstPage: true,
      isLastPage: true,
      totalRows: count,
      page: 1,
      pageSize: 1000,
    },
  };
}

export async function getDefinisiMirip(
  id: number,
  exclude_ids: number[]
): Promise<Paginated<Kemiripan>> {
  const { count, data, error } = await supabase
    .from("kemiripan")
    .select("id, score, kamus:kamus!def2(*)", { count: "exact" })
    .eq("def1", id)
    .not("def2", "in", `(${exclude_ids.join(",")})`);
  if (error) {
    throw Error("Error getting definisi mirip kamus datas: " + error.message);
  }
  return {
    list: data as Kemiripan[],
    pageInfo: {
      isFirstPage: true,
      isLastPage: true,
      totalRows: count,
      page: 1,
      pageSize: 1000,
    },
  };
}

export type Kamus = Database["public"]["Tables"]["kamus"]["Row"];
export type Kemiripan = Pick<
  Database["public"]["Tables"]["kemiripan"]["Row"],
  "id" | "score"
> & { kamus: Kamus };

export type PageInfo = {
  totalRows: number;
  page: number;
  pageSize: number;
  isFirstPage: boolean;
  isLastPage: boolean;
};

export type Paginated<T> = {
  list: T[];
  pageInfo: PageInfo;
};
