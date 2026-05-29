<template>
  <form
    class="bg-white border rounded-xl p-6 space-y-4"
    @submit.prevent="handleSubmit"
  >
    <h2 class="text-xl font-semibold">
      Nuevo Repuesto
    </h2>

    <div>
      <label class="block mb-2">
        Nombre
      </label>

      <input
        v-model="form.nombre"
        type="text"
        class="w-full border rounded-lg p-3"
      />

      <p
        v-if="errors.nombre"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors.nombre }}
      </p>
    </div>

    <div>
      <label class="block mb-2">
        Categoría
      </label>

      <select
        v-model="form.categoria"
        class="w-full border rounded-lg p-3"
      >
        <option value="">
          Seleccione una categoría
        </option>

        <option
          v-for="categoria in categoriasStore.categorias"
          :key="categoria.id"
          :value="categoria.nombre"
        >
          {{ categoria.nombre }}
        </option>
      </select>

      <p
        v-if="errors.categoria"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors.categoria }}
      </p>
    </div>

    <div>
      <label class="block mb-2">
        Marca
      </label>

      <select
        v-model="form.marca"
        class="w-full border rounded-lg p-3"
      >
        <option value="">
          Seleccione una marca
        </option>

        <option
          v-for="marca in marcasStore.marcas"
          :key="marca.id"
          :value="marca.nombre"
        >
          {{ marca.nombre }}
        </option>
      </select>

      <p
        v-if="errors.marca"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors.marca }}
      </p>
    </div>

    <div>
      <label class="block mb-2 font-medium">
        Modelos compatibles
      </label>

      <div
        class="border rounded-lg p-3 min-h-15"
      >

        <div
          class="flex flex-wrap gap-2 mb-3"
        >

          <div
            v-for="(modelo,index) in form.modelos"
            :key="modelo"
            class="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2"
          >
            <span>
              {{ modelo }}
            </span>

            <p
              v-if="errors.modelos"
              class="text-red-500 text-sm mt-1"
            >
              {{ errors.modelos }}
            </p>

            <button
              type="button"
              @click="removeModelo(index)"
              class="text-red-500"
            >
              ×
            </button>
          </div>

        </div>

        <div class="flex gap-2">

          <input
            v-model="modeloInput"
            type="text"
            placeholder="Ej: Samsung A54"
            class="flex-1 border rounded-lg p-2"
            @keydown.enter.prevent="addModelo"
          />

          <button
            type="button"
            @click="addModelo"
            class="bg-black text-white px-4 rounded-lg"
          >
            +
          </button>

        </div>

      </div>
    </div>

    <div>
      <label class="block mb-2">
        Descripción
      </label>

      <textarea
        v-model="form.descripcion"
        rows="4"
        class="w-full border rounded-lg p-3"
      />
    </div>

    <div class="grid md:grid-cols-2 gap-4">

      <div>
        <label class="block mb-2">
          Precio
        </label>

        <input
          v-model.number="form.precio"
          type="number"
          min="0"
          class="w-full border rounded-lg p-3"
        />

        <p
          v-if="errors.precio"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.precio }}
        </p>
      </div>

      <div>
        <label class="block mb-2">
          Unidades
        </label>

        <input
          v-model.number="form.unidades"
          type="number"
          min="0"
          class="w-full border rounded-lg p-3"
        />

        <p
          v-if="errors.unidades"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.unidades }}
        </p>
      </div>

    </div>

    <div class="flex gap-6">

      <label class="flex items-center gap-2">
        <input
          v-model="form.es_original"
          type="checkbox"
        />

        Original
      </label>

      <label class="flex items-center gap-2">
        <input
          v-model="form.destacado"
          type="checkbox"
        />

        Destacado
      </label>

    </div>

    <div>

      <label
        class="block mb-2 font-medium"
      >
        Imagen
      </label>

      <input
        ref="imageInputRef"
        type="file"
        accept="image/*"
        @change="handleImageChange"
      />

      <img
        v-if="previewUrl"
        :src="previewUrl"
        alt="Vista previa"
        class="mt-4 w-40 h-40 rounded-lg object-cover border"
      />

    </div>

    <button
      :disabled="loading"
      class="bg-black text-white px-6 py-3 rounded-lg"
    >
      {{ loading ? 'Guardando...' : 'Guardar' }}
    </button>

  </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRepuestosStore } from '@/stores/repuestos.store'
