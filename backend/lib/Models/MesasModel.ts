import * as dynamoose from "dynamoose";
import { mesasSchema } from "../Schemas/MesasSchema";

// Export Centro model
const MesasModel = dynamoose.model(
  "mesas",
  new dynamoose.Schema(mesasSchema())
);

export { MesasModel };
