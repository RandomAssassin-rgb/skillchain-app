"use client"

import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/wallet-button"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
        >
          SkillChain
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm">
              Dashboard
            </Link>
            <Link href="/wallet" className="text-slate-300 hover:text-white transition-colors text-sm">
              My Wallet
            </Link>
            <Link href="/issuer" className="text-slate-300 hover:text-white transition-colors text-sm">
              Issuer
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <WalletButton />
            <Link href="/">
              <Button variant="outline" size="sm">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
