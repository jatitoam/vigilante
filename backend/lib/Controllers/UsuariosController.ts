import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { UsuariosModel } from "../Models/UsuariosModel";
const jwt = require("jsonwebtoken");

export abstract class LoginController extends BaseController {
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
      const jwtKey = process.env.JWT_KEY || "secret";
      const jwtExpiration = process.env.JWT_EXPIRATION || "24h";
      const token = jwt.sign({ usuario, uuid }, jwtKey, {
        expiresIn: jwtExpiration,
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciales inválidas" });
    }
  }
}
