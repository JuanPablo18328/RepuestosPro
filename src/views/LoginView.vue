<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-6 border rounded-xl">

      <h1 class="text-2xl font-bold mb-6">
        Iniciar sesión
      </h1>

      <form
        @submit.prevent="login"
        class="space-y-4"
      >
        <input
          v-model="email"
          type="email"
          placeholder="Correo"
          class="w-full border rounded-lg p-3"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full border rounded-lg p-3"
        />

        <button
          :disabled="authStore.loading"
          class="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          {{
            authStore.loading
              ? 'Ingresando...'
              : 'Ingresar'
          }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
import {
  showSuccess,
  showError
} from '@/lib/toast'

const router = useRouter();

const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const login = async () => {

  try {
    await authStore.login(
      email.value,
      password.value
    );
  
    showSuccess("¡Bienvenido!");
  
    if (authStore.user) {
      router.push("/admin");
    }
  } catch (error) {
    showError("Correo o contraseña incorrectos");
  }
};
</script>