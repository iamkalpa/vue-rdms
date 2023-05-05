import { createRouter, createWebHistory } from 'vue-router'
//import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/Dashboard.vue')
    },
    {
      path: '/dashboard/:module',
      name: 'module',
      component: () => import('../components/Dashboard.vue')
    },
    {
      path: '/dashboard/exchange',
      name: 'exchange',
      component: () => import('../components/modules/Exchange.vue')
    }
  ]
})

export default router
