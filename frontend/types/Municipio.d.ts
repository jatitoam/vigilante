declare module '@/types/Municipio' {
  export interface Municipio {
    uuid: string
    nombre: string
    código: string
    departamento_uuid: string
    fiscales: Array<FiscalAsignado>
    recuentos: Array<RecuentoAsignado>
    notas: Array<NotaAsignada>
  }
}
