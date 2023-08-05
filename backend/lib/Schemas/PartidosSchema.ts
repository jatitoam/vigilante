export function partidosSchema() {
  return {
    uuid: { type: String, required: true },
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    color: { type: String, required: true },
  };
}
