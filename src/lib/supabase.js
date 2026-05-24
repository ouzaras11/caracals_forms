import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// createClient sadece gerçek URL varken çağrılır
export const supabase = (supabaseUrl && supabaseUrl !== 'placeholder')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
