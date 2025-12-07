export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const wavBase64 = 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA='
    const buf = Buffer.from(wavBase64, 'base64')
    return new Response(buf, { headers: { 'Content-Type': 'audio/wav' } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
