<template>
  <section class="space-y-6 sm:space-y-8 w-full max-w-full">

    <!-- HEADER -->

    <div
      class="
        flex
        flex-col sm:flex-row
        items-start
        justify-between
        gap-4 sm:gap-6
      "
    >
      <div class="w-full sm:w-auto">

        <h1
          class="
            text-2xl sm:text-3xl md:text-4xl
            font-bold
            text-slate-900
          "
        >
          Repuestos
        </h1>

        <p
          class="
            mt-2 sm:mt-3
            text-xs sm:text-sm
            text-slate-500
            max-w-xl
          "
        >
          Gestiona el catálogo completo de repuestos, stock,
          compatibilidades y disponibilidad.
        </p>

      </div>

      <button
        @click="handleCreate"
        class="
          w-full sm:w-auto
          h-10 sm:h-12
          px-4 sm:px-6

          rounded-xl sm:rounded-2xl

          bg-blue-600
          hover:bg-blue-700

          text-white
          font-medium
          text-sm sm:text-base

          shadow-lg
          shadow-blue-500/20

          transition-all
          flex-shrink-0
        "
      >
        + Nuevo Repuesto
      </button>

    </div>

    <!-- STATS -->

    <DashboardStats />

    <!-- FILTROS -->

    <RepuestoFilters />

    <!-- TABLA -->

    <RepuestoTable />

    <!-- MODAL -->

    <RepuestoModal />

  </section>
</template>

<script setup>
import { onMounted } from 'vue'

import RepuestoTable from '@/components/admin/RepuestoTable.vue'
import RepuestoModal from '@/components/admin/RepuestoModal.vue'
import DashboardStats from '@/components/admin/DashboardStats.vue'
import RepuestoFilters from '@/components/admin/RepuestoFilters.vue'

import { useUiStore } from '@/stores/ui.store'
import { useRepuestosStore } from '@/stores/repuestos.store'

const uiStore = useUiStore()
const repuestosStore = useRepuestosStore()

function handleCreate() {

  repuestosStore.clearSelectedRepuesto()

  uiStore.openRepuestoModal()

}

onMounted(() => {
  repuestosStore.fetchRepuestos()
})
</script>