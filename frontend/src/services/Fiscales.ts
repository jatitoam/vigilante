import type { Fiscal } from '@/types/Fiscal'
import { Base } from './Base'

export class Fiscales extends Base {
  async getFiscales(jwt: string): Promise<Array<Fiscal>> {
    try {
      // Send using the JWT as a bearer token
      const response = await this.client.get('/fiscales', {
        headers: {
          Authorization: 'Bearer ' + jwt
        }
      })
      if (response.status !== 200) {
        return []
      }
      return response.data
    } catch {
      return []
    }
  }

  // Singleton pattern
  static getInstance(): Fiscales {
    if (!Fiscales.instance) {
      Base.instance = new Fiscales()
    }
    return Base.instance as Fiscales
  }
}
