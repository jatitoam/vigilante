<template>
  <div class="flex flex-col h-screen dark:bg-gray-900">
    <HeaderComponent />
    <main class="container mx-auto flex-grow">
      <RouterView />
    </main>
    <footer class="h-10 bg-purple text-white text-center flex flex-col justify-center text-sm heading-font">
      <p>
        Powered by <a href="https://github.com/jatitoam/vigilante" target="_blank">Vigilante</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>
