import * as dynamoose from "dynamoose";
import { mesasSchema } from "../Schemas/MesasSchema";

// Export Centro model
const MesasModel = dynamoose.model(
  "mesa",
  new dynamoose.Schema(mesasSchema())
);

export { MesasModel };
