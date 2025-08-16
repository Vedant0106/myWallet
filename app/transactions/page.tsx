"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TransactionFilters, type FilterState } from "@/components/transactions/transaction-filters"
import { ExportButtons } from "@/components/transactions/export-buttons"
import { TransactionList } from "@/components/transactions/transaction-list"
import { ArrowLeft } from "lucide-react"

export default function TransactionsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const { transactions } = useWallet()
  const router = useRouter()
  const [filters, setFilters] = useState<FilterState>({
    dateFrom: "",
    dateTo: "",
    type: "all",
    status: "all",
    search: "",
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Date filter
      if (filters.dateFrom) {
        const transactionDate = new Date(transaction.date)
        const fromDate = new Date(filters.dateFrom)
        if (transactionDate < fromDate) return false
      }

      if (filters.dateTo) {
        const transactionDate = new Date(transaction.date)
        const toDate = new Date(filters.dateTo)
        toDate.setHours(23, 59, 59, 999) // End of day
        if (transactionDate > toDate) return false
      }

      // Type filter
      if (filters.type && filters.type !== "all" && transaction.type !== filters.type) {
        return false
      }

      // Status filter
      if (filters.status && filters.status !== "all" && transaction.status !== filters.status) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const searchableText = [
          transaction.description,
          transaction.type,
          transaction.currency,
          transaction.toCurrency,
          transaction.amount.toString(),
        ]
          .join(" ")
          .toLowerCase()

        if (!searchableText.includes(searchTerm)) {
          return false
        }
      }

      return true
    })
  }, [transactions, filters])

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
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Transaction History</h1>
              <p className="text-sm text-muted-foreground">View and manage all your wallet transactions</p>
            </div>
          </div>
          <ExportButtons transactions={filteredTransactions} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Filters */}
        <TransactionFilters
          onFilterChange={setFilters}
          totalTransactions={transactions.length}
          filteredCount={filteredTransactions.length}
        />

        {/* Transaction List */}
        <TransactionList transactions={filteredTransactions} />
      </main>
    </div>
  )
}
