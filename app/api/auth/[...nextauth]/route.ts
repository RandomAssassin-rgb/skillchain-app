export async function GET() {
  return new Response(JSON.stringify({ error: "Auth not configured. Please set up Google OAuth credentials." }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST() {
  return new Response(JSON.stringify({ error: "Auth not configured. Please set up Google OAuth credentials." }), {
    status: 503,
    headers: { "Content-Type": "application/json" },
  })
}
