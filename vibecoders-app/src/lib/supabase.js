import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "🚨 VibeCoderz Warning: Supabase URL or Anonymous Key is missing! " +
    "Please check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set " +
    "correctly in your Netlify site settings, and that you have triggered a redeploy."
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
