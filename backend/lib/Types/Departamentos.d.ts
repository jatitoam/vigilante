export interface Departamentos {
  uuid: string;
  nombre: string;
  codigo: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
