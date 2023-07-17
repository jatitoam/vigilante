import * as dynamoose from "dynamoose";
import { departamentoSchema } from "../Schemas/DepartamentoSchema";

// Export Departamento model
const DepartamentoModel = dynamoose.model(
  "departamento",
  new dynamoose.Schema(departamentoSchema())
);

export { DepartamentoModel };
