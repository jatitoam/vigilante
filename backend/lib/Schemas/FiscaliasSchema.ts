export function fiscaliasSchema() {
    return {
      departamento_uuid: { type: String, required: true },
      municipio_uuid: { type: String},
      centro_uuid: { type: String},
      mesa_uuid: { type: String},
    };
  }
  