<template>
  <div class="login-view">
    <img class="mx-auto h-24 w-auto m-2" src="@/assets/images/logo.jpg" alt="Logo">
    <h1>Iniciar sesión</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 grid-flow-col">
      <form class="lg:col-start-2 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700 px-8 pt-6 pb-8 mb-4">
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
          <p class="text-purple dark:text-purple-300 text-left text-xs" v-if="displayAlert">{{ alert }}</p>
        </div>
        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="login" >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import type { Usuario } from '@/types/Usuario'
import { Login } from '@/services/Login'

// Data variables
const username = ref('')
const password = ref('')
const displayAlert = ref(false)
const originalAlert = ref('Por favor ingrese su usuario y contraseña')
const alert = ref(originalAlert)
const sessionStore = useSessionStore()
const router = useRouter()

if (typeof sessionStore.getUuid !== 'undefined') {
  router.push({ name: 'fiscales' })
}

// Methods
async function login() {
  if (typeof sessionStore.getUuid !== 'undefined') {
    return
  }

  if (username.value === '' || password.value === '') {
    displayAlert.value = true
    alert.value = originalAlert.value
    return
  }

  const login: Usuario | false = await Login.login(username.value, password.value)
  if (login === false) {
    alert.value = 'Usuario o contraseña incorrectos'
    displayAlert.value = true
    return
  }

  displayAlert.value = false
  sessionStore.login(login)

  router.push({ name: 'fiscales' })
}
</script>
