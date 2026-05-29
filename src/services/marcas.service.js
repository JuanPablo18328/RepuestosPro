import { supabase } from '@/lib/supabase'

export async function getMarcas() {
  return await supabase
    .from('marcas')
    .select('*')
    .eq('estado', true)
    .order('nombre')
}