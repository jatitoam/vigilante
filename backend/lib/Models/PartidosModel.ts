import * as dynamoose from "dynamoose";
import { partidosSchema } from "../Schemas/PartidosSchema";

// Export Partidos model
const PartidosModel = dynamoose.model(
  "partidos",
  new dynamoose.Schema(partidosSchema())
);

export { PartidosModel };
