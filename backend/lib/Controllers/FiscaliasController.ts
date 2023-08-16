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
      element.departamento = departamento.toJSON();
      delete element.departamento_uuid;
  
      if (element.municipio_uuid) {
          const municipio = await MunicipiosModel.get(element.municipio_uuid);
          element.municipio = municipio.toJSON();
          delete element.municipio_uuid;
      }
  
      if (element.centro_uuid) {
          const centro = await CentrosModel.get(element.centro_uuid);
          element.centro = centro.toJSON();
          delete element.centro_uuid;
      }
  
      if (element.mesa_uuid) {
          const mesa = await MesasModel.get(element.mesa_uuid);
          element.mesa = mesa.toJSON();
          delete element.mesa_uuid;
      }
     }));

    const transformedData = {
        departamentos: fiscalias.map((item: any) => item.departamento),
        municipios: fiscalias.map((item: any) => item.municipio || null),
        centros: fiscalias.map((item: any) => item.centro || null),
        mesas: fiscalias.map((item: any) => item.mesa || null),
    };

    
    res.status(200).json(transformedData).end();
  }
}
