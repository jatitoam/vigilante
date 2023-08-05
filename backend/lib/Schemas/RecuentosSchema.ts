export function recuentosSchema() {
  return {
    partido_uuid: { type: String, required: true },
    votos: { type: Number },
    dudas: { type: Number },
    impugnados: { type: Number },
  };
}
