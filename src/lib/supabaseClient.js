import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Sin claves (p. ej. en local antes de crear el proyecto) la web funciona
// igual con el contenido de fábrica; solo el modo edición queda desactivado.
if (!url || !anonKey) {
  console.warn('Supabase sin configurar (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY): se usa el contenido de fábrica.')
}

export const supabase = url && anonKey ? createClient(url, anonKey) : null
