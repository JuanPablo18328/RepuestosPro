import { supabase } from '@/lib/supabase'

export async function uploadRepuestoImage(file) {

  const extension = file.name.split('.').pop()

  const fileName =
    `${crypto.randomUUID()}.${extension}`

  const filePath =
    `repuestos/${fileName}`

  const { error } =
    await supabase.storage
      .from('repuestos')
      .upload(
        filePath,
        file,
        {
          cacheControl: '3600',
          upsert: false
        }
      )

  if (error) {
    throw error
  }

  return filePath
}

export function getImageUrl(path) {

  if (!path) return null

  const { data } =
    supabase.storage
      .from('repuestos')
      .getPublicUrl(path)

  return data.publicUrl
}