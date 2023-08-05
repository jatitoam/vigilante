import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";
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
  public static async getFromUser(req: Request, res: Response) {
    if (typeof req.usuario === "undefined" || req.usuario === null) {
      res.status(500);
    }

    const departamentos = await DepartamentosModel.scan().exec();
    const municipios = await MunicipiosModel.scan().exec();
    const centros = await CentrosModel.scan().exec();
    const mesas = await MesasModel.scan().exec();

    let fiscales: any[] = Array();

    departamentos.forEach((element) => {
      element.fiscales.forEach((fiscal: any) => {
        if (
          typeof req.usuario !== "undefined" &&
          fiscal.usuario_uuid === req.usuario.uuid
        ) {
          var departamento: any = {};
          departamento.tipo = "departamento";
          departamento.uuid = element.uuid;
          departamento.nombre = element.nombre;
          departamento.codigo = element.codigo;
          fiscales.push(departamento);
        }
      });
    });

    municipios.forEach((element) => {
      element.fiscales.forEach((fiscal: any) => {
        if (
          typeof req.usuario !== "undefined" &&
          fiscal.usuario_uuid === req.usuario.uuid
        ) {
          var municipio: any = {};
          municipio.tipo = "municipio";
          municipio.uuid = element.uuid;
          municipio.nombre = element.nombre;
          municipio.codigo = element.codigo;
          fiscales.push(municipio);
        }
      });
    });

    centros.forEach((element) => {
      element.fiscales.forEach((fiscal: any) => {
        if (
          typeof req.usuario !== "undefined" &&
          fiscal.usuario_uuid === req.usuario.uuid
        ) {
          var centro: any = {};
          centro.tipo = "centro";
          centro.uuid = element.uuid;
          centro.nombre = element.nombre;
          centro.codigo = element.codigo;
          fiscales.push(centro);
        }
      });
    });

    mesas.forEach((element) => {
      element.fiscales.forEach((fiscal: any) => {
        if (
          typeof req.usuario !== "undefined" &&
          fiscal.usuario_uuid === req.usuario.uuid
        ) {
          var mesa: any = {};
          mesa.tipo = "mesa";
          mesa.uuid = element.uuid;
          mesa.número = element.número;
          fiscales.push(mesa);
        }
      });
    });

    res.status(200).json(fiscales).end();
  }
}
