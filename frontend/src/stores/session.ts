import { defineStore } from 'pinia'
import type { Usuario } from '@/types/usuario'

// Define a new session store for the current user
export const useSessionStore = defineStore('session', {
  // a function that returns a fresh state
  state: () => ({
    // Defines usuario variable as an instance of Usuario
    usuario: null as Usuario | null
  }),
  // optional getters
  getters: {
    getUuid: (state) => state.usuario?.uuid,
    getNombre: (state) => state.usuario?.nombre,
    getJwt: (state) => state.usuario?.jwt
  },
  // setters
  actions: {
    setUsuario(usuario: Usuario) {
      this.usuario = usuario
    }
  }
})
