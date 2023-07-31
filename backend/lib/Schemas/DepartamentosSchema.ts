import { fiscalesSchema } from "./FiscalesSchema";
import { recuentosSchema } from "./RecuentosSchema";

export function departamentosSchema() {
    return {
       uuid: { type: String},
       nombre: { type: String, required: true },
       codigo: { type: String, required: true },
       fiscales: { type: Array, schema: [{ type: Object, schema: fiscalesSchema()}],},
       recuentos: { type: Array,  schema: [{ type: Object, schema: recuentosSchema()}]}
    };
}
