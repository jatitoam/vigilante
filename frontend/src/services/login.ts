import type { Usuario } from '@/types/Usuario'
import { Base } from './Base'

export class Login extends Base {
  public static async login(username: string, password: string): Promise<Usuario | false> {
    const data = await Base.call('post', '/login', { username, password })
    return this.parseJwt(data.token)
  }

  protected static parseJwt(jwt: string): Usuario | false {
    try {
      const decoded = JSON.parse(atob(jwt.split('.')[1]))
      return {
        uuid: decoded.uuid,
        usuario: decoded.usuario,
        nombre: decoded.nombres,
        apellido: decoded.apellidos,
        jwt: jwt
      }
    } catch {
      return false
    }
  }
}
