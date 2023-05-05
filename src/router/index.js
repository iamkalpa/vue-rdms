import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: import('../components/Dashboard.vue'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('../components/modules/Home.vue')
        },
        {
          name: 'exchange',
          path: 'exchange',
          component: () => import('../components/modules/Exchange.vue')
        },
        {
          name: 'exchange_edit',
          path: 'exchange_edit',
          component: () => import('../components/modules/ExchangeEdit.vue'),
          children: [
            {
              name: 'status_updates',
              path: 'status_updates/:id',
              component: () => import('../components/modules/ExchangeStatusUpdates.vue')
            }
          ] 
        },
        {
          name: 'mystock',
          path: 'mystock',
          component: () => import('../components/modules/Mystock.vue')
        },
        {
          name: 'mystock_retail',
          path: 'mystock_retail',
          component: () => import('../components/modules/MyStockRetail.vue')
        },
        {
          name: 'mystock_retail_edit',
          path: 'mystock_retail_edit',
          component: () => import('../components/modules/MyStockRetailEdit.vue'),
          children: [
            {
              name: 'status_updates',
              path: 'status_updates/:id',
              component: () => import('../components/modules/MyStockRetailStatusUpdates.vue')
            }
          ] 
        },
        {
          name: 'mystock_b2b',
          path: 'mystock_b2b',
          component: () => import('../components/modules/MyStockB2b.vue')
        }
      ]
    }
  ]
})

export default router
