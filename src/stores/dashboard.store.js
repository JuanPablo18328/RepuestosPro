import { defineStore } from 'pinia'
import { ref } from 'vue'

import { supabase } from '@/lib/supabase'

export const useDashboardStore = defineStore(
  'dashboard',
  () => {

    const stats = ref({
      totalRepuestos: 0,
      stockBajo: 0,
      destacados: 0,
      totalMarcas: 0
    })

    async function fetchStats() {

      const [
        repuestos,
        marcas
      ] = await Promise.all([
        supabase
          .from('repuestos')
          .select('*'),

        supabase
          .from('marcas')
          .select('*')
      ])

      const items =
        repuestos.data || []

      stats.value = {

        totalRepuestos:
          items.length,

        stockBajo:
          items.filter(
            item => item.unidades <= 5
          ).length,

        destacados:
          items.filter(
            item => item.destacado
          ).length,

        totalMarcas:
          marcas.data?.length || 0
      }
    }

    return {
      stats,
      fetchStats
    }
  }
)