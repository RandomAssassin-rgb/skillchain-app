"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 border border-red-500/20 rounded-lg p-8 space-y-6 text-center">
          <div className="text-4xl">⚠️</div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Authentication Error</h1>
            <p className="text-slate-400">{error || "Something went wrong during sign in"}</p>
          </div>
          <Link href="/auth/signin">
            <Button className="w-full">Try Again</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
