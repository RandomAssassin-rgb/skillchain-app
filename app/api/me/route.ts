import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return NextResponse.json({
    id: user.id,
    email: user.email,
    name: profile?.name || user.user_metadata?.full_name || user.email,
    image: profile?.avatar_url || user.user_metadata?.avatar_url || null,
    walletAddress: profile?.wallet_address || null,
    role: profile?.role || "student",
  })
}
