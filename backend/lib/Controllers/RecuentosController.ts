import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { CentrosModel } from "../Models/CentrosModel";
import { MesasModel } from "../Models/MesasModel";
import { PartidosModel } from "../Models/PartidosModel";

export abstract class RecuentosController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns the Mesas, for express
   *
   * @param req
   * @param res
   */
  public static async updateRecuento(req: Request, res: Response) {
    const partidos = req.body.partidos || [];
    const tipo = req.body.tipo || "";
    const uuid = req.body.uuid || "";

    // Check if the request is valid
    if (
      tipo.length === 0 ||
      uuid.length === 0 ||
      typeof partidos !== "object" ||
      partidos.length === 0
    ) {
      return res.status(406).json().end();
    }

    // Choose the right model depending on the tipo sent
    const model =
      tipo === "departamento"
        ? DepartamentosModel
        : tipo === "municipio"
        ? MunicipiosModel
        : tipo === "centro"
        ? CentrosModel
        : tipo === "mesa"
        ? MesasModel
        : null;

    // Check if the model is valid
    if (!model) {
      return res.status(406).json().end();
    }

    // Check if the uuid is valid by querying the model
    const item = await model.get(uuid);

    if (!item) {
      return res.status(404).json().end();
    }

    // Checks that all the items inside partidos contains "votos" and "partido_uuid" fields, or else return 406
    for (const partido of partidos) {
      if (!partido.votos || !partido.partido_uuid) {
        return res.status(406).json().end();
      }
    }

    // Gets all the partidos from the database
    const allPartidos = await PartidosModel.scan().exec();

    // Checks that all the partidos inside partidos are valid, or else return 406
    if (
      partidos
        .map((partido: any) => partido.partido_uuid)
        .some(
          (uuid: string) =>
            !allPartidos.map((partido) => partido.uuid).includes(uuid)
        )
    ) {
      return res.status(406).json().end();
    }

    // Checks that all partidos in the allPartidos array are present in the partidos array, or else return 406
    if (
      allPartidos
        .map((partido) => partido.uuid)
        .some(
          (uuid) =>
            !partidos.map((partido: any) => partido.partido_uuid).includes(uuid)
        )
    ) {
      return res.status(406).json().end();
    }

    // Updates the recuento in the given model, by first updating all the data inside "item"
    item.recuentos = partidos;
    await item.save();

    // Returns 201 to complete the request
    return res.status(201).json().end();
  }
}
