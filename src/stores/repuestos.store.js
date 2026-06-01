import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  showSuccess,
  showError
} from '@/lib/toast'

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

    const search = ref('')

    const selectedMarca = ref('')

    const selectedCategoria = ref('')

    const filteredRepuestos = computed(() => {

      return repuestos.value.filter(item => {

        const matchesSearch =
          !search.value ||

          item.nombre
            .toLowerCase()
            .includes(
              search.value.toLowerCase()
            )

        const matchesMarca =
          !selectedMarca.value ||

          item.marca ===
          selectedMarca.value

        const matchesCategoria =
          !selectedCategoria.value ||

          item.categoria ===
          selectedCategoria.value

        return (
          matchesSearch &&
          matchesMarca &&
          matchesCategoria
        )
      })
    })

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

    function clearSelectedRepuesto() {
      selectedRepuesto.value = null
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

      return data
    }

    async function removeRepuesto(id) {

      const { error } =
        await deleteRepuesto(id)

      if (error) {

        showError(
          error.message
        )

        throw error
      }

      repuestos.value =
        repuestos.value.filter(
          item => item.id !== id
        )

      showSuccess(
        'Repuesto eliminado correctamente'
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
      setSelectedRepuesto,
      clearSelectedRepuesto,
      search,
      selectedMarca,
      selectedCategoria,
      filteredRepuestos
    }
  }
)