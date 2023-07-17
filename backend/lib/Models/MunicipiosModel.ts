import * as dynamoose from "dynamoose";
import { municipiosSchema } from "../Schemas/MunicipiosSchema";

// Export Municipio model
const MunicipiosModel = dynamoose.model(
  "municipios",
  new dynamoose.Schema(municipiosSchema())
);

export { MunicipiosModel };
