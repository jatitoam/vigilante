import { Request, Response } from "express";
import { MesasModel } from "../Models/MesasModel";
import { BaseController } from "./BaseController";

export abstract class MesasController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the public list of Mesas, for Express
   *
   * @param req
   * @param res
   */
  public static async getList(req: Request, res: Response) {
    const items = await MesasModel.scan().exec();
    res.status(200).json(items).end();
  }

  /**
   * Returns the Mesas, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await MesasModel.get(req.params.id);
    if (!item) return res.status(404).end();
    res.status(200).json(item).end();
  }

  /**
   * Returns the mesas by centro uuid, for express
   * 
   * @param req 
   * @param res 
   */
  public static async getByCentro(req: Request, res: Response) {
    const items = await MesasModel.scan('centro_uuid').eq(req.params.id).exec();

    let mesas = items.map(function (item: any)
    {
        if (item.fiscales.usuario_uuid != req.uuid) {
            return item;
        }
    })

    res.status(200).json(mesas).end();
  }
}
