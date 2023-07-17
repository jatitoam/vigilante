import { fiscalesSchema } from "./FiscalesSchema";

export function municipiosSchema() {
    return {
       uuid: { type: String, required: true},
       nombre: { type: String, required: true },
       codigo: { type: String, required: true },
       departamento_uuid: { type: String, required: true},
       fiscales: { type: Array, schema: [{ type: Object, schema: fiscalesSchema()}],}
    };
}
