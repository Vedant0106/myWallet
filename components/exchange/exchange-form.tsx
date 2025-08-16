"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrencySelector } from "./currency-selector"
import { ExchangeCalculator } from "./exchange-calculator"
import type { WalletBalance, Transaction } from "@/types/wallet"
import { convertCurrency } from "@/lib/exchange-rates"
import { useToast } from "@/hooks/use-toast"
import { ArrowUpDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ExchangeFormProps {
  balance: WalletBalance
  onExchange: (transaction: Transaction, newBalance: WalletBalance) => void
}

export const ExchangeForm = ({ balance, onExchange }: ExchangeFormProps) => {
  const [fromCurrency, setFromCurrency] = useState<keyof WalletBalance>("INR")
  const [toCurrency, setToCurrency] = useState<keyof WalletBalance>("USD")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSwapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      })
      return
    }

    if (fromCurrency === toCurrency) {
      toast({
        title: "Same Currency",
        description: "Please select different currencies for exchange",
        variant: "destructive",
      })
      return
    }

    if (balance[fromCurrency] < numAmount) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${fromCurrency} balance`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    const convertedAmount = convertCurrency(numAmount, fromCurrency, toCurrency)

    // Update balance
    const newBalance = { ...balance }
    newBalance[fromCurrency] -= numAmount
    newBalance[toCurrency] += convertedAmount

    // Create transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: "exchange",
      amount: numAmount,
      currency: fromCurrency,
      toCurrency,
      status: "completed",
      date: new Date().toISOString(),
      description: `Exchanged ${numAmount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`,
    }

    onExchange(transaction, newBalance)

    toast({
      title: "Exchange Successful",
      description: `Successfully exchanged ${numAmount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}`,
    })

    setAmount("")
    setIsLoading(false)
  }

  const numAmount = Number.parseFloat(amount) || 0

  const getButtonDisabledState = () => {
    if (isLoading) return { disabled: true, tooltip: "Processing exchange..." }
    if (!amount || numAmount <= 0) return { disabled: true, tooltip: "Please enter a valid amount greater than 0" }
    if (fromCurrency === toCurrency)
      return { disabled: true, tooltip: "Please select different currencies for exchange" }
    if (balance[fromCurrency] < numAmount)
      return {
        disabled: true,
        tooltip: `Insufficient balance. Available: ${balance[fromCurrency].toFixed(2)} ${fromCurrency}`,
      }
    return { disabled: false, tooltip: "" }
  }

  const buttonState = getButtonDisabledState()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Currency Exchange</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* From Currency */}
            <CurrencySelector value={fromCurrency} onValueChange={setFromCurrency} balance={balance} label="From" />

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button type="button" variant="outline" size="sm" onClick={handleSwapCurrencies}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            {/* To Currency */}
            <CurrencySelector value={toCurrency} onValueChange={setToCurrency} balance={balance} label="To" />

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount to Exchange</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                required
              />
              <p className="text-sm text-muted-foreground">
                Available: {balance[fromCurrency].toFixed(2)} {fromCurrency}
              </p>
            </div>

            {/* Submit Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <Button type="submit" disabled={buttonState.disabled} className="w-full">
                      {isLoading ? "Processing Exchange..." : "Exchange Currency"}
                    </Button>
                  </div>
                </TooltipTrigger>
                {buttonState.disabled && (
                  <TooltipContent>
                    <p>{buttonState.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </form>
        </CardContent>
      </Card>

      {/* Exchange Calculator */}
      {numAmount > 0 && <ExchangeCalculator fromCurrency={fromCurrency} toCurrency={toCurrency} amount={numAmount} />}
    </div>
  )
}
