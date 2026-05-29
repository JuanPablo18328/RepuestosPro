<template>
  <div class="min-h-screen flex">

    <aside class="w-64 border-r p-4">
      <h2 class="font-bold text-xl mb-6">
        Repuestos Pro
      </h2>

      <nav class="space-y-2">
        <RouterLink
          to="/admin"
          class="block"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          to="/admin/repuestos"
          class="block"
        >
          Repuestos
        </RouterLink>
      </nav>
    </aside>

    <main class="flex-1 p-6">
      <slot />
    </main>

  </div>
</template>