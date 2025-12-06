'use client'
import React, { useState } from 'react'
import PlanForm, { FormValues } from '../components/PlanForm'
import PlanViewer from '../components/PlanViewer'

export default function Page() {
  const [planJson, setPlanJson] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleGenerate(values: FormValues) {
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values }),
      })
      const data = await res.json()
      let parsed
      try { parsed = JSON.parse(data.content) }
      catch (e) { parsed = { error: 'Could not parse AI response', raw: data.content } }
      setPlanJson(parsed)
      localStorage.setItem('latestPlan', JSON.stringify(parsed))
    } catch (err) {
      console.error(err)
      alert('Error generating plan')
    } finally { setLoading(false) }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <PlanForm onGenerate={handleGenerate} loading={loading} />
      </div>
      <div className="md:col-span-2">
        <PlanViewer plan={planJson} />
      </div>
    </div>
  )
}
