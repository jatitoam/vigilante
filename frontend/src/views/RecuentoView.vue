<template>
    <div class="recuento-view">
        <h1>
            Fiscalización de {{ props.tipo }} <br />
            {{ props.uuid }}
        </h1>
    </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

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

</script>