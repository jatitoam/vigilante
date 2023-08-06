import type { Mesa } from '@/types/Mesa'
import { Base } from './Base'

export class Mesas extends Base {
  public static async get(uuid: string): Promise<Mesa | false> {
    const data = await Base.call('get', `/mesas/${uuid}`)
    if (data === false) {
      return false
    }
    return data as Mesa
  }
}
