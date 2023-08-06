<template>
    <div class="recuento-view">
        <h1>
            Fiscalización de {{ props.tipo }} <br />
            {{ props.uuid }}
        </h1>

        <h3>Recuento de Votos</h3>
        <div class="grid grid-cols-1 lg:grid-cols-3 grid-flow-col">
            <form class="lg:col-start-2 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700 px-8 pt-6 pb-8 mb-4">
                <div class="mb-4" v-for="(partido, index) in partidos" :key="partido.uuid">
                    <label class="block text-gray-700 dark:text-gray-500 text-sm font-bold mb-2" :for="generatePartidoId(partido.uuid)">
                        {{ partido.nombre }}
                    </label>
                    <input class="shadow dark:shadow-gray-700 appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700" :id="generatePartidoId(partido.uuid)" type="text" placeholder="0" v-on:keyup.enter="save" v-model="recuentos[index]">
                </div>
                <div class="flex items-center justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="save" >
                    Registrar
                </button>
                </div>
                <p class="text-center mt-5 text-purple dark:text-purple-300 text-left text-xs" v-if="displayAlert">{{ alert }}</p>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useSessionStore } from '@/stores/session'
    import { useRouter } from 'vue-router'

    import type { Partido } from '@/types/Partido'
    import { Partidos } from '@/services/Partidos'
    import { Recuentos } from '@/services/Recuentos'

    const sessionStore = useSessionStore()
    const router = useRouter()

    const props = defineProps({
        tipo: String,
        uuid: String
    })

    if (!sessionStore.getUuid) {
    router.push('/login')
    }

    if (props.tipo === '' || props.uuid === '') {
        router.push('/')
    }

    const partidos = ref([] as Array<Partido>)
    const recuentos = ref([] as Array<string>)
    const displayAlert = ref(false)
    const alert = ref('')

    async function loadData() {
        const partidosTemp: Array<Partido> | false = await Partidos.getPartidos()

        if (partidosTemp === false) {
            sessionStore.logout()
            router.push('/login')
        }

        partidos.value = partidosTemp as Array<Partido>
    }

    async function save() {
        const recuentosTemp = partidos.value.map((partido, index) => {
            return {
                partido_uuid: partido.uuid,
                votos: parseInt(recuentos.value[index])
            }
        })

        const result = await Recuentos.saveRecuentos(props.tipo, props.uuid, recuentosTemp)

        if (result === false) {
            alert.value = 'Hubo un error al guardar los datos. Por favor intente nuevamente.'
        } else {
            alert.value = 'Los datos fueron guardados correctamente.'
        }
        displayAlert.value = true
    }

    function generatePartidoId(partidoUuid : string) {
        return `partido-${partidoUuid}`
    }

    loadData()
</script>
