<template>
    <div class="summary-component text-sm sm:text-md">
        <div class="table w-full">
          <div class="table-header-group">
            <div class="table-row">
              <div class="table-cell">{{ itemName }}</div>
              <div class="table-cell text-center w-64" v-for="partido in partidos" :key="partido.uuid">
                {{ partido.nombre }}
              </div>
              <div class="table-cell text-center" v-if="childRoute">&nbsp;</div>
            </div>
          </div>
          <div class="table-row-group">
            <div class="table-row even:bg-green-100" v-for="item in collection" :key="item.uuid">
              <div class="table-cell">
                <span class="cursor-pointer" @click="router.push(`/${childRoute}/${item.uuid}`)">{{ toWordUppercase(item[itemTitle]) }}</span>
              </div>
              <div class="table-cell text-center align-middle" v-for="partido in partidos" :key="partido.uuid">
                <span v-if="childRoute">
                  {{ getVotos(item.uuid, partido.uuid) }}
                </span>
                <div v-else>
                  <input type="text" class="form-input rounded w-20 border-2 border-blue text-center" :value="votos.get(item.uuid)?.get(partido.uuid)" @input="updateValue($event.target.value, item.uuid, partido.uuid)" />
                </div> 
              </div>
              <div class="table-cell text-right align-middle" v-if="childRoute">
                <ChevronDoubleRightIcon class="h-5 w-5 text-blue-500 cursor-pointer" @click="router.push(`/${childRoute}/${item.uuid}`)" />
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onUpdated } from 'vue'
    import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
    import { useRouter } from 'vue-router'
    import type { Partido } from '@/types/Partido'
    import type { Recuento } from '@/types/Recuento';
    import { Mesas } from '@/services/Mesas'

    const router = useRouter()

    const props = defineProps({
        collection: Array<any>,
        partidos: Array<Partido>,
        childRoute: String,
        itemTitle: {
          type: String,
          default: 'nombre'
        },
        itemName: String
    })

    const votos = reactive(new Map<string, Map<string, Number>>)

    onUpdated(() => {
        props.collection?.forEach((item: any) => {
          votos.set(item.uuid, new Map<string, Number>)
            props.partidos?.forEach((partido: Partido) => {
              const voto = item.recuentos.find((voto: Recuento) => voto.partido_uuid === partido.uuid)

              votos.get(item.uuid)?.set(partido.uuid, typeof voto === "undefined" ? 0 : voto.votos)
          })
        })
    })

    function updateValue(value: string, item_uuid: string, partido_uuid: string) {
      votos.get(item_uuid)?.set(partido_uuid, isNaN(Number(value)) ? 0 : Number(value))
      updateLiveValue(item_uuid)
    }

    function updateLiveValue(item_uuid: string) {
        const recuentos = props.partidos?.reduce((acc: any, partido: Partido) => {
          acc.push({
            partido_uuid: partido.uuid,
            votos: votos.get(item_uuid)?.get(partido.uuid)
          })

          return acc
        }, [])
        Mesas.updateRecuentos(item_uuid, recuentos)
    }

    function toWordUppercase(text: string) {
        return text.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    }

    function getVotos(item_uuid: string, partido_uuid: string) {
        const entity = typeof props.collection === "undefined" ? null : props.collection.find((item : any) => item.uuid === item_uuid)
        const partido = typeof props.partidos === "undefined" ? null : props.partidos.find((partido: any) => partido.uuid === partido_uuid)


        if (entity && partido) {
          const votos = entity.recuentos.find((voto: any) => voto.partido_uuid === partido.uuid)

            if (votos) {
                return votos.votos
            }
        }

      return 0
    }

</script>