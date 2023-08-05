import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { CentrosModel } from "../Models/CentrosModel";
import { MesasModel } from "../Models/MesasModel";

export abstract class RecuentosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the Mesas, for express
   *
   * @param req
   * @param res
   */
  public static async updateRecuento(req: Request, res: Response) {
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
      const cantidad = req.body.cantidad;
      const partido_uuid = req.body.partido_uuid;
      const departamentos = await DepartamentosModel.scan().exec();
      const municipios = await MunicipiosModel.scan().exec();
      const centros = await CentrosModel.scan().exec();
      const mesas = await MesasModel.scan().exec();

      departamentos.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            let recuentos = element.recuentos;
            var data = element;
            var uuid = element.uuid;
            delete data["uuid"];
            var recuento: any = {};

            if (recuentos.length === 0) {
              recuento.partido_uuid = partido_uuid;
              recuento.votos = cantidad;
              recuento.dudas = 0;
              recuento.impugnados = 0;

              recuentos.push(recuento);
            }

            recuentos.forEach((item: any, index: any) => {
              if (partido_uuid == item.partido_uuid) {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = item.votos + cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos[index] = recuento;
              } else {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos.push(recuento);
              }
            });

            DepartamentosModel.update({ uuid: uuid }, element.toJSON());
          }
        });
      });

      municipios.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            console.log(element);
            let recuentos = element.recuentos;
            var data = element;
            var uuid = element.uuid;
            delete data["uuid"];
            var recuento: any = {};

            if (recuentos.length === 0) {
              recuento.partido_uuid = partido_uuid;
              recuento.votos = cantidad;
              recuento.dudas = 0;
              recuento.impugnados = 0;

              recuentos.push(recuento);
            }

            recuentos.forEach((item: any, index: any) => {
              if (partido_uuid == item.partido_uuid) {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = item.votos + cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos[index] = recuento;
              } else {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos.push(recuento);
              }
            });

            MunicipiosModel.update({ uuid: uuid }, element.toJSON());
          }
        });
      });

      centros.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            let recuentos = element.recuentos;
            var data = element;
            var uuid = element.uuid;
            delete data["uuid"];
            var recuento: any = {};

            if (recuentos.length === 0) {
              recuento.partido_uuid = partido_uuid;
              recuento.votos = cantidad;
              recuento.dudas = 0;
              recuento.impugnados = 0;

              recuentos.push(recuento);
            }

            recuentos.forEach((item: any, index: any) => {
              if (partido_uuid == item.partido_uuid) {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = item.votos + cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos[index] = recuento;
              } else {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos.push(recuento);
              }
            });

            CentrosModel.update({ uuid: uuid }, element.toJSON());
          }
        });
      });

      mesas.forEach((element) => {
        element.fiscales.forEach((fiscal: any) => {
          if (fiscal.usuario_uuid == tokenInfo.uuid) {
            let recuentos = element.recuentos;
            var data = element;
            var uuid = element.uuid;
            delete data["uuid"];
            var recuento: any = {};

            if (recuentos.length === 0) {
              recuento.partido_uuid = partido_uuid;
              recuento.votos = cantidad;
              recuento.dudas = 0;
              recuento.impugnados = 0;

              recuentos.push(recuento);
            }

            recuentos.forEach((item: any, index: any) => {
              if (partido_uuid == item.partido_uuid) {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = item.votos + cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos[index] = recuento;
              } else {
                recuento.partido_uuid = partido_uuid;
                recuento.votos = cantidad;
                recuento.dudas = 0;
                recuento.impugnados = 0;

                recuentos.push(recuento);
              }
            });

            MesasModel.update({ uuid: uuid }, element.toJSON());
          }
        });
      });

      res.status(200).json().end();
    });
  }
}
