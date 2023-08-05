import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import jwt from "jsonwebtoken";
import { CentrosModel } from "../Models/CentrosModel";
import { MesasModel } from "../Models/MesasModel";

export abstract class FiscalesController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the Mesas, for express
   *
   * @param req
   * @param res
   */
  public static async getFromJWT(req: Request, res: Response) {
    let tokenInfo: any;
    // Middleware para verificar el JWT en las rutas protegidas
    const verifyToken = (req: Request, res: Response, next: Function) => {
      const token = req.headers["authorization"];

      if (!token) {
        return res.status(403).json({ error: "Token no proporcionado" });
      }

      jwt.verify(token, "secretkeyappearshere", (err: any, decoded: any) => {
        console.log(err);
        if (err) {
          return res.status(401).json({ error: "Token inválido" });
        }

        tokenInfo = decoded;
        next();
      });
    };

    verifyToken(req, res, async () => {
      const departamentos = await DepartamentosModel.scan().exec();
      const municipios = await MunicipiosModel.scan().exec();
      const centros = await CentrosModel.scan().exec();
      const mesas = await MesasModel.scan().exec();

      let fiscales: any[] = Array();

      departamentos.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            var deparment: any = {};
            deparment.tipo = "departamento";
            deparment.nombre = element.nombre;
            deparment.codigo = element.codigo;
            fiscales.push(deparment);
          }
        });
      });

      municipios.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            var municipio: any = {};
            municipio.tipo = "municipio";
            municipio.nombre = element.nombre;
            municipio.codigo = element.codigo;
            fiscales.push(municipio);
          }
        });
      });

      centros.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            var centro: any = {};
            centro.tipo = "centro";
            centro.nombre = element.nombre;
            centro.codigo = element.codigo;
            fiscales.push(centro);
          }
        });
      });

      mesas.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            var mesa: any = {};
            mesa.tipo = "mesa";
            mesa.numero = element.numero;
            fiscales.push(mesa);
          }
        });
      });

      res.status(200).json(fiscales).end();
    });
  }
}
