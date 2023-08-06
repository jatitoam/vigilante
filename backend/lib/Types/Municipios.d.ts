export interface Municipios {
  uuid: string;
  nombre: string;
  código: string;
  departamento_uuid: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
