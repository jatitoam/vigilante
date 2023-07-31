<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        <div class="mx-50% flex max-w-xs flex-col">
          <dt class="text-base leading-7 text-gray-600">Selecciona tu departamento</dt>
          <dd class="order-first text-1xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Departamento</dd>
           <DropDownDepartment></DropDownDepartment>
        </div>
        <div class="mx-50% flex max-w-xs flex-col">
          <dt class="text-base leading-7 text-gray-600">Selecciona tu Municiopio</dt>
          <dd class="order-first text-1xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Municiopio</dd>
           <DropDownMunicipality></DropDownMunicipality>
        </div>
        <div class="mx-50% flex max-w-xs flex-col">
          <dt class="text-base leading-7 text-gray-600">Selecciona tu Centro de votación</dt>
          <dd class="order-first text-1xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Centro de votación</dd>
           <DropDownVotingCenter></DropDownVotingCenter>
        </div>
      </dl>
    </div>
    <button
     class="mx-auto flex max-w-xs flex-col mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
     type="button"
     @click="otherFunction"
     >

      Mi Botón
    </button>

  </div>
</template>

<script>
import DropDownDepartment from "./DropDownDepartment.vue"
import DropDownMunicipality from "./DropDownMunicipality.vue"
import DropDownVotingCenter from "./DropDownVotingCenter.vue"

export default {
  name: "DropDowns",
  components: {
    DropDownDepartment,
    DropDownMunicipality,
    DropDownVotingCenter
  },
  methods: {
    otherFunction() {
        this.$router.push('/')
    }
  }
}

</script>