import { Request, Response } from "express";
import { CentrosModel } from "../Models/CentrosModel";
import { BaseController } from "./BaseController";

export abstract class CentrosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the public list of Centros, for Express
   *
   * @param req
   * @param res
   */
  public static async getList(req: Request, res: Response) {
    const items = await CentrosModel.scan().exec();
    res.status(200).json(items).end();
  }

  /**
   * Returns the Centros, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await CentrosModel.get(req.params.id);
    if (!item) return res.status(404).end();
    res.status(200).json(item).end();
  }

  /**
   * 
   * @param req
   * @param res 
   */
  public static async getByMunicipio(req: Request, res: Response) {
    const items = await CentrosModel.scan('municipio_uuid').eq(req.params.id).exec();
    if (!items) return res.status(404).end();
    let newItems = items.map(function (item: any){ return [{"uuid": item.uuid, "nombre": item.nombre, "código": item.código}]})
    res.status(200).json(newItems).end();
  }
}
