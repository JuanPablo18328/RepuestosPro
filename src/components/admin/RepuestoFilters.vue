<template>

  <div
    class="
      bg-white
      border
      border-slate-200
      rounded-2xl sm:rounded-3xl
      p-3 sm:p-4 md:p-5
      flex
      flex-col sm:flex-row
      gap-2 sm:gap-3 md:gap-4
    "
  >

    <input
      v-model="store.search"
      type="text"
      placeholder="Buscar repuesto..."
      class="
        flex-1
        border
        border-slate-200
        rounded-lg sm:rounded-2xl
        px-3 sm:px-4
        py-2 sm:py-3
        text-sm
        focus:border-blue-400
        focus:outline-none
        transition-all
      "
    >

    <select
      v-model="store.selectedMarca"
      class="
        border
        border-slate-200
        rounded-lg sm:rounded-2xl
        px-3 sm:px-4
        py-2 sm:py-3
        text-sm
        focus:border-blue-400
        focus:outline-none
        transition-all
        bg-white
      "
    >

      <option value="">
        Todas las marcas
      </option>

      <option
        v-for="marca in marcasStore.marcas"
        :key="marca.id"
        :value="marca.nombre"
      >
        {{ marca.nombre }}
      </option>

    </select>

    <select
      v-model="store.selectedCategoria"
      class="
        border
        border-slate-200
        rounded-lg sm:rounded-2xl
        px-3 sm:px-4
        py-2 sm:py-3
        text-sm
        focus:border-blue-400
        focus:outline-none
        transition-all
        bg-white
      "
    >

      <option value="">
        Todas las categorías
      </option>

      <option
        v-for="categoria in categoriasStore.categorias"
        :key="categoria.id"
        :value="categoria.nombre"
      >
        {{ categoria.nombre }}
      </option>

    </select>

  </div>

</template>

<script setup>
import { useRepuestosStore } from '@/stores/repuestos.store'
import { useMarcasStore } from '@/stores/marcas.store'
import { useCategoriasStore } from '@/stores/categorias.store'

const store = useRepuestosStore()
const marcasStore = useMarcasStore()
const categoriasStore = useCategoriasStore()
</script>