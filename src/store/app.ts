// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuarioLogueado: false,
    usuarioActual: null,
  }),
  actions: {
    login(usuario: any) {
      this.usuarioLogueado = true
      this.usuarioActual = usuario
    },
    logout() {
      this.usuarioLogueado = false;
      this.usuarioActual = null;
    }
  },
  getters: {
    isLogged(): boolean{
      return this.usuarioLogueado
    },
  },
  
  persist: true,
})
