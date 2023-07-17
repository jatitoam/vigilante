import { Request, Response } from "express";
import { MunicipioModel } from "../Models/MunicipioModel";
import { BaseController } from "./BaseController";

export abstract class MunicipioController extends BaseController {   
  private constructor() {
    super();
  }

  /**
   * Returns the public list of municipios, for Express
   *
   * @param req
   * @param res
   */
  public static async getList(req: Request, res: Response) {
    const items = await MunicipioModel.scan().exec();
    res.status(200).json(items).end();
  }

  /**
    * Returns the municipios, for express
    * 
    * @param req
    * @param res 
    */
  public static async getItem(req: Request, res: Response) {
    const item = await MunicipioModel.query("uuid").eq(req.params.id).exec();
    res.status(200).json(item).end();
  }
}