import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useAuthStore } from "@/stores/auth.store";
import { initAuthListener } from "@/composables/useAuthListener";
import { MotionPlugin } from '@vueuse/motion'

import "./style.css";
import './assets/css/main.css'
import './assets/css/admin.css'

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(MotionPlugin)

const authStore = useAuthStore();

await authStore.getSession();

initAuthListener();

app.mount("#app");