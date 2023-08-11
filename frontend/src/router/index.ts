import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/DashboardView.vue'
import Departamento from '@/views/DepartamentoView.vue'
import Municipio from '@/views/MunicipioView.vue'
import Centro from '@/views/CentroView.vue'
import Login from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/departamento/:uuid',
      name: 'departamento',
      component: Departamento,
      props: true
    },
    {
      path: '/municipio/:uuid',
      name: 'municipio',
      component: Municipio,
      props: true
    },
    {
      path: '/centro/:uuid',
      name: 'centro',
      component: Centro,
      props: true
    },
    // Default route to /
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
