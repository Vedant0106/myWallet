"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/types/wallet"
import { formatCurrency } from "@/lib/exchange-rates"
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react"

interface RecentTransactionsProps {
  transactions: Transaction[]
  onViewAll: () => void
}

export const RecentTransactions = ({ transactions, onViewAll }: RecentTransactionsProps) => {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "add":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "exchange":
        return <ArrowLeftRight className="h-4 w-4 text-blue-600" />
    }
  }

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
    }
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your recent transactions will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <button onClick={onViewAll} className="text-sm text-primary hover:underline">
          View All
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium capitalize">{transaction.type}</p>
                  <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(transaction.amount, transaction.currency)}
                  {transaction.toCurrency && <span className="text-muted-foreground"> → {transaction.toCurrency}</span>}
                </p>
                <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
