<template>
  <section class="space-y-6">

    <header>
      <h1 class="text-3xl font-bold">
        Gestión de Repuestos
      </h1>

      <p class="text-gray-500 mt-2">
        Administra el inventario de repuestos.
      </p>
    </header>

    <RepuestoForm />

    <RepuestoTable />

  </section>
</template>

<script setup>
import { onMounted } from 'vue'

import RepuestoForm from '@/components/repuestos/RepuestoForm.vue'
import RepuestoTable from '@/components/repuestos/RepuestoTable.vue'

import { useRepuestosStore } from '@/stores/repuestos.store'

const repuestosStore = useRepuestosStore()

onMounted(() => {
  repuestosStore.fetchRepuestos()
})
</script>