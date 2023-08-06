declare module '@/types/Departamento' {
  export interface Departamento {
    uuid: string
    nombre: string
    código: string
    fiscales: Array<FiscalAsignado>
    recuentos: Array<RecuentoAsignado>
    notas: Array<NotaAsignada>
  }
}
