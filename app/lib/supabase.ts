import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_ANON_KEY

if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars')
}

// Server-only client — never imported by client components directly.
// No NEXT_PUBLIC_ prefix means these vars stay on the server.
export const supabase = createClient(url, key)

export type Mission = {
    id: string
    name: string
    difficulty: number
    complete_status: boolean
    created_at: string
}
