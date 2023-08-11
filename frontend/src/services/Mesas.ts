import type { Mesa } from '@/types/Mesa'
import { Base } from './Base'
import type { Recuento } from '@/types/Recuento'

export class Mesas extends Base {
  public static async getByCentro(uuid: string): Promise<Mesa[]> {
    const data = await Base.call('get', `/centros/${uuid}/mesas`)
    return data as Mesa[]
  }

  public static async get(uuid: string): Promise<Mesa | false> {
    const data = await Base.call('get', `/mesas/${uuid}`)
    if (data === false) {
      return false
    }
    return data as Mesa
  }

  public static async updateRecuentos(uuid: string, recuentos: Recuento[]): Promise<boolean> {
    const data = await Base.call('put', `/mesas/${uuid}/recuentos`, { partidos: recuentos })
    return data as boolean
  }
}
