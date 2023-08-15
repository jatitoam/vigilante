import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { UsuariosModel } from "../Models/UsuariosModel";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { CentrosModel } from "../Models/CentrosModel";
import { MesasModel } from "../Models/MesasModel";

export abstract class FiscaliasController extends BaseController {
  private constructor() {
    super();
  }

  /**
   *
   * @param req
   * @param res
   */
  public static async getByUsuario(req: Request, res: Response) {
      const key =  req.usuario;
      const usuario: any = await UsuariosModel.get(key);
      const fiscalias: Array<object> = usuario.fiscalias;

     await Promise.all(fiscalias.map(async (element: any) => {
        const departamento = await DepartamentosModel.get(element.departamento_uuid);
        const municipio = await MunicipiosModel.get(element.municipio_uuid);
        const centro = await CentrosModel.get(element.centro_uuid);
        const mesa = await MesasModel.get(element.mesa_uuid);
        element.departamento = departamento.toJSON();
        element.municipio = municipio.toJSON();
        element.centro = centro.toJSON();
        element.mesa = mesa.toJSON();
        delete element.departamento_uuid;
        delete element.municipio_uuid;
        delete element.centro_uuid;
        delete element.mesa_uuid;
     }));

    const transformedData = {
        departamentos: fiscalias.map((item: any) => item.departamento),
        municipios: fiscalias.map((item: any) => item.municipio),
        centros: fiscalias.map((item: any) => item.centro),
        mesas: fiscalias.map((item: any) => item.mesa),
    };

    
    res.status(200).json(transformedData).end();
  }
}
