<template>
  <div class="municipio-view">
    <div v-if="centros.length > 0">
      <h1>Centros de {{ municipio.nombre }}</h1>

      <div class="m-3 flex justify-center">
        <RecuentosummaryComponent :collection="centros" :partidos="partidos" child-route="centro" item-name="Centro" />
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
    import { Municipios } from '@/services/municipios'
    import { Centros } from '@/services/centros'
    import { Partidos } from '@/services/partidos'
    import type { Municipio } from '@/types/Municipio'
    import type { Centro } from '@/types/Centro'
    import type { Partido } from '@/types/Partido'

    const props = defineProps({
        uuid: String
    })

    const municipio = ref({} as Municipio)

    const sessionStore = useSessionStore()
    const router = useRouter()

    const centros = ref([] as Array<Centro>)
    const partidos = ref([] as Array<Partido>)

    if (!sessionStore.getUuid) {
        router.push('/login')
    }

    async function getData() {
        if (typeof props.uuid === 'undefined') {
            return
        }
    
        const municipioTemp = await Municipios.get(props.uuid)

        if (municipioTemp === false) {
            return
        }

        municipio.value = municipioTemp
        centros.value = await Centros.getByMunicipio(municipio.value.uuid)
        partidos.value = await Partidos.getAll();
    }

  getData()
</script>
