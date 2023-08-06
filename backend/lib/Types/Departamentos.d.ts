export interface Departamentos {
  uuid: string;
  nombre: string;
  código: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