import {
  showSuccess,
  showError
} from '@/lib/toast'

import { onMounted } from 'vue'

import { useMarcasStore } from '@/stores/marcas.store'
import { useCategoriasStore } from '@/stores/categorias.store'

import { uploadRepuestoImage } from '@/services/storage.service'

const marcasStore = useMarcasStore()
const categoriasStore = useCategoriasStore()
const store = useRepuestosStore()

const loading = ref(false)

const modeloInput = ref('')

const errors = reactive({})

const imageFile = ref(null)

const imageInputRef = ref(null)

const form = reactive({
  nombre: '',
  categoria: '',
  marca: '',
  modelos: [],
  descripcion: '',
  precio: 0,
  unidades: 0,
  es_original: false,
  destacado: false
})

function handleImageChange(event) {

  const file = event.target.files[0]

  if (!file) return

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ]

  const maxSize =
    2 * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {

    toast.error(
      'Solo JPG, PNG o WEBP'
    )

    return
  }

  if (file.size > maxSize) {

    toast.error(
      'La imagen no puede superar 2MB'
    )

    return
  }

  imageFile.value = file
}

const previewUrl = computed(() => {

  if (!imageFile.value) return ''

  return URL.createObjectURL(
    imageFile.value
  )
})

function validateForm() {

  errors.nombre = ''
  errors.categoria = ''
  errors.marca = ''
  errors.modelos = ''
  errors.precio = ''
  errors.unidades = ''

  let valid = true

  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio'
    valid = false
  }

  if (!form.categoria) {
    errors.categoria = 'Seleccione una categoría'
    valid = false
  }

  if (!form.marca) {
    errors.marca = 'Seleccione una marca'
    valid = false
  }

  if (!form.modelos.length) {
    errors.modelos =
      'Debe agregar al menos un modelo'
    valid = false
  }

  if (
    !form.precio ||
    Number(form.precio) <= 0
  ) {
    errors.precio =
      'Ingrese un precio válido'
    valid = false
  }

  if (
    form.unidades === null ||
    form.unidades < 0
  ) {
    errors.unidades =
      'Ingrese una cantidad válida'
    valid = false
  }

  return valid
}

async function handleSubmit() {

  const isValid = validateForm()

  if (!isValid) return

  loading.value = true

  try {

    let imagePath = null

    if (imageFile.value) {

      imagePath =
        await uploadRepuestoImage(
          imageFile.value
        )
    }

    await store.addRepuesto({
      ...form,
      imagen_path: imagePath,
      modelos: modeloInput.value
        .split('\n')
        .map(item => item.trim())
        .filter(Boolean)
    })

    showSuccess(
      'Repuesto creado correctamente'
    )

    resetForm()

  } catch (error) {

    showError(
      error.message || 'Error inesperado'
    )

  } finally {
    loading.value = false
  }

}

function addModelo() {

  const value = modeloInput.value.trim()

  if (!value) return

  const exists = form.modelos.some(
    modelo =>
      modelo.toLowerCase() === value.toLowerCase()
  )

  if (exists) {
    modeloInput.value = ''
    return
  }

  form.modelos.push(value)

  modeloInput.value = ''
}

function removeModelo(index) {
  form.modelos.splice(index, 1)
}

function resetForm() {

  form.nombre = ''
  form.categoria = ''
  form.marca = ''
  form.descripcion = ''
  form.precio = 0
  form.unidades = 0
  form.es_original = false
  form.destacado = false

  form.modelos = []

  modeloInput.value = ''

  imageFile.value = null

  if (imageInputRef.value) {
    imageInputRef.value.value = ''
  }
}

onMounted(async () => {
  await Promise.all([
    marcasStore.fetchMarcas(),
    categoriasStore.fetchCategorias()
  ])
})
</script>