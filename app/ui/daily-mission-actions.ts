'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '../lib/supabase'

export async function addMission(name: string, difficulty: number) {
    await supabase
        .from('missions')
        .insert({ name, difficulty, complete_status: false })
        .throwOnError()

    revalidatePath('/')
}

export async function toggleMission(id: string, currentStatus: boolean) {
    await supabase
        .from('missions')
        .update({ complete_status: !currentStatus })
        .eq('id', id)
        .throwOnError()

    revalidatePath('/')
}
