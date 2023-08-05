export function fiscalesSchema() {
  return {
    usuario_uuid: { type: String, required: true },
    inicia: { type: String },
    termina: { type: String },
  };
}
