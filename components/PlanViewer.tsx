'use client'
import React, { useState } from 'react'

export default function PlanViewer({ plan }: { plan: any }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loadingImage, setLoadingImage] = useState(false)

  if (!plan) return <div className="p-4 bg-white rounded shadow">No plan yet. Generate one!</div>
  if (plan.error) return <div className="p-4 bg-red-50 rounded">Error: {plan.error}</div>

  async function handleGenerateImage(prompt: string) {
    setLoadingImage(true)
    setImageUrl(null)
    try {
      const res = await fetch('/api/image', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) })
      const data = await res.json()
      setImageUrl(data.imageUrl)
    } catch (err) {
      console.error(err)
      alert('Image generation failed')
    } finally { setLoadingImage(false) }
  }

  async function handleSpeak(text: string) {
    try {
      const res = await fetch('/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.play()
    } catch (err) { console.error(err); alert('TTS failed') }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">Plan summary</h2>
            <p className="text-sm text-gray-600">{plan.summary}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleSpeak(plan.summary || 'Here is your plan summary')} className="px-3 py-1 border rounded">Read</button>
            <button onClick={async () => {
              const el = document.getElementById('plan-root')
              if (!el) return
              const html2canvas = (await import('html2canvas')).default
              const canvas = await html2canvas(el as HTMLElement)
              const img = canvas.toDataURL('image/png')
              const { jsPDF } = await import('jspdf')
              const pdf = new jsPDF()
              pdf.addImage(img, 'PNG', 10, 10, 190, 0)
              pdf.save('plan.pdf')
            }} className="px-3 py-1 border rounded">Export PDF</button>
          </div>
        </div>
      </div>

      <div id="plan-root" className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Daily Plans</h3>
        <div className="mt-3 space-y-3">
          {plan.daily_plans?.map((d: any, idx: number) => (
            <div key={idx} className="border p-3 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{d.day} — {d.focus}</div>
                  <div className="text-sm text-gray-600">{d.cardio ? `Cardio: ${d.cardio.type} ${d.cardio.duration_min} min` : null}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleSpeak(`Day ${idx+1} workout: ${d.focus}`)} className="px-2 py-1 border rounded text-sm">Read</button>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                {d.exercises?.map((ex: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{ex.name} — {ex.sets}x{ex.reps}</div>
                      <div className="text-sm text-gray-600">Rest: {ex.rest_s}s • {ex.notes}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleGenerateImage(ex.name)} className="px-2 py-1 border rounded text-sm">{loadingImage ? '...' : 'Image'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-medium mt-4">Diet Plan</h3>
        <div className="mt-2 space-y-2">
          {plan.diet_plan?.meals?.map((m: any, idx: number) => (
            <div key={idx} className="p-2 border rounded">
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm">{m.items?.map((it: any) => `${it.food} (${it.qty})`).join(', ')}</div>
            </div>
          ))}
        </div>

        {imageUrl && (
          <div className="mt-4">
            <img src={imageUrl} alt="generated" className="w-full rounded shadow" />
          </div>
        )}
      </div>
    </div>
  )
}
