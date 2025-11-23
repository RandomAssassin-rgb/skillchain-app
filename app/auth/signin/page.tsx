"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${redirectUrl}?next=/dashboard`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        console.error("OAuth error:", error)
        setError(error.message)
        setLoading(false)
      }
      // Note: User will be redirected by Supabase, so we don't set loading to false here
    } catch (error) {
      console.error("Unexpected error:", error)
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  const handleMetaMaskConnect = async () => {
    setLoading(true)
    setError(null)
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts && accounts.length > 0) {
          localStorage.setItem("walletAddress", accounts[0])
          localStorage.setItem("authMethod", "metamask")

          // Force immediate redirect
          window.location.href = "/dashboard"
        } else {
          setError("No accounts found in MetaMask")
          setLoading(false)
        }
      } else {
        setError("Please install MetaMask to connect your wallet")
        setLoading(false)
      }
    } catch (error: unknown) {
      console.error("MetaMask connection error:", error)
      setError(error instanceof Error ? error.message : "Failed to connect wallet")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SkillChain</h1>
          <p className="text-slate-400">Sign in with your credentials</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-lg p-3 text-sm">{error}</div>
          )}

          <Button
            className="w-full h-12 bg-white hover:bg-slate-100 text-black font-semibold transition-all duration-300 hover:scale-105"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or</span>
            </div>
          </div>

          <Button
            onClick={handleMetaMaskConnect}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 text-white hover:bg-orange-500/20 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#F6851B" />
            </svg>
            {loading ? "Connecting..." : "Connect with MetaMask"}
          </Button>

          <p className="text-sm text-slate-400 text-center">By signing in, you agree to our Terms of Service</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
