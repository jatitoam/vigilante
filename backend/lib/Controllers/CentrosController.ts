import { Request, Response } from "express";
import { CentrosModel } from "../Models/CentrosModel";
import { BaseController } from "./BaseController";

export abstract class CentrosController extends BaseController {
  private constructor() {
    super();
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
