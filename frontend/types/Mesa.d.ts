declare module '@/types/Mesa' {
  export interface Mesa {
    uuid: string
    número: string
    centro_uuid: string
    fiscales: Array<FiscalAsignado>
    recuentos: Array<RecuentoAsignado>
    notas: Array<NotaAsignada>
  }
}
