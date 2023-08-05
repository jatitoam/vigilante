// Import the original Express Request type
import { Request as ExpressRequest } from "express";

declare module "express" {
  interface Usuario {
    usuario: string;
    uuid: string;
    nombre: string;
    apellido: string;
  }

  interface Request extends ExpressRequest {
    usuario?: Usuario;
  }
}
