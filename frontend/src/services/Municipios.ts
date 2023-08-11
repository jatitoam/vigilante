import type { Municipio } from '@/types/Municipio'
import { Base } from './Base'

export class Municipios extends Base {
  public static async getByDepartamento(uuid: string): Promise<Municipio[]> {
    const data = await Base.call('get', `/departamentos/${uuid}/municipios`)
    return data as Municipio[]
  }

  public static async get(uuid: string): Promise<Municipio | false> {
    const data = await Base.call('get', `/municipios/${uuid}`)
    if (data === false) {
      return false
    }
    return data as Municipio
  }
}
