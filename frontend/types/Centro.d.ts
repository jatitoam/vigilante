declare module '@/types/Centro' {
  export interface Centro {
    uuid: string
    nombre: string
    codigo: string
    municipio_uuid: string
    fiscales: Array<FiscalAsignado>
    recuentos: Array<RecuentoAsignado>
    notas: Array<NotaAsignada>
  }
}
