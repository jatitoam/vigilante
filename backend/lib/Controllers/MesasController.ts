import { Request, Response } from "express";
import { MesasModel } from "../Models/MesasModel";
import { BaseController } from "./BaseController";
import { CentrosModel } from "../Models/CentrosModel";
import { PartidosModel } from "../Models/PartidosModel";
import { MunicipiosModel } from "../Models/MunicipiosModel";
import { DepartamentosModel } from "../Models/DepartamentosModel";
import { RecuentoPartido } from "../Types/RecuentoPartido";
import { AnyItem } from "dynamoose/dist/Item";

export abstract class MesasController extends BaseController {
  private constructor() {
    super();
  }

  /**
   * Returns one Mesa, for express
   *
   * @param req
   * @param res
   */
  public static async getItem(req: Request, res: Response) {
    const item = await MesasModel.get(req.params.id, {
      attributes: ["uuid", "número", "recuentos"],
    });
    if (!item) return res.status(404).end();
    res.status(200).json(item).end();
  }

  /**
   * Updates recuento for a mesa
   *
   * @param req
   * @param res
   */
  public static async updateRecuento(req: Request, res: Response) {
    const uuid = req.params.id;
    const partidos = req.body.partidos || [];

    // Check if the request is valid
    if (typeof partidos !== "object" || partidos.length === 0) {
      return res.status(406).json().end();
    }

    // Check if the uuid is valid by querying the model
    const item = await MesasModel.get(uuid);

    if (!item) {
      return res.status(404).json().end();
    }

    // Checks that all the items inside partidos contains "votos" and "partido_uuid" fields, or else return 406
    for (const partido of partidos) {
      if (partido.votos === null || !partido.partido_uuid) {
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

    // Updates the recuento
    await MesasModel.update({ uuid }, { recuentos: partidos });

    // Updates the parents
    const centro = await CentrosModel.get(item.centro_uuid);
    const municipio = await MunicipiosModel.get(centro.municipio_uuid);
    const departamento = await DepartamentosModel.get(
      municipio.departamento_uuid
    );

    const centroRecuento: Array<RecuentoPartido> =
      MesasController.updateRecuentoParent(centro, partidos, item);
    const municipioRecuento: Array<RecuentoPartido> =
      MesasController.updateRecuentoParent(municipio, partidos, item);
    const departamentoRecuento: Array<RecuentoPartido> =
      MesasController.updateRecuentoParent(departamento, partidos, item);

    await CentrosModel.update(
      { uuid: item.centro_uuid },
      { recuentos: centroRecuento }
    );
    await MunicipiosModel.update(
      { uuid: centro.municipio_uuid },
      { recuentos: municipioRecuento }
    );
    await DepartamentosModel.update(
      { uuid: municipio.departamento_uuid },
      { recuentos: departamentoRecuento }
    );

    res.status(201).json().end();
  }

  /**
   * Updates recuento for a parent structure
   * @param parent
   * @param partidos
   * @param item
   *
   * @returns {Promise<Array<RecuentoPartido>>}
   */
  public static updateRecuentoParent(
    parent: AnyItem,
    partidos: Array<RecuentoPartido>,
    item: AnyItem
  ): Array<RecuentoPartido> {
    return partidos.reduce(
      (acc: Array<RecuentoPartido>, partido: RecuentoPartido) => {
        // Find the partido in the recuento
        const partidoRecuento = parent.recuentos.find(
          (recuento: RecuentoPartido) =>
            recuento.partido_uuid === partido.partido_uuid
        );
        // Find the old value of the votos in the mesa
        const oldVotos =
          item.recuentos.find(
            (recuento: RecuentoPartido) =>
              recuento.partido_uuid === partido.partido_uuid
          )?.votos || 0;

        // If the partido is not present in the recuento, add it
        if (typeof partidoRecuento === "undefined") {
          acc.push({
            partido_uuid: partido.partido_uuid,
            votos: partido.votos,
          });
          return acc;
        }
        // If the partido is present in the recuento, update it
        acc.push({
          partido_uuid: partido.partido_uuid,
          votos: partidoRecuento.votos + partido.votos - oldVotos,
        });
        return acc;
      },
      [] as Array<RecuentoPartido>
    );
  }
}
