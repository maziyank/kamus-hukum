export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      kamus: {
        Row: {
          created_at: string | null
          definisi: string | null
          id: number
          keterangan: string | null
          no: number | null
          sumber: string | null
          tahun: number | null
          updated_at: string | null
          url: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          definisi?: string | null
          id: number
          keterangan?: string | null
          no?: number | null
          sumber?: string | null
          tahun?: number | null
          updated_at?: string | null
          url?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          definisi?: string | null
          id?: number
          keterangan?: string | null
          no?: number | null
          sumber?: string | null
          tahun?: number | null
          updated_at?: string | null
          url?: string | null
          verified?: boolean | null
        }
      }
      kemiripan: {
        Row: {
          created_at: string | null
          def1: number | null
          def2: number | null
          id: number
          score: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          def1?: number | null
          def2?: number | null
          id: number
          score?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          def1?: number | null
          def2?: number | null
          id?: number
          score?: number | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
