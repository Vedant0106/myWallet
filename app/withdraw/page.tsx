"use client"

import { useAuth } from "@/hooks/use-auth"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { WithdrawalForm } from "@/components/withdrawal/withdrawal-form"
import type { WalletBalance, Transaction } from "@/types/wallet"
import { ArrowLeft, CreditCard } from "lucide-react"

export default function WithdrawPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { balance, updateBalance, addTransaction } = useWallet()
  const router = useRouter()

  useEffect(() => {
   
    if (!isLoading && !isAuthenticated) {
    
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  const handleWithdraw = (transaction: Transaction, newBalance: WalletBalance) => {
    updateBalance(newBalance)
    addTransaction(transaction)
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                console.log("Navigating back to homepage from withdraw")
                router.push("/")
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
            
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <h1 className="text-xl font-semibold">Withdraw Funds</h1>
                <p className="text-sm text-muted-foreground">Transfer money to your bank account</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4 py-8">
        <WithdrawalForm balance={balance} onWithdraw={handleWithdraw} />
      </main>
    </div>
  )
}
