import type { Partido } from '@/types/Partido'
import { Base } from './Base'

export class Partidos extends Base {
  public static async getPartidos(): Promise<Array<Partido> | false> {
    return await Base.call('get', '/partidos')
  }
}
