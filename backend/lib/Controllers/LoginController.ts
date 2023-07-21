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

    const item = await UsuariosModel.scan("usuario").eq(username).exec();
    const data = item.toJSON()[0];

    if (username === data.usuario && password === data.contraseña) {
        let usuario = data.usuario;
        let uuid = data.uuid;
        const token = jwt.sign({ usuario, uuid}, 'secretkeyappearshere', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
  }
}