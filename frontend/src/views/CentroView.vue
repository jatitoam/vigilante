<template>
  <div class="centro-view">
    <div v-if="mesas.length > 0">
      <h1>Mesas de {{ centro.nombre }}</h1>

      <div class="m-3 flex justify-center">
        <RecuentoSummaryComponent :collection="mesas" :partidos="partidos" child-route="" item-title="número" item-name="Mesa" />
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
    import { Centros } from '@/services/centros'
    import { Mesas } from '@/services/mesas'
    import { Partidos } from '@/services/partidos'
    import type { Centro } from '@/types/Centro'
    import type { Mesa } from '@/types/Mesa'
    import type { Partido } from '@/types/Partido'

    const props = defineProps({
        uuid: String
    })

    const centro = ref({} as Centro)

    const sessionStore = useSessionStore()
    const router = useRouter()

    const mesas = ref([] as Array<Mesa>)
    const partidos = ref([] as Array<Partido>)

    if (!sessionStore.getUuid) {
        router.push('/login')
    }

    async function getData() {
        if (typeof props.uuid === 'undefined') {
            return
        }
    
        const centrosTemp = await Centros.get(props.uuid)

        if (centrosTemp === false) {
            return
        }

        centro.value = centrosTemp
        mesas.value = await Mesas.getByCentro(centro.value.uuid)
        partidos.value = await Partidos.getAll();
    }

  getData()
</script>
