'use client'

import { useState, useTransition } from "react"
import { addMission, toggleMission } from "./daily-mission-actions"
import type { Mission } from "../lib/supabase"

const DIFFICULTY_LABELS: Record<number, string> = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard',
    4: 'Epic',
    5: 'Legendary',
}

const DIFFICULTY_COLORS: Record<number, string> = {
    1: 'text-emerald-400',
    2: 'text-yellow-400',
    3: 'text-orange-400',
    4: 'text-red-400',
    5: 'text-purple-400',
}

export default function DailyMission({ missions }: { missions: Mission[] }) {
    const [draft, setDraft] = useState({ name: '', difficulty: 1 })
    const [pending, startTransition] = useTransition()

    function handleAdd() {
        const trimmed = draft.name.trim()
        if (!trimmed) return
        startTransition(async () => {
            await addMission(trimmed, draft.difficulty)
            setDraft({ name: '', difficulty: 1 })
        })
    }

    function handleToggle(id: string, currentStatus: boolean) {
        startTransition(() => toggleMission(id, currentStatus))
    }

    const todo = missions.filter((m) => !m.complete_status)
    const done = missions.filter((m) => m.complete_status)

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-zinc-400 uppercase tracking-widest">
                Daily Missions
            </h2>

            {/* Add mission form */}
            <div className="flex flex-col gap-3 p-4 rounded-lg border border-zinc-700 bg-zinc-900">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-xs text-zinc-500 uppercase tracking-wider">
                        Mission Name
                    </label>
                    <input
                        id="name"
                        value={draft.name}
                        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder="What needs to be done?"
                        className="rounded-md bg-zinc-800 border border-zinc-700 focus:border-zinc-500
                                   focus:outline-none px-3 py-2 text-sm text-zinc-100
                                   placeholder:text-zinc-600"
                    />
                </div>

                <div className="flex items-end gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="difficulty" className="text-xs text-zinc-500 uppercase tracking-wider">
                            Difficulty
                        </label>
                        <select
                            id="difficulty"
                            value={draft.difficulty}
                            onChange={(e) => setDraft({ ...draft, difficulty: Number(e.target.value) })}
                            className="rounded-md bg-zinc-800 border border-zinc-700 focus:border-zinc-500
                                       focus:outline-none px-3 py-2 text-sm text-zinc-100"
                        >
                            {[1, 2, 3, 4, 5].map((d) => (
                                <option key={d} value={d}>{d} — {DIFFICULTY_LABELS[d]}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleAdd}
                        disabled={!draft.name.trim() || pending}
                        className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 text-zinc-100
                                   text-sm font-medium transition-colors
                                   disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {pending ? 'Saving…' : 'Add mission'}
                    </button>
                </div>
            </div>

            {/* Todo list */}
            {todo.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">To do</span>
                    <ul className="flex flex-col gap-2">
                        {todo.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900
                                           border border-zinc-800 hover:border-zinc-700 transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={false}
                                    onChange={() => handleToggle(item.id, item.complete_status)}
                                    className="w-4 h-4 rounded accent-zinc-400 cursor-pointer"
                                />
                                <span className="flex-1 text-sm text-zinc-100">{item.name}</span>
                                <span className={`text-xs font-medium ${DIFFICULTY_COLORS[item.difficulty]}`}>
                                    {DIFFICULTY_LABELS[item.difficulty]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Done list */}
            {done.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Done</span>
                    <ul className="flex flex-col gap-2">
                        {done.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900
                                           border border-zinc-800 opacity-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={true}
                                    onChange={() => handleToggle(item.id, item.complete_status)}
                                    className="w-4 h-4 rounded accent-zinc-400 cursor-pointer"
                                />
                                <span className="flex-1 text-sm text-zinc-100 line-through">{item.name}</span>
                                <span className={`text-xs font-medium ${DIFFICULTY_COLORS[item.difficulty]}`}>
                                    {DIFFICULTY_LABELS[item.difficulty]}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {missions.length === 0 && (
                <p className="text-zinc-500 text-sm">No missions yet. Add one above.</p>
            )}
        </div>
    )
}
