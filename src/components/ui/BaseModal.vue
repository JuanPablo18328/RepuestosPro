<template>

  <Teleport to="body">

    <Transition name="modal">

      <div
        v-if="modelValue"
        class="fixed inset-0 z-50"
      >

        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="$emit('update:modelValue', false)"
        />

        <div
          class="absolute inset-0 flex items-center justify-center p-6"
        >

          <div
            class="
              bg-white
              rounded-3xl
              shadow-xl
              w-full
              max-w-4xl
              max-h-[90vh]
              overflow-y-auto
            "
          >

            <slot />

          </div>

        </div>

      </div>

    </Transition>

  </Teleport>

</template>

<script setup>

defineProps({
  modelValue: Boolean
})

defineEmits([
  'update:modelValue'
])

</script>