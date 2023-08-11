import { defineStore } from 'pinia'
import type { Usuario } from '@/types/Usuario'

export const useSessionStore = defineStore('session', {
  state: () => ({
    usuario: null as Usuario | null
  }),
  getters: {
    getUuid: (state) => state.usuario?.uuid,
    getNombre: (state) => state.usuario?.nombre,
    getApellido: (state) => state.usuario?.apellido,
    getNombreCompleto: (state) =>
      typeof state.usuario?.nombre === 'undefined' || typeof state.usuario?.apellido === 'undefined'
        ? ''
        : `${state.usuario?.nombre} ${state.usuario?.apellido}`,
    getJwt: (state) => state.usuario?.jwt,
    getUsuario: (state) => state.usuario?.usuario
  },
  actions: {
    login(usuario: Usuario) {
      this.usuario = usuario
    },
    logout() {
      this.usuario = null
    }
  },
  persist: true
})
