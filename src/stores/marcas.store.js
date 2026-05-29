import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getMarcas } from '@/services/marcas.service'

export const useMarcasStore = defineStore(
  'marcas',
  () => {

    const marcas = ref([])

    async function fetchMarcas() {

      const { data, error } =
        await getMarcas()

      if (error) {
        console.error(error)
        return
      }

      marcas.value = data
    }

    return {
      marcas,
      fetchMarcas
    }
  }
)