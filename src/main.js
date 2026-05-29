import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useAuthStore } from "@/stores/auth.store";
import { initAuthListener } from "@/composables/useAuthListener";

import "./style.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();

await authStore.getSession();

initAuthListener();

app.mount("#app");