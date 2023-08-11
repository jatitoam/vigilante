<template>
    <div>
        <header class="bg-blue h-10 text-white justify-center flex">
            <div class="title flex-grow mx-2 center-vertical heading-style text-white text-left">
                <RouterLink to="/" class="flex">
                    <img class="flex-shrink cursor-pointer h-8 m-2 center-vertical" src="@/assets/images/logo.jpg" alt="Logo">
                    <div class="center-vertical text-sm">
                        {{ title }}
                    </div>
                </RouterLink>
            </div>
            <div class="user mx-5 center-vertical relative" v-if="usuario !== ''">
                <div class="text-xs flex">
                    <UserIcon class="inline h-5 w-5 mx-2 text-white center-vertical" aria-hidden="true" />
                    <div class="center-vertical">
                        {{ usuario }}
                    </div>
                    <ArrowRightOnRectangleIcon class=" inline h-5 w-5 mx-2 text-white center-vertical cursor-pointer" @click="logout" aria-hidden="true" />
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
