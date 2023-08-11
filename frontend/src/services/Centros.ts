import type { Centro } from '@/types/Centro'
import { Base } from './Base'

export class Centros extends Base {
  public static async getByMunicipio(uuid: string): Promise<Centro[]> {
    const data = await Base.call('get', `/municipios/${uuid}/centros`)
    return data as Centro[]
  }

  public static async get(uuid: string): Promise<Centro | false> {
    const data = await Base.call('get', `/centros/${uuid}`)
    if (data === false) {
      return false
    }
    return data as Centro
  }
}
