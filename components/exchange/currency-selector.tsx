"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { WalletBalance } from "@/types/wallet"
import { formatCurrency } from "@/lib/exchange-rates"

interface CurrencySelectorProps {
  value: keyof WalletBalance
  onValueChange: (value: keyof WalletBalance) => void
  balance: WalletBalance
  label: string
  disabled?: boolean
}

export const CurrencySelector = ({ value, onValueChange, balance, label, disabled = false }: CurrencySelectorProps) => {
  const currencies = [
    { code: "INR" as const, name: "Indian Rupee", symbol: "₹" },
    { code: "USD" as const, name: "US Dollar", symbol: "$" },
    { code: "EUR" as const, name: "Euro", symbol: "€" },
    { code: "GBP" as const, name: "British Pound", symbol: "£" },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="h-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {currency.symbol}
                  </div>
                  <div>
                    <p className="font-medium">{currency.code}</p>
                    <p className="text-sm text-muted-foreground">{currency.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(balance[currency.code], currency.code)}</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
