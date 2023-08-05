export function notasSchema() {
  return {
    nota: { type: String, required: true },
    urgente: { type: Boolean, required: true },
    timestamp: { type: String, required: true },
    usuario_uuid: { type: String, required: true },
  };
}
