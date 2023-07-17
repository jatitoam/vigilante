import * as dynamoose from "dynamoose";
import { municipioSchema } from "../Schemas/MunicipioSchema";

// Export Municipio model
const MunicipioModel = dynamoose.model(
  "municipio",
  new dynamoose.Schema(municipioSchema())
);

export { MunicipioModel };
