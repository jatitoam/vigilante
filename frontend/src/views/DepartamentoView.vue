<template>
  <div class="departamento-view">
    <div v-if="municipios.length > 0">
      <h1>Municipios de {{ departamento.nombre }}</h1>

      <div class="m-3 flex justify-center">
        <RecuentosummaryComponent :collection="municipios" :partidos="partidos" child-route="municipio" item-name="Municipio" />
      </div>
    </div>
    <div v-else class="text-purple dark:text-purple-300 m-3 text-center">
      No tiene fiscalías disponibles. <br />
        Por favor solicite que le sean asignadas para poder trabajar
    </div>
  </div>
</template>

<script setup lang="ts">
    import RecuentosummaryComponent from '@/components/RecuentoSummaryComponent.vue'
    import { ref } from 'vue'
    import { useSessionStore } from '@/stores/session'
    import { useRouter } from 'vue-router'
    import { Departamentos } from '@/services/departamentos'
    import { Municipios } from '@/services/municipios'
    import { Partidos } from '@/services/partidos'
    import type { Departamento } from '@/types/Departamento'
    import type { Municipio } from '@/types/Municipio'
    import type { Partido } from '@/types/Partido'

    const props = defineProps({
        uuid: String
    })

    const departamento = ref({} as Departamento)

    const sessionStore = useSessionStore()
    const router = useRouter()

    const municipios = ref([] as Array<Municipio>)
    const partidos = ref([] as Array<Partido>)

    if (!sessionStore.getUuid) {
        router.push('/login')
    }

    async function getData() {
        if (typeof props.uuid === 'undefined') {
            return
        }
    
        const departamentoTemp = await Departamentos.get(props.uuid)

        if (departamentoTemp === false) {
            return
        }

        departamento.value = departamentoTemp
        municipios.value = await Municipios.getByDepartamento(departamento.value.uuid)
        partidos.value = await Partidos.getAll();
    }

  getData()
</script>
