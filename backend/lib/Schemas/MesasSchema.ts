export function mesasSchema() {
    return {
       uuid: { type: String, required: true},
       numero: { type: String, required: true },
       centro_uuid: { type: String, required: true },
       inicia: { type: String, required: true},
       termina: { type: String}
    };
}
