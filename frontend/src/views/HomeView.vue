<template>
  <div class="home-view">
    <img class="mx-auto h-24 w-auto m-2" src="@/assets/images/logo.jpg" alt="Logo">
    <h1>Fiscalías Disponibles</h1>

    <div class="m-3">
      <div class="table w-full">
        <div class="table-header-group">
          <div class="table-row">
            <div class="table-cell text-center">Nombre</div>
            <div class="table-cell text-center">Tipo</div>
            <div class="table-cell text-center">&nbsp;</div>
          </div>
        </div>
        <div class="table-row-group">
          <div class="table-row" v-for="fiscal in fiscales" :key="fiscal.uuid">
            <div class="table-cell text-center">
              <span class="text-blue-500 cursor-pointer" @click="router.push(`/fiscal/${fiscal.uuid}`)">{{ fiscal.nombre }}</span>
            </div>
            <div class="table-cell text-center">{{ fiscal.tipo }}</div>
            <div class="table-cell text-right">
              <ChevronDoubleRightIcon class="h-5 w-5 text-blue-500 cursor-pointer" @click="router.push(`/fiscal/${fiscal.uuid}`)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'
import { Fiscales } from '@/services/fiscales'
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'

const sessionStore = useSessionStore()
const router = useRouter()

const fiscales = ref([])

if (!sessionStore.getUuid) {
  router.push('/login')
}

async function getFiscales() {
  fiscales.value = await Fiscales.getInstance().getFiscales(sessionStore.getJwt)
}

getFiscales()
</script>
