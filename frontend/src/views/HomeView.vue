<template>
  <div class="home-view">
    <img class="mx-auto h-24 w-auto m-2" src="@/assets/images/logo.jpg" alt="Logo">

    <div v-if="fiscales.length > 0">
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
                <span class="text-blue-500 cursor-pointer" @click="router.push(`/fiscal/{fiscal.tipo}/${fiscal.uuid}`)">{{ toWordUppercase(fiscal.nombre) }}</span>
              </div>
              <div class="table-cell text-center">{{ toWordUppercase(fiscal.tipo) }}</div>
              <div class="table-cell text-right">
                <ChevronDoubleRightIcon class="h-5 w-5 text-blue-500 cursor-pointer" @click="router.push(`/fiscal/${fiscal.tipo}/${fiscal.uuid}`)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-purple m-3 text-center">
      No tiene fiscalías disponibles. <br />
        Por favor solicite que le sean asignadas para poder trabajar
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
import { Fiscales } from '@/services/fiscales'
import type { Fiscal } from '@/types/fiscal'

const sessionStore = useSessionStore()
const router = useRouter()

const fiscales = ref([] as Array<Fiscal>)

if (!sessionStore.getUuid) {
  router.push('/login')
}

async function getFiscales() {
  const fiscalesTemp : Array<Fiscal> | false = await Fiscales.getFiscales()

  if (fiscalesTemp === false) {
    sessionStore.logout()
    router.push('/login')
  }

  fiscales.value = fiscalesTemp as Array<Fiscal>
}

function toWordUppercase(text: string) {
  return text.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

getFiscales()
</script>
