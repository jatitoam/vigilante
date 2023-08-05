import { fiscalesSchema } from "./FiscalesSchema";
import { recuentosSchema } from "./RecuentosSchema";

export function mesasSchema() {
    return {
       uuid: { type: String, required: true},
       numero: { type: String, required: true },
       centro_uuid: { type: String, required: true },
       inicia: { type: String, required: true},
       termina: { type: String},
       fiscales: { type: Array, schema: [{ type: Object, schema: fiscalesSchema()}]},
       recuentos: { type: Array,  schema: [{ type: Object, schema: recuentosSchema()}]}
    };
}
