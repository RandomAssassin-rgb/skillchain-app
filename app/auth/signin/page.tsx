"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignIn() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SkillChain</h1>
          <p className="text-slate-400">Sign in with your credentials</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          {/* Google OAuth Button - Removed signIn and lucide imports */}
          <Button className="w-full bg-white hover:bg-slate-100 text-black gap-2 font-semibold" disabled>
            🔐 Continue with Google (Configure in Vars)
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or</span>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 font-semibold" disabled>
            👛 Connect Wallet (Coming Soon)
          </Button>

          <p className="text-sm text-slate-400 text-center">By signing in, you agree to our Terms of Service</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
