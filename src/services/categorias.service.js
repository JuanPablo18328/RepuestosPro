import { supabase } from '@/lib/supabase'

export async function getCategorias() {
  return await supabase
    .from('categorias')
    .select('*')
    .eq('estado', true)
    .order('nombre')
}