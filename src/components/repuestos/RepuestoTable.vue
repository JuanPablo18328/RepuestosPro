<template>
  <div class="border rounded-xl overflow-hidden">
    <div
      v-if="store.loading"
      class="p-10 text-center"
    >
      Cargando repuestos...
    </div>

    <div
      v-else-if="!store.repuestos.length"
      class="p-10 text-center text-gray-500"
    >
      No existen repuestos registrados.
    </div>

    <table v-else class="w-full">

      <thead>
        <tr class="bg-gray-100">

          <th class="p-4">
            Imagen
          </th>

          <th class="text-left p-4">
            Nombre
          </th>

          <th class="text-left p-4">
            Marca
          </th>

          <th class="text-left p-4">
            Categoría
          </th>

          <th class="text-left p-4">
            Precio
          </th>

          <th class="text-left p-4">
            Stock
          </th>

          <th class="p-4">
            Acciones
          </th>

        </tr>
      </thead>

      <tbody>

        <tr
          v-for="item in store.repuestos"
          :key="item.id"
        >

          <td class="p-4">

            <img
              v-if="item.imagen_path"
              :src="getImageUrl(item.imagen_path)"
              :alt="item.nombre"
              class="w-16 h-16 rounded object-cover"
            />

          </td>

          <td class="p-4">
            {{ item.nombre }}
          </td>

          <td class="p-4">
            {{ item.marca }}
          </td>

          <td class="p-4">
            {{ item.categoria }}
          </td>

          <td class="p-4">
            {{ formatPrice(item.precio) }}
          </td>

          <td class="p-4">
            {{ item.unidades }}
          </td>

          <td class="p-4">
            <button
              class="text-blue-600"
            >
              Editar
            </button>
          </td>
        </tr>

      </tbody>

    </table>

  </div>
</template>

<script setup>
import { useRepuestosStore } from '@/stores/repuestos.store'
import {
  getImageUrl
} from '@/services/storage.service'

const store = useRepuestosStore()


function formatPrice(value) {
  return new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP'
    }
  ).format(value)
}
</script>