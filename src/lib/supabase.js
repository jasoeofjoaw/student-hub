import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnkytvzwlwefdwxexbfu.supabase.co'
const supabaseAnonKey = 'sb_publishable_QWbGu0_GBsnmX7PQ3TZB9g_TtNqj4Uf'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
