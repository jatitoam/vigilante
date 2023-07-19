<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col h-full min-h-screen">
    <div class="container mx-auto flex-grow-0">
      <RouterView />
    </div>
  </div>
</template>
