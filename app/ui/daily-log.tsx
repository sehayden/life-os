'use client'

// 'use client' = this component uses state and event handlers.
// In Angular, all components run in the browser by default.
// In Next.js, components are SERVER-side by default — you opt into
// the browser with 'use client'.

import { useState } from 'react'

// --- Types ---
// No need for a class or interface decorator. Plain TypeScript types work.
type LogEntry = {
  id: number
  text: string
  time: string
}

// --- Component ---
// Angular: @Component class with a template.
// React:   a plain function that returns JSX. Props = function argument.
export default function DailyLog({ date }: { date: string }) {
  // useState = two-way binding equivalent.
  // Angular: [(ngModel)]="draft"
  // React:   const [draft, setDraft] = useState('')
  //          — draft is the value, setDraft is the setter (like ngModel's write side)
  const [draft, setDraft] = useState('')
  const [entries, setEntries] = useState<LogEntry[]>([])

  function addEntry() {
    const trimmed = draft.trim()
    if (!trimmed) return

    // React state is immutable — always create a new array, never push().
    // Angular's ChangeDetectionStrategy.Default would catch a push,
    // but React won't re-render unless you give it a new reference.
    setEntries([
      ...entries,
      {
        id: Date.now(),
        text: trimmed,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setDraft('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Submit on Ctrl+Enter (or Cmd+Enter on Mac)
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addEntry()
    }
  }

  // JSX is returned directly — no separate template file.
  // Angular: <div *ngFor="let entry of entries">
  // React:   {entries.map(entry => <div key={entry.id}>...)}
  //          — key is required; it's React's equivalent of trackBy
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-zinc-400 uppercase tracking-widest">
        {date}
      </h2>

      {/* Entry list */}
      {/* Angular: *ngIf="entries.length === 0" */}
      {/* React:   condition && <JSX> */}
      {entries.length === 0 && (
        <p className="text-zinc-500 text-sm">No entries yet. Start logging your day.</p>
      )}

      <ul className="flex flex-col gap-3">
        {entries.map((entry) => (
          // key tells React which item is which when the list changes — like trackBy in ngFor
          <li key={entry.id} className="flex gap-4 items-start">
            <span className="text-xs text-zinc-500 pt-1 shrink-0 font-mono">{entry.time}</span>
            <p className="text-zinc-100 leading-relaxed">{entry.text}</p>
          </li>
        ))}
      </ul>

      {/* Input area */}
      <div className="flex flex-col gap-2">
        <textarea
          className="w-full rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-500
                     border border-zinc-700 focus:border-zinc-500 focus:outline-none
                     p-3 text-sm resize-none"
          rows={3}
          placeholder="What's happening? (Ctrl+Enter to log)"
          value={draft}
          // onChange = the "output" side of ngModel.
          // Angular: (ngModelChange)="draft = $event"
          // React:   onChange={e => setDraft(e.target.value)}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="self-end px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600
                     text-zinc-100 text-sm font-medium transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={addEntry}
          disabled={!draft.trim()}
        >
          Log entry
        </button>
      </div>
    </div>
  )
}
