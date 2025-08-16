"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WalletBalance } from "@/types/wallet"
import { formatCurrency } from "@/lib/exchange-rates"

interface BalanceCardProps {
  balance: WalletBalance
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const currencies = Object.entries(balance) as [keyof WalletBalance, number][]

  return (
    <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Total Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {currencies.map(([currency, amount]) => (
            <div key={currency} className="text-center">
              <p className="text-2xl font-bold">{formatCurrency(amount, currency)}</p>
              <p className="text-sm opacity-90">{currency}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
