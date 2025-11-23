import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const features = [
    {
      title: "Immutable Records",
      description:
        "Credentials stored on blockchain are impossible to forge or tamper with. Your achievements are permanently secured.",
    },
    {
      title: "Instant Verification",
      description: "Verify credentials in seconds using QR codes or token IDs. No waiting, no intermediaries needed.",
    },
    {
      title: "Self-Sovereign",
      description: "You control your credentials with Web3 wallets. Institutions don't own your data—you do.",
    },
  ]

  const useCases = [
    {
      title: "Students",
      description: "Own your educational achievements with verifiable on-chain credentials",
      actions: ["Issue credentials", "Share QR codes", "Build portfolio"],
    },
    {
      title: "Institutions",
      description: "Issue tamper-proof credentials at scale without intermediaries",
      actions: ["Batch issuance", "Manage issuers", "Track history"],
    },
    {
      title: "Employers",
      description: "Instantly verify candidate credentials on the blockchain",
      actions: ["Quick verification", "No forgeries", "Instant checks"],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            SkillChain
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-sm font-medium text-emerald-400">Decentralized Credentials</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Your Skills, On The Blockchain
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Issue, verify, and manage educational credentials on the blockchain. Your achievements are permanently
              recorded, instantly verifiable, and completely in your control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
                >
                  Get Started →
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur-2xl opacity-20"></div>
            <div className="relative bg-slate-800/50 rounded-lg p-8 border border-slate-700 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="h-40 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-lg border border-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💰</div>
                    <p className="text-sm text-slate-400">Credential NFT</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-slate-700/50 rounded border border-slate-700"></div>
                  <div className="h-12 bg-slate-700/50 rounded border border-slate-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SkillChain?</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A complete platform for issuing and verifying credentials with blockchain security and instant
              verification
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 border-t border-slate-700 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">For Everyone</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-blue-500/50 transition-colors"
              >
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-slate-400 mb-6">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.actions.map((action, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands issuing and verifying credentials on the blockchain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
              >
                Explore App →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm">SkillChain © 2025. All rights reserved.</div>
            <div className="flex gap-6 text-slate-400 text-sm mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
