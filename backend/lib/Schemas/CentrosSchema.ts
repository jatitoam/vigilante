import { fiscalesSchema } from "./FiscalesSchema";
import { notasSchema } from "./NotasSchema";
import { recuentosSchema } from "./RecuentosSchema";

export function centrosSchema() {
  return {
    uuid: { type: String, required: true },
    nombre: { type: String, required: true },
    código: { type: String, required: true },
    municipio_uuid: { type: String, required: true },
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
