import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore(
  'ui',
  () => {

    const isRepuestoModalOpen =
      ref(false)

    function openRepuestoModal() {
      isRepuestoModalOpen.value = true
    }

    function closeRepuestoModal() {
      isRepuestoModalOpen.value = false
    }

    return {
      isRepuestoModalOpen,
      openRepuestoModal,
      closeRepuestoModal
    }
  }
)