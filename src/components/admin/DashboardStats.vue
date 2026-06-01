<template>
    <StatsCards
      :stats="
        dashboardStore.stats
      "
    />
</template>

<script setup>
import { onMounted } from 'vue'

import StatsCards from '@/components/admin/dashboard/StatsCards.vue'

import { useDashboardStore } from '@/stores/dashboard.store'

const dashboardStore =
  useDashboardStore()

onMounted(async () => {

  await dashboardStore.fetchStats()

})
</script>