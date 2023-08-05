export interface Mesas {
  uuid: string;
  número: string;
  centro_uuid: string;
  inicia: string;
  termina: string;
  fiscales: Fiscales[];
  recuentos: Recuentos[];
  notas: Notas[];
}
