import { fiscalesSchema } from "./FiscalesSchema";
import { notasSchema } from "./NotasSchema";
import { recuentosSchema } from "./RecuentosSchema";

export function mesasSchema() {
  return {
    uuid: { type: String, required: true },
    número: { type: String, required: true },
    centro_uuid: { type: String, required: true },
    inicia: { type: String },
    termina: { type: String },
    fiscales: {
      type: Array,
      schema: [{ type: Object, schema: fiscalesSchema() }],
      required: true,
    },
    recuentos: {
      type: Array,
      schema: [{ type: Object, schema: recuentosSchema() }],
      required: true,
    },
    notas: {
      type: Array,
      schema: [{ type: Object, schema: notasSchema() }],
      required: true,
    },
  };
}
