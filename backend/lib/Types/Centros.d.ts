export interface Centros {
  uuid: string;
  nombre: string;
  código: string;
  municipio_uuid: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
