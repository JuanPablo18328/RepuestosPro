<template>
  <BaseModal
    :model-value="uiStore.isRepuestoModalOpen"
    @update:model-value="uiStore.closeRepuestoModal()"
  >

    <!-- BACKDROP + ANIMATION WRAPPER -->
    <div
      class="fixed inset-0 flex items-center justify-center"
    >

      <!-- PANEL ANIMADO -->
      <div
        v-motion
        :initial="{
          opacity: 0,
          scale: 0.92,
          y: 20
        }"
        :enter="{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 250,
            ease: 'easeOut'
          }
        }"
        :leave="{
          opacity: 0,
          scale: 0.92,
          y: 20,
          transition: {
            duration: 180,
            ease: 'easeIn'
          }
        }"
        class="
          w-full
          max-w-3xl
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          max-h-[90vh]
          flex
          flex-col
        "
      >

        <!-- HEADER -->
        <div class="flex items-center justify-between px-8 py-6 border-b border-slate-200">

          <div>
            <p class="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Inventario
            </p>

            <h2 class="text-2xl font-bold text-slate-900">
              {{
                store.selectedRepuesto
                  ? 'Editar Repuesto'
                  : 'Nuevo Repuesto'
              }}
            </h2>
          </div>

          <button
            class="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 transition"
            @click="uiStore.closeRepuestoModal()"
          >
            ✕
          </button>

        </div>

        <!-- BODY -->
        <div class="overflow-y-auto px-8 py-6">
          <RepuestoForm />
        </div>

      </div>

    </div>

  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/ui/BaseModal.vue'
import RepuestoForm from './RepuestoForm.vue'

import { useUiStore } from '@/stores/ui.store'
import { useRepuestosStore } from '@/stores/repuestos.store'

const uiStore = useUiStore()
const store = useRepuestosStore()
</script>