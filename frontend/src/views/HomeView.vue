<template>
  <div class="home-view">
    <img class="mx-auto h-24 w-auto m-2" src="@/assets/images/logo.jpg" alt="Logo">
    <h1>Fiscalías Disponibles</h1>
  </div>
</template>

<script setup lang="ts">
// When loading, check if the user is logged in, or redirect to /login
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const router = useRouter()

if (!sessionStore.getUuid) {
  router.push('/login')
}
</script>
