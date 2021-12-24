import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import AppRoot from './AppRoot.vue'
import router from "./router"

import '@arco-design/web-vue/dist/arco.css'
import './assets/app.less'

const app = createApp(AppRoot)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.mount('#app')
