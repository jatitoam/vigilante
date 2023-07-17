export function municipioSchema() {
    return {
       uuid: { type: String, required: true},
       nombre: { type: String, required: true },
       codigo: { type: String, required: true },
       departamento_uuid: { type: String, required: true}
    };
}
