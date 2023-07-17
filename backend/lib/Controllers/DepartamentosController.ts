import { Request, Response } from "express";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { BaseController } from "./BaseController";

export abstract class DepartamentosController extends BaseController {   
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
    const items = await DepartamentosModel.scan().exec();
    res.status(200).json(items).end();
  }

  /**
    * Returns the departments, for express
    * 
    * @param req
    * @param res 
    */
  public static async getItem(req: Request, res: Response) {
    const item = await DepartamentosModel.query("uuid").eq(req.params.id).exec();
    res.status(200).json(item).end();
  }
}