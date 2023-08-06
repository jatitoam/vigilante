import type { Recuento } from '@/types/Recuento'
import { Base } from './Base'

export class Recuentos extends Base {
  public static async saveRecuentos(
    tipo: string,
    uuid: string,
    recuentos: Array<Recuento>
  ): Promise<boolean> {
    const data = {
      tipo: tipo,
      uuid: uuid,
      partidos: recuentos
    }

    if ((await Base.call('put', `/recuentos`, data)) === false) {
      return false
    }

    return true
  }
}
