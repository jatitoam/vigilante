import { Request, Response } from "express";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { BaseController } from "./BaseController";
import { DepartamentosModel } from "../Models/DepartamentosModel";

export abstract class MunicipiosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   *
   * @param req
   * @param res
   */
  public static async getByDepartamento(req: Request, res: Response) {
    const departamento = await DepartamentosModel.get(req.params.id);
    if (!departamento) return res.status(404).end();

    const items = await MunicipiosModel.scan("departamento_uuid")
      .eq(req.params.id)
      .attributes(["uuid", "nombre", "código", "recuentos"])
      .exec();
    res.status(200).json(items).end();
  }

  /**
   * Returns the Municipios, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await MunicipiosModel.get(req.params.id, {
      attributes: ["uuid", "nombre", "código", "recuentos"],
    });
    if (!item) return res.status(404).end();
    res.status(200).json(item).end();
  }
}
