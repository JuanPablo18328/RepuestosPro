import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getCategorias } from '@/services/categorias.service'

export const useCategoriasStore = defineStore(
  'categorias',
  () => {

    const categorias = ref([])

    async function fetchCategorias() {

      const { data, error } =
        await getCategorias()

      if (error) {
        console.error(error)
        return
      }

      categorias.value = data
    }

    return {
      categorias,
      fetchCategorias
    }
  }
)