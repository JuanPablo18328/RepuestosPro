<template>

  <!-- GUARD AGAINST UNDEFINED STATE -->
  <form
    v-if="ready"
    class="space-y-8"
    @submit.prevent="handleSubmit"
  >

    <!-- NOMBRE -->
    <div>
      <label class="block mb-2 text-sm font-medium text-slate-700">
        Nombre
      </label>

      <input
        v-model="form.nombre"
        type="text"
        class="input"
      />

      <p v-if="errors.nombre" class="text-red-500 text-sm mt-1">
        {{ errors.nombre }}
      </p>
    </div>

    <!-- CATEGORIA -->
    <div>
      <label class="label">Categoría</label>

      <select v-model="form.categoria" class="input">
        <option value="">Seleccione una categoría</option>

        <option
          v-for="c in categoriasStore.categorias"
          :key="c.id"
          :value="c.nombre"
        >
          {{ c.nombre }}
        </option>
      </select>

      <p v-if="errors.categoria" class="error">
        {{ errors.categoria }}
      </p>
    </div>

    <!-- MARCA -->
    <div>
      <label class="label">Marca</label>

      <select v-model="form.marca" class="input">
        <option value="">Seleccione una marca</option>

        <option
          v-for="m in marcasStore.marcas"
          :key="m.id"
          :value="m.nombre"
        >
          {{ m.nombre }}
        </option>
      </select>

      <p v-if="errors.marca" class="error">
        {{ errors.marca }}
      </p>
    </div>

    <!-- MODELOS -->
    <div>
      <label class="label">Modelos compatibles</label>

      <div class="card">

        <div class="flex flex-wrap gap-2 mb-3">

          <div
            v-for="(modelo, i) in form.modelos"
            :key="modelo"
            class="tag"
          >
            {{ modelo }}

            <button
              type="button"
              class="text-red-500 ml-2"
              @click="removeModelo(i)"
            >
              ×
            </button>
          </div>

        </div>

        <div class="flex gap-2">

          <input
            v-model="modeloInput"
            class="input"
            placeholder="Ej: Samsung A54"
            @keydown.enter.prevent="addModelo"
          />

          <button
            type="button"
            class="btn-dark"
            @click="addModelo"
          >
            +
          </button>

        </div>

      </div>

      <p v-if="errors.modelos" class="error">
        {{ errors.modelos }}
      </p>
    </div>

    <!-- DESCRIPCIÓN -->
    <div>
      <label class="label">Descripción</label>

      <textarea
        v-model="form.descripcion"
        rows="5"
        class="input"
      />
    </div>

    <!-- PRECIO / UNIDADES -->
    <div class="grid md:grid-cols-2 gap-4">

      <div>
        <label class="label">Precio</label>

        <input
          v-model.number="form.precio"
          type="number"
          class="input"
        />

        <p v-if="errors.precio" class="error">
          {{ errors.precio }}
        </p>
      </div>

      <div>
        <label class="label">Unidades</label>

        <input
          v-model.number="form.unidades"
          type="number"
          class="input"
        />

        <p v-if="errors.unidades" class="error">
          {{ errors.unidades }}
        </p>
      </div>

    </div>

    <!-- FLAGS -->
    <div class="grid md:grid-cols-2 gap-4">

      <label class="check-card">
        <input type="checkbox" v-model="form.es_original" />

        <div>
          <p class="font-medium">Original</p>
          <p class="text-sm text-slate-500">Producto genuino</p>
        </div>
      </label>

      <label class="check-card">
        <input type="checkbox" v-model="form.destacado" />

        <div>
          <p class="font-medium">Destacado</p>
          <p class="text-sm text-slate-500">Mostrar en destacados</p>
        </div>
      </label>

    </div>

    <!-- IMAGEN -->
    <div>
      <label class="label">Imagen</label>

      <input
        ref="imageInputRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleImageChange"
      />

      <div class="dropzone">

        <button
          type="button"
          class="btn-primary"
          @click="imageInputRef.click()"
        >
          Seleccionar imagen
        </button>

        <p class="text-sm text-slate-500 mt-2">
          PNG, JPG o WEBP · máximo 2MB
        </p>

        <img
          v-if="previewUrl"
          :src="previewUrl"
          class="preview"
        />

      </div>
    </div>

    <!-- ACTIONS -->
    <div class="actions">

      <button
        v-if="store.selectedRepuesto"
        type="button"
        class="btn-outline"
        @click="resetForm"
      >
        Cancelar
      </button>

      <button
        class="btn-primary"
        :disabled="loading"
      >
        {{
          loading
            ? 'Guardando...'
            : store.selectedRepuesto
              ? 'Actualizar Repuesto'
              : 'Guardar Repuesto'
        }}
      </button>

    </div>

  </form>

