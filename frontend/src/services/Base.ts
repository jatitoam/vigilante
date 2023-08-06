import axios, { type AxiosInstance } from 'axios'

export class Base {
  protected client: AxiosInstance
  protected static instance: Base

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VIG_API_URL,
      headers: {
        'Content-type': 'application/json'
      }
    })
  }
}
