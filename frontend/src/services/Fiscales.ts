import type { Fiscal } from '@/types/Fiscal'
import { Base } from './Base'

export class Fiscales extends Base {
  public static async getFiscales(): Promise<Array<Fiscal> | false> {
    return await Base.call('get', '/fiscales')
  }
}
