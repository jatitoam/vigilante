import { fiscalesSchema } from "./FiscalesSchema";

export function departamentosSchema() {
    return {
       uuid: { type: String, required: true},
       nombre: { type: String, required: true },
       codigo: { type: String, required: true },
       fiscales: { type: Array, schema: [{ type: Object, schema: fiscalesSchema()}],}
    };
}
