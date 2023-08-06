declare module '@/types/RecuentoAsignado' {
  export interface RecuentoAsignado {
    partido_uuid: string
    votos: number
    dudas?: number
    impugnados?: number
  }
}
