import { fiscalesSchema } from "./FiscalesSchema";
import { recuentosSchema } from "./RecuentosSchema";

export function municipiosSchema() {
    return {
       uuid: { type: String, required: true},
       nombre: { type: String, required: true },
       codigo: { type: String, required: true },
       departamento_uuid: { type: String, required: true},
       fiscales: { type: Array, schema: [{ type: Object, schema: fiscalesSchema()}],},
       recuentos: { type: Array,  schema: [{ type: Object, schema: recuentosSchema()}]}
    };
}
