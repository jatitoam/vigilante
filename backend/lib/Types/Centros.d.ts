export interface Centros {
  uuid: string;
  nombre: string;
  codigo: string;
  municipio_uuid: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
