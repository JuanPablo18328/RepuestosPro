<template>
  <div class="p-8">

    <h1 class="text-3xl font-bold mb-6">
      Dashboard
    </h1>

    <button
      @click="logout"
      class="bg-red-500 text-white px-4 py-2 rounded"
    >
      Cerrar sesión
    </button>

  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();

  router.push("/login");
};
</script>