export function fiscalesSchema() {
  return {
    usuario_uuid: { type: String, required: true },
    inicia: { type: String, required: true },
    termina: { type: String },
  };
}
