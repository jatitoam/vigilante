<script setup lang="ts">
import LoginForm from '@/modules/Auth/LoginForm.vue';
</script>
<template>
    <div>
        <LoginForm></LoginForm>
        holassss
    </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex',
  components: {
    LoginForm
  },
  data() {
    return {}
  },
  onMounted() {
    // this.$store.dispatch('auth/checkAuth')
    console.log("hola")
  },
  methods: {},
}
</script>
<style></style>