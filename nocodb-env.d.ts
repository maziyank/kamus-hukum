interface PageInfo {
  totalRows: number,
  page: number,
  pageSize: string,
  isFirstPage: boolean,
  isLastPage: boolean
}

interface KamusItem {
  Id: number,
  Definisi: string,
  Keterangan: string
  Sumber: string,
  Url: string,
  Verified: boolean
}