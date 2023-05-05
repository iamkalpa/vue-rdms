import { createApp } from 'vue'
import App1 from './App1.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"



import './assets/login.css'
import './assets/main1.css'
import './assets/styles.css'

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
routes: [
    {
    path: '/',
    name: 'login',
    component: LoginView
    }
]
})

const app1 = createApp(App1)

app1.use(router)

app1.mount('#app1')
