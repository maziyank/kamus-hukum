export default class DataKamusService {
  private baseUrl: string;
  private xcAuth: string;

  constructor(baseUrl?: string, xcAuth?: string) {
    this.baseUrl = baseUrl ?? process.env.API_BASE_URL;
    this.xcAuth = xcAuth ?? process.env.API_XC_AUTH;
  }

  private async api<T>(endpoint): Promise<T> {
    return await fetch(this.baseUrl + endpoint, {
      headers: { "xc-auth": this.xcAuth },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  }

  async getKamusList(keyword: string, field: string, limit = 10, offset = 0) {
    const endpoint = `/Kamus?limit=${limit}&offset=${offset}&sort=-Tahun,-No&where=(${field},like,${keyword})`;
    return this.api<Paginated<Kamus>>(endpoint);
  }

  async getKamusRead(id: number) {
    const endpoint = `/Kamus/${id}`;
    return this.api<Kamus>(endpoint);
  }

  async getDefinisiLain(definisi: string, exclude_id: number) {
    const endpoint = `/Kamus?sort=-Tahun,-No&where=(Definisi,eq,${definisi})~and(Id,not,${exclude_id})&limit=100`;
    return this.api<Paginated<Kamus>>(endpoint);
  }

  async getDefinisiMirip(id: number, exclude_ids: number[]) {
    const exclude_vals = exclude_ids.join(",");
    const endpoint = `/Kemiripan?sort=-Score&where=(Def1,eq,${id})~and(~not(Def2,in,${exclude_vals}))&limit=100`;
    return await this.api<Paginated<Kemiripan>>(endpoint).then(
      async ({ list, pageInfo }) => ({
        list: await Promise.all(
          list.map(async ({ Score, Def2 }) => ({
            kamus: await this.getKamusRead(Def2),
            Score,
          }))
        ),
        pageInfo,
      })
    );
  }
}

export interface Kamus {
  Id: number;
  Definisi: string;
  Keterangan: string;
  Sumber: string;
  Url: string;
  No: number;
  Tahun: number;
  CreatedAt: string;
  UpdatedAt: string;
  Verified: boolean;
}

export interface Kemiripan {
  Def1: number;
  Def2: number;
  Score: string;
  Id: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface PageInfo {
  totalRows: number;
  page: number;
  pageSize: string;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export interface Paginated<T> {
  list: T[];
  pageInfo: PageInfo;
}
