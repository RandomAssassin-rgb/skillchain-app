"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CredentialCard } from "@/components/credential-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCredentials } from "@/lib/credentials-store"

const recentActivities = [
  { action: "Credential Verified", issuer: "Stanford University", time: "2 hours ago", type: "verify" },
  { action: "New Credential Issued", issuer: "MIT Professional Education", time: "1 day ago", type: "issue" },
  { action: "Credential Shared", issuer: "Ethereum Foundation", time: "3 days ago", type: "share" },
  { action: "Profile Updated", issuer: "You", time: "1 week ago", type: "update" },
]

const achievements = [
  { title: "Early Adopter", description: "First 1000 users on SkillChain", icon: "🏆", unlocked: true },
  { title: "Verified Scholar", description: "Earned 3+ credentials", icon: "🎓", unlocked: true },
  { title: "Trust Builder", description: "Trust score above 95", icon: "⭐", unlocked: true },
  { title: "Blockchain Pioneer", description: "Complete 10 verifications", icon: "🚀", unlocked: false },
]

export default function Dashboard() {
  const [credentials, setCredentials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = getAllCredentials()
    const formattedCredentials = stored.map((c) => ({
      id: c.credential.id,
      title: c.credential.title,
      issuer: c.credential.issuer,
      issuedDate: c.credential.issuedDate,
      expiryDate: c.credential.expiryDate || "No Expiry",
      status: "Valid",
      field: c.credential.field,
      grade: "N/A",
      student: c.credential.recipientAddress,
      ipfsHash: c.ipfsCid,
    }))
    setCredentials(formattedCredentials)
    setIsLoading(false)
  }, [])

  const totalCredentials = credentials.length
  const validCredentials = credentials.filter((c) => c.status === "Valid").length
  const verificationCount = 47
  const trustScore = credentials.length > 0 ? 98 : 0

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Credentials Dashboard</h1>
            <p className="text-slate-400">Manage and share your verified educational achievements</p>
          </div>
          <Link href="/issuer">
            <Button className="gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105">
              + Issue New Credential
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">{totalCredentials}</div>
              <p className="text-xs text-slate-400">📜 All earned credentials</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">{validCredentials}</div>
              <p className="text-xs text-slate-400">✅ Currently valid</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">{verificationCount}</div>
              <p className="text-xs text-slate-400">🔍 Times verified</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Trust Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">{trustScore}%</div>
              <p className="text-xs text-slate-400">⭐ Credibility rating</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Credentials */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">My Credentials</h2>
              <Button
                asChild
                variant="outline"
                className="bg-slate-800/50 text-white border-slate-700 hover:bg-slate-700"
              >
                <Link href="/wallet">View All →</Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Loading credentials...</p>
              </div>
            ) : credentials.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">📜</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Credentials Yet</h3>
                  <p className="text-slate-400 mb-6">Start by issuing your first credential</p>
                  <Button asChild className="bg-gradient-to-r from-blue-500 to-emerald-500">
                    <Link href="/issuer">Issue Credential</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {credentials.map((credential) => (
                  <CredentialCard key={credential.id} credential={credential} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "verify"
                          ? "bg-blue-500"
                          : activity.type === "issue"
                            ? "bg-emerald-500"
                            : activity.type === "share"
                              ? "bg-purple-500"
                              : "bg-slate-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{activity.action}</p>
                      <p className="text-xs text-slate-400">{activity.issuer}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer hover:scale-105"
                        : "bg-slate-900/30 border-slate-700/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{achievement.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && <div className="text-emerald-500 text-sm font-bold">✓</div>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-slate-900/50 text-white border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/issuer">🎓 Issue Credential</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-slate-900/50 text-white border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/verify">🔍 Verify Credential</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-slate-900/50 text-white border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/wallet">💼 Manage Wallet</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
