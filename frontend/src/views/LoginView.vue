<template>
  <div class="login-view">
    <img class="mx-auto h-24 w-auto m-2" src="@/assets/images/logo.jpg"  alt="Logo">
    <h1 class="text-center">Iniciar sesión</h1>
    <form class="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700 px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-gray-500 text-sm font-bold mb-2" for="username">
          Usuario
        </label>
        <input class="shadow dark:shadow-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700" id="username" type="text" placeholder="Usuario" v-model="username" v-on:keyup.enter="login">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 dark:text-gray-500 text-sm font-bold mb-2" for="password">
          Contraseña
        </label>
        <input class="shadow dark:shadow-gray-700 appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700" id="password" type="password" placeholder="******************" v-model="password" v-on:keyup.enter="login">
        <p class="text-purple dark:text-purple-300 text-left text-xs" v-if="displayAlert">Por favor ingrese su usuario y contraseña</p>
      </div>
      <div class="flex items-center justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="login" >
          Iniciar sesión
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSessionStore } from '@/stores/session'
import { login } from '@/services/login'

export default defineComponent({
  setup() {
    const sessionStore = useSessionStore()
    return {
      userUuid: sessionStore.getUuid,
    }
  },
  methods: {
    async login() {
      if (this.username === '' || this.password === '') {
        this.displayAlert = true;
        return
      }
      login.login(this.axios, this.username, this.password)
    }
  },
  data() {
    return {
      username: '',
      password: '',
      displayAlert: false
    }
  },
})
</script>
