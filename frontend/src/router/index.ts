import { createRouter, createWebHistory } from 'vue-router'
import Fiscales from '@/views/FiscalesView.vue'
import Login from '@/views/LoginView.vue'
import Recuento from '@/views/RecuentoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'fiscales',
      component: Fiscales
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/recuento/:tipo/:uuid',
      name: 'recuento',
      component: Recuento,
      props: true
    },
    // Default route to /
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
