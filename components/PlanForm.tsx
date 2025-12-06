'use client'
import React, { useState } from 'react'

export type FormValues = {
  name: string
  age: number
  gender: string
  height_cm: number
  weight_kg: number
  goal: string
  fitness_level: string
  location: string
  dietary_pref: string
  days_per_week: number
  medical_history?: string
}

export default function PlanForm({ onGenerate, loading }: { onGenerate: (v: FormValues) => void, loading?: boolean }) {
  const [values, setValues] = useState<FormValues>({
    name: '', age: 25, gender: 'Male', height_cm: 170, weight_kg: 70, goal: 'Weight Loss', fitness_level: 'Beginner', location: 'Home', dietary_pref: 'Non-Veg', days_per_week: 3, medical_history: ''
  })

  function update<K extends keyof FormValues>(k: K, val: FormValues[K]) {
    setValues(prev => ({ ...prev, [k]: val }))
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onGenerate(values); }} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={values.name} onChange={e => update('name', e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm">Age</label>
          <input type="number" value={values.age} onChange={e => update('age', Number(e.target.value))} className="mt-1 block w-full rounded border px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm">Height (cm)</label>
          <input type="number" value={values.height_cm} onChange={e => update('height_cm', Number(e.target.value))} className="mt-1 block w-full rounded border px-2 py-1" />
        </div>
        <div>
          <label className="block text-sm">Weight (kg)</label>
          <input type="number" value={values.weight_kg} onChange={e => update('weight_kg', Number(e.target.value))} className="mt-1 block w-full rounded border px-2 py-1" />
        </div>
      </div>

      <div>
        <label className="block text-sm">Goal</label>
        <select value={values.goal} onChange={e => update('goal', e.target.value)} className="mt-1 block w-full rounded border px-3 py-2">
          <option>Weight Loss</option>
          <option>Muscle Gain</option>
          <option>Maintain</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">Fitness level</label>
          <select value={values.fitness_level} onChange={e => update('fitness_level', e.target.value)} className="mt-1 block w-full rounded border px-3 py-2">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Location</label>
          <select value={values.location} onChange={e => update('location', e.target.value)} className="mt-1 block w-full rounded border px-3 py-2">
            <option>Home</option>
            <option>Gym</option>
            <option>Outdoor</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm">Dietary preference</label>
        <select value={values.dietary_pref} onChange={e => update('dietary_pref', e.target.value)} className="mt-1 block w-full rounded border px-3 py-2">
          <option>Non-Veg</option>
          <option>Veg</option>
          <option>Vegan</option>
          <option>Keto</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Days per week</label>
        <input type="number" min={1} max={7} value={values.days_per_week} onChange={e => update('days_per_week', Number(e.target.value))} className="mt-1 block w-24 rounded border px-2 py-1" />
      </div>

      <div>
        <label className="block text-sm">Medical history (optional)</label>
        <textarea value={values.medical_history} onChange={e => update('medical_history', e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>

      <div className="flex items-center gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'Generating...' : 'Generate Plan'}</button>
        <button type="button" onClick={() => { const saved = localStorage.getItem('latestPlan'); if (saved) { const p = JSON.parse(saved); alert('Loaded saved plan: summary:\n' + (p.summary||'no summary')); } else alert('No saved plan'); }} className="px-4 py-2 border rounded">Load saved</button>
      </div>
    </form>
  )
}
