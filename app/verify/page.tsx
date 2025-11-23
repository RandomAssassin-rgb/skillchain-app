import { Suspense } from "react"
import { VerifierClient } from "@/components/verifier-client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function VerifyContent() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 md:p-12">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="h-12 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      }
    >
      <VerifierClient />
    </Suspense>
  )
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            SkillChain
          </div>
          <div className="text-sm text-slate-400">Credential Verifier</div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 text-slate-300 hover:text-white">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      <VerifyContent />
    </main>
  )
}
