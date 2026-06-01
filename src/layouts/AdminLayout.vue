<script setup>
import {
  Package,
  Tags,
  Search,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import {
  ref,
  onMounted,
  onUnmounted,
  watch
} from 'vue'

const sidebarCollapsed = ref(false)
const sidebarOpen = ref(false)
const isMobile = ref(false)

function toggleSidebar() {
  if (isMobile.value) {
    sidebarOpen.value = !sidebarOpen.value
  } else {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}

function closeSidebar() {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

function checkScreenSize() {
  const width = window.innerWidth

  isMobile.value = width < 768

  if (!isMobile.value) {
    sidebarOpen.value = false

    // Tablet = colapsado
    // Desktop = expandido
    sidebarCollapsed.value = width < 1280
  }
}

watch(sidebarOpen, (value) => {
  if (isMobile.value) {
    document.body.style.overflow = value
      ? 'hidden'
      : ''
  }
})

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('resize', checkScreenSize)
})

const authStore = useAuthStore()
const router = useRouter()

async function logout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div
    class="
      min-h-screen
      flex
      bg-[#f8fafc]
      overflow-x-hidden
    "
  >
    <!-- Overlay -->
    <div
      v-if="sidebarOpen && isMobile"
      @click="closeSidebar"
      class="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        z-30
        md:hidden
      "
    />

    <!-- SIDEBAR -->
    <aside
      :class="[
        isMobile
          ? sidebarOpen
            ? 'translate-x-0 w-72 fixed top-0 left-0'
            : '-translate-x-full w-72 fixed top-0 left-0'
          : sidebarCollapsed
            ? 'w-20'
            : 'w-72'
      ]"
      class="
        bg-white
        border-r
        border-slate-200
        flex
        flex-col
        shrink-0
        transition-all
        duration-300
        h-screen
        z-40
        md:relative
        md:translate-x-0
      "
    >
      <!-- LOGO -->
      <div
        :class="[
          isMobile || sidebarCollapsed
            ? 'justify-center px-0'
            : 'px-6'
        ]"
        class="
          h-16
          md:h-20
          flex
          items-center
          border-b
          border-slate-100
          transition-all
        "
      >
        <div
          class="
            w-12
            h-12
            rounded-xl
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          <Package :size="24" />
        </div>

        <div
          :class="[
            isMobile || sidebarCollapsed
              ? 'hidden'
              : 'block ml-3'
          ]"
        >
          <h2
            class="
              text-xl
              font-bold
              whitespace-nowrap
            "
          >
            Repuestos
            <span class="text-blue-600">
              Pro
            </span>
          </h2>
        </div>
      </div>

      <!-- NAVEGACIÓN -->
      <div
        :class="[
          isMobile || sidebarCollapsed
            ? 'px-2'
            : 'p-4'
        ]"
        class="flex-1 overflow-y-auto"
      >
        <p
          v-if="!isMobile && !sidebarCollapsed"
          class="admin-section-title"
        >
          Navegación
        </p>

        <nav class="space-y-2">
          <RouterLink
            to="/admin/repuestos"
            @click="closeSidebar"
            :class="[
              'admin-nav-item',
              isMobile || sidebarCollapsed
                ? 'admin-nav-item-collapsed'
                : ''
            ]"
          >
            <div class="tooltip-container">
              <Package :size="18" />

              <div
                v-if="sidebarCollapsed"
                class="tooltip-content"
              >
                Repuestos
              </div>
            </div>

            <span
              :class="[
                isMobile || sidebarCollapsed
                  ? 'hidden'
                  : 'block'
              ]"
              class="whitespace-nowrap"
            >
              Repuestos
            </span>
          </RouterLink>

          <RouterLink
            to="/admin/marcas"
            @click="closeSidebar"
            :class="[
              'admin-nav-item',
              isMobile || sidebarCollapsed
                ? 'admin-nav-item-collapsed'
                : ''
            ]"
          >
            <div class="tooltip-container">
              <Tags :size="18" />

              <div
                v-if="sidebarCollapsed"
                class="tooltip-content"
              >
                Marcas
              </div>
            </div>

            <span
              :class="[
                isMobile || sidebarCollapsed
                  ? 'hidden'
                  : 'block'
              ]"
              class="whitespace-nowrap"
            >
              Marcas
            </span>
          </RouterLink>
        </nav>
      </div>

      <!-- LOGOUT -->
      <div class="p-2 md:p-4 mt-auto">
        <button
          @click="logout"
          :class="[
            isMobile || sidebarCollapsed
              ? 'admin-logout-btn-collapsed'
              : 'admin-logout-btn'
          ]"
        >
          <LogOut :size="18" />

          <span
            :class="[
              isMobile || sidebarCollapsed
                ? 'hidden'
                : 'block'
            ]"
          >
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>

    <!-- CONTENIDO -->
    <div
      class="
        flex-1
        flex
        flex-col
        min-w-0
        w-full
      "
    >
      <!-- TOPBAR -->
      <header
        class="
          h-16
          md:h-20
          bg-white
          border-b
          border-slate-200
          px-3
          sm:px-5
          md:px-8
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div
          class="
            flex
            items-center
            gap-3
            min-w-0
            flex-1
          "
        >
          <button
            @click="toggleSidebar"
            class="
              w-10
              h-10
              rounded-xl
              hover:bg-slate-100
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Menu
              v-if="!sidebarOpen"
              :size="22"
            />

            <X
              v-else
              :size="22"
            />
          </button>

          <div
            class="
              relative
              flex-1
              max-w-[500px]
              hidden
              sm:block
            "
          >
            <Search
              :size="18"
              class="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="Buscar repuestos..."
              class="
                admin-search-input
                w-full
              "
            >
          </div>
        </div>

        <div
          class="
            flex
            items-center
            gap-2
            shrink-0
          "
        >
          <img
            src="https://i.pravatar.cc/150"
            alt=""
            class="
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-full
              shrink-0
            "
          >

          <div class="hidden sm:block">
            <p class="font-semibold">
              Admin
            </p>

            <p
              class="
                text-sm
                text-slate-500
              "
            >
              Administrador
            </p>
          </div>
        </div>
      </header>

      <!-- VISTAS -->
      <main
        class="
          flex-1
          min-w-0
          overflow-y-auto
          overflow-x-hidden
          p-3
          sm:p-4
          md:p-5
          lg:p-6
        "
      >
        <div class="w-full min-w-0">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>