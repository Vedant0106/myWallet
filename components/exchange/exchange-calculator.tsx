"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WalletBalance } from "@/types/wallet"
import { convertCurrency, formatCurrency, EXCHANGE_RATES } from "@/lib/exchange-rates"

interface ExchangeCalculatorProps {
  fromCurrency: keyof WalletBalance
  toCurrency: keyof WalletBalance
  amount: number
}

export const ExchangeCalculator = ({ fromCurrency, toCurrency, amount }: ExchangeCalculatorProps) => {
  const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency)
  const rate = EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Exchange Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">You send:</span>
          <span className="font-semibold text-lg">{formatCurrency(amount, fromCurrency)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">You receive:</span>
          <span className="font-semibold text-lg text-green-600">{formatCurrency(convertedAmount, toCurrency)}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Exchange rate:</span>
            <Badge variant="secondary">
              1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
            </Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">Exchange rates are fixed for demo purposes</div>
      </CardContent>
    </Card>
  )
}
