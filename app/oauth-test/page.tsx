"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OAuthTestPage() {
  const [diagnostics, setDiagnostics] = useState<any>({})
  const [testing, setTesting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const checkConfig = async () => {
      const config = {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set",
        currentOrigin: typeof window !== "undefined" ? window.location.origin : "Unknown",
        expectedCallbackUrl: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "Unknown",
        googleClientIdInVars:
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID ? "Set in vars" : "Not in vars",
      }
      setDiagnostics(config)
    }
    checkConfig()
  }, [])

  const testGoogleOAuth = async () => {
    setTesting(true)
    try {
      console.log("[v0] Testing Google OAuth...")
      console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log("[v0] Redirect URL:", `${window.location.origin}/auth/callback`)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        console.error("[v0] OAuth error:", error)
        alert(`OAuth Error: ${error.message}`)
      } else {
        console.log("[v0] OAuth initiated successfully:", data)
      }
    } catch (err) {
      console.error("[v0] Unexpected error:", err)
      alert(`Unexpected error: ${err}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Google OAuth Diagnostics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Configuration Status</h3>
              <pre className="text-sm text-slate-300 overflow-auto">{JSON.stringify(diagnostics, null, 2)}</pre>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
              <h3 className="text-blue-300 font-semibold mb-2">What to Check in Supabase Dashboard:</h3>
              <ol className="text-sm text-slate-300 list-decimal list-inside space-y-2">
                <li>Go to: https://supabase.com/dashboard/project/wxmoatiqhegyombxaank/auth/providers</li>
                <li>Find "Google" provider and click on it</li>
                <li>Verify "Enabled" toggle is ON</li>
                <li>Check that Client ID and Client Secret are filled in</li>
                <li>Client ID and Secret must match EXACTLY what you have in Google Cloud Console</li>
              </ol>
            </div>

            <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
              <h3 className="text-orange-300 font-semibold mb-2">Required Redirect URIs in Google Cloud Console:</h3>
              <ul className="text-sm text-slate-300 space-y-1 font-mono">
                <li>✓ https://wxmoatiqhegyombxaank.supabase.co/auth/v1/callback</li>
                <li>✓ {diagnostics.expectedCallbackUrl}</li>
              </ul>
            </div>

            <Button
              onClick={testGoogleOAuth}
              disabled={testing}
              className="w-full bg-white text-black hover:bg-slate-200"
            >
              {testing ? "Testing..." : "Test Google OAuth (Check Console for Logs)"}
            </Button>

            <div className="text-sm text-slate-400">
              <p>Press F12 to open Developer Console and see detailed logs after clicking test button.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Common "Content is Blocked" Causes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <div>
              <strong className="text-white">1. Google OAuth not enabled in Supabase:</strong>
              <p>The most common issue. Even if your code is perfect, Supabase needs the credentials.</p>
            </div>
            <div>
              <strong className="text-white">2. Credentials mismatch:</strong>
              <p>Client ID/Secret in Supabase don't match Google Cloud Console (even one wrong character breaks it).</p>
            </div>
            <div>
              <strong className="text-white">3. App in testing mode without test users:</strong>
              <p>
                If your Google OAuth app is in "Testing" status, add your email as a test user in Google Cloud Console.
              </p>
            </div>
            <div>
              <strong className="text-white">4. Missing redirect URI:</strong>
              <p>The Supabase redirect URI must be added in Google Cloud Console authorized redirect URIs.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
