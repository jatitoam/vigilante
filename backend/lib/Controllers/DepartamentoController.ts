import { Request, Response } from "express";
import { DepartamentoModel } from "../Models/DepartamentoModel";
import { BaseController } from "./BaseController";

export abstract class DepartamentController extends BaseController {   
  private constructor() {
    super();
  }

  /**
   * Returns the public list of departments, for Express
   *
   * @param req
   * @param res
   */
  public static async getList(req: Request, res: Response) {
    const items = await DepartamentoModel.scan().exec();
    res.status(200).json(items).end();
  }

  /**
    * Returns the departments, for express
    * 
    * @param req
    * @param res 
    */
  public static async getItem(req: Request, res: Response) {
    const item = await DepartamentoModel.query("uuid").eq(req.params.id).exec();
    res.status(200).json(item).end();
  }
}