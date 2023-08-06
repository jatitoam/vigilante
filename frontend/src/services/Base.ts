import axios from 'axios'

import { useSessionStore } from '@/stores/session'

export class Base {
  public static async call(method: string, url: string, data: object = {}): Promise<any | false> {
    const headers = {
      'Content-type': 'application/json',
      Authorization: ''
    }

    const session = useSessionStore()

    if (session.getJwt !== '') {
      headers.Authorization = `Bearer ${session.getJwt}`
    }

    try {
      const response = await axios.request({
        method: method,
        url: url,
        baseURL: import.meta.env.VIG_API_URL,
        headers: headers,
        data: data
      })

      if (response.status !== 200 && response.status !== 201) {
        return false
      }

      return response.data
    } catch (error) {
      return false
    }
  }
}
