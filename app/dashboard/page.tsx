"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BalanceCard } from "@/components/dashboard/balance-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { AddFundsModal } from "@/components/dashboard/add-funds-modal"
import { ClientOnly } from "@/components/client-only"
import type { WalletBalance, Transaction } from "@/types/wallet"
import { LogOut, User } from "lucide-react"

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user, logout } = useAuth()
  const { balance, updateBalance, addTransaction, getRecentTransactions } = useWallet()
  const [showAddFunds, setShowAddFunds] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  const handleAddFunds = (amount: number, currency: keyof WalletBalance) => {
    const newBalance = { ...balance }
    newBalance[currency] += amount
    updateBalance(newBalance)

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: "add",
      amount,
      currency,
      status: "completed",
      date: new Date().toISOString(),
      description: `Added ${amount} ${currency} to wallet`,
    }
    addTransaction(transaction)

    router.push("/") // Removed setTimeout delay, redirect immediately
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      ) : !isAuthenticated ? null : (
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold">My Wallet</h1>
                  <p className="text-sm text-muted-foreground">{user?.mobile}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Balance Card */}
            <BalanceCard balance={balance} />

            {/* Quick Actions */}
            <QuickActions
              onAddFunds={() => setShowAddFunds(true)}
              onWithdraw={() => {
                router.push("/withdraw")
              }}
              onExchange={() => {
                router.push("/exchange")
              }}
              onTransactions={() => router.push("/transactions")}
            />

            {/* Recent Transactions */}
            <RecentTransactions transactions={getRecentTransactions()} onViewAll={() => router.push("/transactions")} />
          </main>

          {/* Add Funds Modal */}
          <AddFundsModal
            isOpen={showAddFunds}
            onClose={() => setShowAddFunds(false)}
            balance={balance}
            onAddFunds={handleAddFunds}
          />
        </div>
      )}
    </ClientOnly>
  )
}
