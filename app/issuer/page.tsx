import { DashboardHeader } from "@/components/dashboard-header"
import { IssuerForm } from "@/components/issuer-form"
import { IssuerStats } from "@/components/issuer-stats"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function IssuerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader />

      <div className="text-sm font-semibold text-white">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-8 text-white">
            ← Back to Dashboard
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h1 className="text-3xl font-bold text-white mb-2">Issue Credentials</h1>
              <p className="text-slate-400 mb-8">Create and issue verifiable educational credentials to students</p>
              <IssuerForm />
            </div>
          </div>

          <div className="space-y-6">
            <IssuerStats />
          </div>
        </div>
      </div>
    </main>
  )
}
