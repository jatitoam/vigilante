import { Request, Response } from "express";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { BaseController } from "./BaseController";

export abstract class MunicipiosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the public list of Municipios, for Express
   *
   * @param req
   * @param res
   */
  public static async getList(req: Request, res: Response) {
    const items = await MunicipiosModel.scan().exec();
    res.status(200).json(items).end();
  }

  /**
   * Returns the Municipios, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await MunicipiosModel.query("uuid").eq(req.params.id).exec();
    res.status(200).json(item).end();
  }
}
