import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { UsuariosModel } from "../Models/UsuariosModel";

const jwtKey = process.env.JWT_KEY || "secret";
const jwtExpiration = process.env.JWT_EXPIRATION || "24h";

export abstract class UsuariosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Process Login
   *
   * @param req
   * @param res
   */
  public static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    // Return 406 if no username or password provided
    if (!username || !password) {
      res.status(406).json({ error: "Credenciales inválidas" });
      return;
    }

    const item = await UsuariosModel.scan("usuario").eq(username).exec();
    const data = item.toJSON()[0];

    if (username === data.usuario && password === data.contraseña) {
      const usuario = data.usuario;
      const uuid = data.uuid;
      const nombre = data.nombre;
      const apellido = data.apellido;
      const token = jwt.sign({ usuario, uuid, nombre, apellido }, jwtKey, {
        expiresIn: jwtExpiration,
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  }

  public static async verifyToken(req: Request, res: Response, next: Function) {
    const authorization = req.headers["authorization"];
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, jwtKey, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido" });
      }

      req.usuario = {
        usuario: decoded.usuario,
        uuid: decoded.uuid,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
      };

      next();
    });
  }
}
