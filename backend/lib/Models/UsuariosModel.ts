import * as dynamoose from "dynamoose";
import { usuariosSchema } from "../Schemas/UsuariosSchema";

const schema = new dynamoose.Schema(usuariosSchema());

// Export Municipio model
const UsuariosModel = dynamoose.model(
  "usuarios",
  schema
);

export { UsuariosModel };
