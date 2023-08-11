import type { Partido } from '@/types/Partido'
import { Base } from './Base'

export class Partidos extends Base {
  public static async getAll(): Promise<Array<Partido>> {
    return await Base.call('get', '/partidos')
  }
}