</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useRepuestosStore } from '@/stores/repuestos.store'
import { useMarcasStore } from '@/stores/marcas.store'
import { useCategoriasStore } from '@/stores/categorias.store'
import { showSuccess, showError } from '@/lib/toast'
import { uploadRepuestoImage, getImageUrl } from '@/services/storage.service'

const store = useRepuestosStore()
const marcasStore = useMarcasStore()
const categoriasStore = useCategoriasStore()

const loading = ref(false)
const modeloInput = ref('')
const imageFile = ref(null)
const imageInputRef = ref(null)

const errors = reactive({})

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

/* ✅ FIX CRÍTICO */
const ready = computed(() => true)

/* IMAGE PREVIEW */
const previewUrl = computed(() => {
  if (imageFile.value) {
    return URL.createObjectURL(imageFile.value)
  }

  if (store.selectedRepuesto?.imagen_path) {
    return getImageUrl(store.selectedRepuesto.imagen_path)
  }

  return ''
})

/* WATCH EDIT */
watch(
  () => store.selectedRepuesto,
  (r) => {
    if (!r) {
      resetForm()
      return
    }

    form.nombre = r.nombre || ''
    form.categoria = r.categoria || ''
    form.marca = r.marca || ''
    form.modelos = r.modelos ? [...r.modelos] : []
    form.descripcion = r.descripcion || ''
    form.precio = r.precio || 0
    form.unidades = r.unidades || 0
    form.es_original = !!r.es_original
    form.destacado = !!r.destacado
  },
  { immediate: true }
)

/* METHODS */
function addModelo() {
  const val = modeloInput.value.trim()
  if (!val) return

  if (!form.modelos.includes(val)) {
    form.modelos.push(val)
  }

  modeloInput.value = ''
}

function removeModelo(i) {
  form.modelos.splice(i, 1)
}

function resetForm() {
  form.nombre = ''
  form.categoria = ''
  form.marca = ''
  form.modelos = []
  form.descripcion = ''
  form.precio = 0
  form.unidades = 0
  form.es_original = false
  form.destacado = false

  imageFile.value = null
  modeloInput.value = ''

  if (imageInputRef.value) {
    imageInputRef.value.value = ''
  }

  store.clearSelectedRepuesto()
}

function validateForm() {
  Object.keys(errors).forEach(k => (errors[k] = ''))

  let ok = true

  if (!form.nombre) {
    errors.nombre = 'Requerido'
    ok = false
  }

  if (!form.categoria) {
    errors.categoria = 'Requerido'
    ok = false
  }

  if (!form.marca) {
    errors.marca = 'Requerido'
    ok = false
  }

  if (!form.modelos.length) {
    errors.modelos = 'Agrega al menos uno'
    ok = false
  }

  return ok
}

async function handleSubmit() {
  if (!validateForm()) return

  loading.value = true

  try {
    let imagePath = store.selectedRepuesto?.imagen_path || null

    if (imageFile.value) {
      imagePath = await uploadRepuestoImage(imageFile.value)
    }

    const payload = {
      ...form,
      imagen_path: imagePath
    }

    if (store.selectedRepuesto) {
      await store.editRepuesto(store.selectedRepuesto.id, payload)
      showSuccess('Actualizado')
    } else {
      await store.addRepuesto(payload)
      showSuccess('Creado')
    }

    resetForm()

  } catch (e) {
    showError(e.message || 'Error')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    marcasStore.fetchMarcas(),
    categoriasStore.fetchCategorias()
  ])
})
</script>
