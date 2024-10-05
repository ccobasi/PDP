
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Emitter from 'tiny-emitter'
import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import 'bootstrap/dist/js/bootstrap.bundle';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.config.globalProperties.$emitter = new Emitter();

app.mount('#app')

