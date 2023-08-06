export class login {
  static async login(axios: any, username: string, password: string) {
    const response = await axios.post('/login', { username, password })
    return response.status === 200
  }
}
