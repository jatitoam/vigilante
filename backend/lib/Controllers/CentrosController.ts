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
    const item = await CentrosModel.query("uuid").eq(req.params.id).exec();
    res.status(200).json(item).end();
  }
}