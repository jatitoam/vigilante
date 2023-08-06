import type { Departamento } from '@/types/Departamento'
import { Base } from './Base'

export class Departamentos extends Base {
  public static async get(uuid: string): Promise<Departamento | false> {
    const data = await Base.call('get', `/departamentos/${uuid}`)
    if (data === false) {
      return false
    }
    return data as Departamento
  }
}
