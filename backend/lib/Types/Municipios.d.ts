export interface Municipios {
  uuid: string;
  nombre: string;
  codigo: string;
  departamento_uuid: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
