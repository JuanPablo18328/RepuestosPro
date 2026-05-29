import { defineStore } from 'pinia'
import { ref } from 'vue'

import {
  getRepuestos,
  createRepuesto,
  updateRepuesto,
  deleteRepuesto
} from '@/services/repuestos.service'

export const useRepuestosStore = defineStore(
  'repuestos',
  () => {

    const repuestos = ref([])
    const loading = ref(false)
    const selectedRepuesto = ref(null)

    async function fetchRepuestos() {

      loading.value = true

      try {
        const { data, error } =
        await getRepuestos()

        if (error) throw error
        repuestos.value = data
        
      } finally {
        loading.value = false
      }

    } 

    function setSelectedRepuesto(repuesto) {
      selectedRepuesto.value = repuesto
    }

    async function addRepuesto(payload) {

      const { data, error } =
        await createRepuesto(payload)

      if (error) throw error

      repuestos.value.unshift(data)
    }

    async function editRepuesto(id, payload) {

      const { data, error } =
        await updateRepuesto(id, payload)

      if (error) throw error

      const index = repuestos.value.findIndex(
        item => item.id === id
      )

      if (index !== -1) {
        repuestos.value[index] = data
      }
    }

    async function removeRepuesto(id) {

      const { error } =
        await deleteRepuesto(id)

      if (error) throw error

      repuestos.value =
        repuestos.value.filter(
          item => item.id !== id
        )
    }

    return {
      repuestos,
      loading,
      fetchRepuestos,
      addRepuesto,
      editRepuesto,
      removeRepuesto,
      selectedRepuesto,
      setSelectedRepuesto
    }
  }
)