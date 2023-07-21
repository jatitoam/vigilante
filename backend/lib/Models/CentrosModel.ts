import * as dynamoose from "dynamoose";
import { centrosSchema } from "../Schemas/CentrosSchema";

// Export Centro model
const CentrosModel = dynamoose.model(
  "centros",
  new dynamoose.Schema(centrosSchema())
);

export { CentrosModel };
