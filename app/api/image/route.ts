import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    // Stub: return a placeholder image data URL (generated SVG) so frontend can display immediately.
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'><rect width='100%' height='100%' fill='#e2e8f0'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='#334155'>Generated image for: ${prompt}</text></svg>`
    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
    return NextResponse.json({ imageUrl: dataUrl })
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
