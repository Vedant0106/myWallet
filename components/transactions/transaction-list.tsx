"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/types/wallet"
import { formatCurrency } from "@/lib/exchange-rates"
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from "lucide-react"

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "add":
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="h-5 w-5 text-red-600" />
      case "exchange":
        return <ArrowLeftRight className="h-5 w-5 text-blue-600" />
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

  const getTypeLabel = (type: Transaction["type"]) => {
    switch (type) {
      case "add":
        return "Add Funds"
      case "withdraw":
        return "Withdraw"
      case "exchange":
        return "Exchange"
    }
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p className="text-muted-foreground">No transactions found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your filters or make your first transaction
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">All Transactions ({transactions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {getTransactionIcon(transaction.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{getTypeLabel(transaction.type)}</p>
                    <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()} at{" "}
                    {new Date(transaction.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">{formatCurrency(transaction.amount, transaction.currency)}</p>
                {transaction.toCurrency && <p className="text-sm text-muted-foreground">→ {transaction.toCurrency}</p>}
                {transaction.bankDetails && (
                  <p className="text-xs text-muted-foreground">{transaction.bankDetails.bankName}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
