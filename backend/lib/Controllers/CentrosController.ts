import { Request, Response } from "express";
import { CentrosModel } from "../Models/CentrosModel";
import { BaseController } from "./BaseController";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { MesasModel } from "../Models/MesasModel";

export abstract class CentrosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   *
   * @param req
   * @param res
   */
  public static async getByMunicipio(req: Request, res: Response) {
    const municipio = await MunicipiosModel.get(req.params.id);
    if (!municipio) return res.status(404).end();
    const items = await CentrosModel.scan("municipio_uuid")
      .eq(req.params.id)
      .attributes(["uuid", "nombre", "código", "recuentos"])
      .exec();
    res.status(200).json(items).end();
  }

  /**
   * Returns the Centros, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await CentrosModel.get(req.params.id, {
      attributes: ["uuid", "nombre", "código", "recuentos"],
    });
    if (!item) return res.status(404).end();
    res.status(200).json(item).end();
  }
}
