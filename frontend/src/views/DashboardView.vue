<template>
  <div class="dashboard-view">
    <div v-if="departamentos.length > 0">
      <h1>Departamentos</h1>

      <div class="flex justify-center">
        <RecuentoSummaryComponent :collection="departamentos" :partidos="partidos" child-route="departamento" item-name="Departamento" />
      </div>
    </div>
    <div v-else class="text-purple m-3 text-center">
      No tiene fiscalías disponibles. <br />
        Por favor solicite que le sean asignadas para poder trabajar
    </div>
  </div>
</template>

<script setup lang="ts">
  import RecuentoSummaryComponent from '@/components/RecuentoSummaryComponent.vue'
  import { ref } from 'vue'
  import { useSessionStore } from '@/stores/session'
  import { useRouter } from 'vue-router'
  import { Departamentos } from '@/services/departamentos'
  import { Partidos } from '@/services/partidos'
  import type { Departamento } from '@/types/Departamento'
  import type { Partido } from '@/types/Partido'

  const sessionStore = useSessionStore()
  const router = useRouter()

  const departamentos = ref([] as Array<Departamento>)
  const partidos = ref([] as Array<Partido>)

  if (!sessionStore.getUuid) {
    router.push('/login')
  }

  async function getData() {
    departamentos.value = await Departamentos.getAll()
    partidos.value = await Partidos.getAll()
  }

  getData()
</script>
