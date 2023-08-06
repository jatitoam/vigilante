import type { Usuario } from '@/types/Usuario'
import { Base } from './Base'

export class Login extends Base {
  protected static instance: Login

  async login(username: string, password: string): Promise<Usuario | false> {
    try {
      const response = await this.client.post('/login', { username, password })
      if (response.status !== 200) {
        return false
      }
      if (typeof response.data.token === 'undefined') {
        return false
      }
      return this.parseJwt(response.data.token)
    } catch {
      return false
    }
  }

  parseJwt(jwt: string): Usuario | false {
    try {
      const decoded = JSON.parse(atob(jwt.split('.')[1]))
      return {
        uuid: decoded.uuid,
        usuario: decoded.usuario,
        nombre: decoded.nombres + ' ' + decoded.apellidos,
        jwt: jwt
      }
    } catch {
      return false
    }
  }

  // Singleton pattern
  static getInstance(): Login {
    if (!Login.instance) {
      Login.instance = new Login()
    }
    return Login.instance
  }
}
