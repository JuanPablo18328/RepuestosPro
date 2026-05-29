import { supabase } from '@/lib/supabase'

export async function getRepuestos() {
  return await supabase
    .from('repuestos')
    .select('*')
    .order('created_at', {
      ascending: false
    })
}

export async function createRepuesto(payload) {
  return await supabase
    .from('repuestos')
    .insert(payload)
    .select()
    .single()
}

export async function updateRepuesto(id, payload) {
  return await supabase
    .from('repuestos')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
}

export async function deleteRepuesto(id) {
  return await supabase
    .from('repuestos')
    .delete()
    .eq('id', id)
}