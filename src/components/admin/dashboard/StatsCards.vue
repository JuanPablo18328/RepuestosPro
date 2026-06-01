<script setup>
import {
  Package,
  AlertTriangle,
  Tags,
  Star
} from 'lucide-vue-next'

defineProps({
  stats: Object
})
</script>

<template>

  <div
    class="
      grid
      grid-cols-1 sm:grid-cols-2
      lg:grid-cols-4
      gap-3 sm:gap-4 md:gap-6
    "
  >

    <!-- REPUESTOS -->

    <div class="admin-stat-card">

      <div class="admin-stat-icon bg-blue-100">

        <Package
          class="text-blue-600"
        />

      </div>

      <div>

        <p class="admin-stat-label">
          Repuestos
        </p>

        <h3 class="admin-stat-value">
          {{ stats.totalRepuestos }}
        </h3>

      </div>

    </div>

    <!-- STOCK -->

    <div class="admin-stat-card">

      <div class="admin-stat-icon bg-orange-100">

        <AlertTriangle
          class="text-orange-600"
        />

      </div>

      <div>

        <p class="admin-stat-label">
          Stock Bajo
        </p>

        <h3 class="admin-stat-value">
          {{ stats.stockBajo }}
        </h3>

      </div>

    </div>

    <!-- MARCAS -->

    <div class="admin-stat-card">

      <div class="admin-stat-icon bg-purple-100">

        <Tags
          class="text-purple-600"
        />

      </div>

      <div>

        <p class="admin-stat-label">
          Marcas
        </p>

        <h3 class="admin-stat-value">
          {{ stats.totalMarcas }}
        </h3>

      </div>

    </div>

    <!-- DESTACADOS -->

    <div class="admin-stat-card">

      <div class="admin-stat-icon bg-green-100">

        <Star
          class="text-green-600"
        />

      </div>

      <div>

        <p class="admin-stat-label">
          Destacados
        </p>

        <h3 class="admin-stat-value">
          {{ stats.destacados }}
        </h3>

      </div>

    </div>

  </div>

</template>