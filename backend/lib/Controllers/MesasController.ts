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
    const item = await MesasModel.query("uuid").eq(req.params.id).exec();
    res.status(200).json(item).end();
  }
}