import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";

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
  public static async getByUserUuid(req: Request, res: Response) {
    const departamentos = await DepartamentosModel.scan().exec();
    const municipios = await MunicipiosModel.scan().exec();
    let fiscales: any[] = Array();
    
    departamentos.forEach(element => {
        element.fiscales.forEach((fiscal: any) => {
            if (fiscal.usuario_uuid == req.params.id)
            {
                var deparment: any = {};
                deparment.tipo = "departamento";
                deparment.nombre = element.nombre;
                deparment.codigo = element.codigo;
                fiscales.push(deparment);
            }
        })
    });

    municipios.forEach(element => {
        element.fiscales.forEach((fiscal: any) => {
            if (fiscal.usuario_uuid == req.params.id)
            {
                var municipio: any = {};
                municipio.tipo = "municipio";
                municipio.nombre = element.nombre;
                municipio.codigo = element.codigo;
                fiscales.push(municipio);
            }
        })
    });


    res.status(200).json(fiscales).end();
  }
}