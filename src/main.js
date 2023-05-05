import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

import './assets/main1.css'
import './assets/main_vue.css'
import './assets/styles.css'
import './assets/icons.css'
import './assets/fonts/font.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
