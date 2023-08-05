import { fiscalesSchema } from "./FiscalesSchema";
import { notasSchema } from "./NotasSchema";
import { recuentosSchema } from "./RecuentosSchema";

export function municipiosSchema() {
  return {
    uuid: { type: String, required: true },
    nombre: { type: String, required: true },
    código: { type: String, required: true },
    departamento_uuid: { type: String, required: true },
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
