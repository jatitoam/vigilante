import * as dynamoose from "dynamoose";
import { departamentosSchema } from "../Schemas/DepartamentosSchema";

// Export Departamentos model
const DepartamentosModel = dynamoose.model(
  "departamentos",
  new dynamoose.Schema(departamentosSchema())
);

export { DepartamentosModel };
