// No 'use client' here — this is a Server Component (the default in Next.js App Router).
// Server Components can be async, can read from databases/files, and produce zero client JS.
// Angular has no equivalent: all Angular components run in the browser.
//
// Here we just compute today's date on the server and pass it as a prop to the
// interactive DailyLog below.

import DailyLog from './ui/daily-log'
import DailyMission from './ui/daily-mission'
import { supabase } from './lib/supabase'
import type { Mission } from './lib/supabase'

export default async function Home() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Fetch missions on the server — zero client JS for this query.
  // Angular equivalent: a Resolver that pre-loads data before the route activates.
  const { data: missions } = await supabase
    .from('missions')
    .select('*')
    .order('created_at', { ascending: true })

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-zinc-100">Ha&apos;s Life OS</h1>

      {/* DailyLog is a Client Component — it receives the date as a prop.
          Angular: <app-daily-log [date]="today"></app-daily-log>
          React:   <DailyLog date={today} /> */}
      <DailyLog date={today} />
      <DailyMission missions={(missions ?? []) as Mission[]} />
    </main>
  )
}
