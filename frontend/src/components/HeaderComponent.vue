<template>
    <div>
        <header class="bg-blue h-10 text-white justify-center flex">
            <div class="title flex-grow mx-2 center-vertical heading-style text-white text-left">
                <RouterLink to="/">
                    {{ title }}
                </RouterLink>
            </div>
            <div class="user mx-5 center-vertical relative" v-if="usuario !== ''">
                <div>
                    <UserIcon class="inline h-5 w-5 mx-2 text-white center-vertical" aria-hidden="true" />
                    <span class="text-sm center-vertical inline">
                        {{ usuario }}
                    </span>
                    <ArrowRightOnRectangleIcon class="inline h-5 w-5 mx-2 text-white center-vertical cursor-pointer" @click="logout" aria-hidden="true" />
                </div>
            </div>
        </header>
    </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()

const title = import.meta.env.VIG_APP_TITLE;
const usuario = ref(sessionStore.getNombre || "")

const router = useRouter()

watch(router.currentRoute, () => {
    usuario.value = sessionStore.getNombre || ""
})

// Action to perform logout
const logout = () => {
    sessionStore.logout()
    usuario.value = sessionStore.getNombre || ""
    router.push('/login')
}

</script>
