import { Request, Response } from "express";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { BaseController } from "./BaseController";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { CentrosModel } from "../Models/CentrosModel";
import { MesasModel } from "../Models/MesasModel";

export abstract class DepartamentosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the department, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await DepartamentosModel.get(req.params.id, {
      attributes: ["uuid", "nombre", "código", "recuentos"],
    });
    if (!item) return res.status(404).end();
    res.status(200).json(item).end();
  }

  public static async resetRecuentos(req: Request, res: Response) {
    const item = await DepartamentosModel.get(req.params.id);
    if (!item) return res.status(404).end();
    item.recuentos = [];
    await item.save();

    // Gets all the municipios inside and updates them
    const municipios = await MunicipiosModel.scan("departamento_uuid")
      .eq(req.params.id)
      .exec();
    for (const municipio of municipios) {
      municipio.recuentos = [];
      await municipio.save();

      // Gets all the centros inside and updates them
      const centros = await CentrosModel.scan("municipio_uuid")
        .eq(municipio.uuid)
        .exec();
      for (const centro of centros) {
        centro.recuentos = [];
        await centro.save();

        // Gets all the mesas inside and updates them
        const mesas = await MesasModel.scan("centro_uuid")
          .eq(centro.uuid)
          .exec();
        for (const mesa of mesas) {
          mesa.recuentos = [];
          await mesa.save();
        }
      }
    }

    res.status(201).json().end();
  }
}
