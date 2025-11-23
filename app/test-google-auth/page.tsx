"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestGoogleAuth() {
  const [redirectUrl, setRedirectUrl] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testGoogleAuth = async () => {
    setLoading(true)
    setError("")
    setRedirectUrl("")

    try {
      const supabase = createClient()

      console.log("[v0] Testing Google OAuth...")
      console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log("[v0] Current URL:", window.location.origin)

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
        console.error("[v0] OAuth Error:", error)
        setError(error.message)
        return
      }

      if (data?.url) {
        console.log("[v0] OAuth URL generated:", data.url)
        setRedirectUrl(data.url)

        // Parse the URL to extract redirect_uri
        const url = new URL(data.url)
        const redirectUri = url.searchParams.get("redirect_uri")
        console.log("[v0] Redirect URI:", redirectUri)
      }
    } catch (err: any) {
      console.error("[v0] Exception:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const extractRedirectUri = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.searchParams.get("redirect_uri")
    } catch {
      return "Unable to parse"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Google OAuth Diagnostic Tool</CardTitle>
          <CardDescription>This tool will show you the EXACT redirect URI your app is using</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testGoogleAuth} disabled={loading} className="w-full">
            {loading ? "Testing..." : "Test Google OAuth"}
          </Button>

          {redirectUrl && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  ✓ OAuth URL Generated Successfully
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">The redirect URI being used is:</p>
                <code className="block mt-2 p-2 bg-white dark:bg-gray-900 rounded text-sm break-all">
                  {extractRedirectUri(redirectUrl)}
                </code>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📋 Action Required</h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  Add this EXACT URL to Google Cloud Console:
                </p>
                <ol className="list-decimal list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>Go to Google Cloud Console → Credentials</li>
                  <li>Click your OAuth 2.0 Client ID</li>
                  <li>Scroll to "Authorized redirect URIs"</li>
                  <li>Click "+ ADD URI"</li>
                  <li>
                    Paste:{" "}
                    <code className="bg-white dark:bg-gray-900 px-1 rounded">{extractRedirectUri(redirectUrl)}</code>
                  </li>
                  <li>Click "Save"</li>
                </ol>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  ⚠️ Your Current Configuration
                </h3>
                <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                  <p>
                    <strong>Client ID:</strong> 42273798921-umnfcnabil1rng7p505kdab8ej08m2vv.apps.googleusercontent.com
                  </p>
                  <p>
                    <strong>Client Secret:</strong> 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
                  </p>
                  <p className="mt-2">Make sure these are EXACTLY the same in:</p>
                  <ul className="list-disc list-inside ml-4">
                    <li>Supabase Dashboard → Authentication → Providers → Google</li>
                    <li>Google Cloud Console → Credentials → Your OAuth Client</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">✗ Error</h3>
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Current Environment</h3>
            <div className="text-sm space-y-1 font-mono">
              <p>
                <strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}
              </p>
              <p>
                <strong>Current Origin:</strong> {typeof window !== "undefined" ? window.location.origin : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
