import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { values } = body
    // NOTE: This is a stubbed response. Replace with real LLM call (OpenAI/Gemini/etc).
    const plan = {
      summary: `Personalized ${values.goal} plan for ${values.name || 'User'}.`,
      daily_plans: Array.from({length: values.days_per_week || 3}).map((_, i) => ({
        day: `Day ${i+1}`,
        focus: i % 3 === 0 ? 'Full-body' : (i % 3 === 1 ? 'Upper' : 'Lower'),
        exercises: [
          { name: 'Bodyweight Squat', equipment: 'None', sets: 3, reps: '10-12', rest_s: 60, notes: 'Keep chest up' },
          { name: 'Push-up', equipment: 'None', sets: 3, reps: '8-12', rest_s: 60, notes: 'Elbows 45°' }
        ],
        cardio: { type: 'Brisk walk', duration_min: 20 }
      })),
      diet_plan: {
        calories_target: 2000,
        meals: [
          { name: 'Breakfast', items: [{ food: 'Oats', qty: '50g', calories: 300, protein_g: 10 }] },
          { name: 'Lunch', items: [{ food: 'Grilled Chicken Salad', qty: '1 bowl', calories: 500, protein_g: 35 }] }
        ]
      },
      tips: ['Stay hydrated', 'Prioritize sleep'],
      motivation: ['You can do this!']
    }

    // Return as stringified JSON in `content` to mimic LLM chat response
    return NextResponse.json({ content: JSON.stringify(plan) })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
