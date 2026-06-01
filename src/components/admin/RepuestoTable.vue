<template>

  <div
    class="
      bg-white
      rounded-2xl sm:rounded-3xl
      border border-slate-200
      shadow-sm
      w-full
      max-w-full
      overflow-hidden
    "
  >

    <!-- HEADER -->
    <div
      class="
        px-3 sm:px-6
        py-4 sm:py-5
        border-b border-slate-200
        flex items-center justify-between
      "
    >

      <div>

        <h3 class="text-base sm:text-lg font-semibold">
          Inventario
        </h3>

        <p class="text-xs sm:text-sm text-slate-500">
          Todos los repuestos registrados
        </p>

      </div>

    </div>

    <!-- LOADING -->
    <div
      v-if="store.loading"
      class="p-6 sm:p-10 text-center text-sm sm:text-base"
    >
      Cargando repuestos...
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!store.filteredRepuestos.length"
      class="p-6 sm:p-10 text-center text-sm sm:text-base text-slate-500"
    >
      No existen repuestos registrados.
    </div>

    <!-- TABLE DESKTOP -->
    <div
      v-else
      class="hidden md:block w-full overflow-x-auto"
    >

      <table class="w-full">

        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">

            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Producto</th>
            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Marca</th>
            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Categoría</th>
            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Precio</th>
            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Stock</th>
            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Tipo</th>
            <th class="text-left p-3 sm:p-5 text-xs sm:text-sm font-semibold">Acciones</th>

          </tr>
        </thead>

        <tbody>

          <tr
            v-for="item in paginatedRepuestos"
            :key="item.id"
            class="border-b border-slate-100 hover:bg-slate-50 transition"
          >

            <td class="p-3 sm:p-5">

              <div class="flex items-center gap-3">

                <img
                  v-if="item.imagen_path"
                  :src="getImageUrl(item.imagen_path)"
                  class="w-10 sm:w-14 h-10 sm:h-14 rounded-xl object-cover border border-slate-200"
                >

                <div class="min-w-0">

                  <p class="font-semibold text-slate-900 text-sm sm:text-base truncate">
                    {{ item.nombre }}
                  </p>

                  <p class="text-xs sm:text-sm text-slate-500">
                    {{ item.modelos?.length || 0 }} modelos
                  </p>

                </div>

              </div>

            </td>

            <td class="p-3 sm:p-5">{{ item.marca }}</td>
            <td class="p-3 sm:p-5">{{ item.categoria }}</td>

            <td class="p-3 sm:p-5 font-semibold">
              {{ formatPrice(item.precio) }}
            </td>

            <td class="p-3 sm:p-5">

              <span
                v-if="item.unidades <= 5"
                class="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs"
              >
                Bajo
              </span>

              <span
                v-else-if="item.unidades <= 15"
                class="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs"
              >
                Medio
              </span>

              <span
                v-else
                class="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs"
              >
                Disponible
              </span>

              <p class="text-xs text-slate-500 mt-1">
                {{ item.unidades }} unidades
              </p>

            </td>

            <td class="p-3 sm:p-5">
              <span
                v-if="item.es_original"
                class="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
              >
                Original
              </span>

              <span
                v-else
                class="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs"
              >
                Genérico
              </span>
            </td>

            <td class="p-3 sm:p-5">

              <div class="flex gap-2">

                <button
                  @click="handleEdit(item)"
                  class="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-sm hover:bg-blue-100"
                >
                  Editar
                </button>

                <button
                  @click="handleDelete(item)"
                  class="px-3 py-1 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100"
                >
                  Eliminar
                </button>

              </div>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- MOBILE CARDS -->
    <div
      v-if="store.filteredRepuestos.length"
      class="md:hidden divide-y divide-slate-100"
    >

      <div
        v-for="item in paginatedRepuestos"
        :key="item.id"
        class="p-4 hover:bg-slate-50"
      >

        <div class="flex gap-3">

          <img
            v-if="item.imagen_path"
            :src="getImageUrl(item.imagen_path)"
            class="w-14 h-14 rounded-xl object-cover border"
          >

          <div class="flex-1">

            <p class="font-semibold text-sm">{{ item.nombre }}</p>
            <p class="text-xs text-slate-500">
              {{ item.modelos?.length || 0 }} modelos
            </p>

          </div>

        </div>

      </div>

    </div>

    <!-- PAGINATION -->
    <div
      v-if="totalPages > 1"
      class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-slate-200"
    >

      <!-- LEFT INFO -->
      <div class="flex items-center gap-3">

        <select
          v-model="pageSize"
          class="border border-slate-200 rounded-lg px-2 py-1 text-sm"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>

        <p class="text-sm text-slate-500">
          Mostrando
          <span class="font-medium text-slate-700">{{ startItem }}</span>
          -
          <span class="font-medium text-slate-700">{{ endItem }}</span>
          de
          <span class="font-medium text-slate-700">
            {{ store.filteredRepuestos.length }}
          </span>
        </p>

      </div>

      <!-- RIGHT PAGINATION -->
      <div class="flex items-center gap-1">

        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-2 py-1 border rounded-lg disabled:opacity-40"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>

        <button
          v-for="page in visiblePages"
          :key="page.key"
          @click="goToPage(page.value)"
          :class="[
            'px-3 py-1 rounded-lg text-sm',
            page.active
              ? 'bg-blue-600 text-white'
              : 'hover:bg-slate-100 text-slate-600'
          ]"
        >
          {{ page.label }}
        </button>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-2 py-1 border rounded-lg disabled:opacity-40"
        >
          <ChevronRight class="w-4 h-4" />
        </button>

      </div>

    </div>

  </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRepuestosStore } from '@/stores/repuestos.store'
import { useUiStore } from '@/stores/ui.store'
import { getImageUrl } from '@/services/storage.service'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const store = useRepuestosStore()
const uiStore = useUiStore()

const currentPage = ref(1)
const pageSize = ref(10)

/* PAGINATED DATA */
const paginatedRepuestos = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return store.filteredRepuestos.slice(start, start + pageSize.value)
})

const totalPages = computed(() =>
  Math.ceil(store.filteredRepuestos.length / pageSize.value)
)

/* INFO */
const startItem = computed(() =>
  store.filteredRepuestos.length
    ? (currentPage.value - 1) * pageSize.value + 1
    : 0
)

const endItem = computed(() =>
  Math.min(currentPage.value * pageSize.value, store.filteredRepuestos.length)
)

/* RESET */
watch(() => store.filteredRepuestos, () => {
  currentPage.value = 1
})

watch(pageSize, () => {
  currentPage.value = 1
})

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

/* SMART PAGES */
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  const add = (value, label = value, active = false) => {
    pages.push({ key: value + label, value, label, active })
  }

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      add(i, i, i === current)
    }
    return pages
  }

  add(1, 1, current === 1)

  if (current > 3) pages.push({ key: '...', label: '...', value: null })

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    add(i, i, i === current)
  }

  if (current < total - 2) pages.push({ key: '...2', label: '...', value: null })

  add(total, total, current === total)

  return pages
})

function formatPrice(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(value)
}

function handleEdit(item) {
  store.setSelectedRepuesto(item)
  uiStore.openRepuestoModal()
}

async function handleDelete(item) {
  const confirmed = window.confirm(`¿Desea eliminar "${item.nombre}"?`)
  if (!confirmed) return
  await store.removeRepuesto(item.id)
}
</script>