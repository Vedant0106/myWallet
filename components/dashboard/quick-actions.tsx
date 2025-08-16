"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus, ArrowLeftRight, CreditCard } from "lucide-react"

interface QuickActionsProps {
  onAddFunds: () => void
  onWithdraw: () => void
  onExchange: () => void
  onTransactions: () => void
}

export const QuickActions = ({ onAddFunds, onWithdraw, onExchange, onTransactions }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onAddFunds} className="flex flex-col items-center gap-2 h-auto py-4">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Add Funds</span>
          </Button>
          <Button
            onClick={onWithdraw}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
          >
            <Minus className="h-5 w-5" />
            <span className="text-sm">Withdraw</span>
          </Button>
          <Button onClick={onExchange} variant="secondary" className="flex flex-col items-center gap-2 h-auto py-4">
            <ArrowLeftRight className="h-5 w-5" />
            <span className="text-sm">Exchange</span>
          </Button>
          <Button
            onClick={onTransactions}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-transparent"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm">Transactions</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
