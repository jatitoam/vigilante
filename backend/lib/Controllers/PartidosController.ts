import { Request, Response } from "express";
import { PartidosModel } from "../Models/PartidosModel";
import { BaseController } from "./BaseController";

export abstract class PartidosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the public list of Partidos, for Express
   *
   * @param req
   * @param res
   */
  public static async getList(req: Request, res: Response) {
    const items = await PartidosModel.scan().exec();
    res.status(200).json(items).end();
  }
}
