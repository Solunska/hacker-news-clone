import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log("Service Worker registration successful: ", registration)
            }, (err) => {
                console.log("Registration failed: ", err)
            })
    })
}
app.use(pinia);
app.use(router);

app.mount('#app')
