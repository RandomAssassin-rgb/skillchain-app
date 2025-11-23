import { NextResponse } from "next/server"

// Credentials are stored in browser localStorage for this demo
// This route is not used in the current implementation

export async function GET() {
  return NextResponse.json({ error: "Use client-side localStorage instead" }, { status: 501 })
}

export async function POST(request: Request) {
  return NextResponse.json({ error: "Use client-side localStorage instead" }, { status: 501 })
}
