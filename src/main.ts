import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//routes
import router from "./router/index";
//pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

const app= createApp(App)
app.use(router).use(pinia)
app.mount('#app')
