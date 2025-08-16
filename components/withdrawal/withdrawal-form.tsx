"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BankDetailsForm } from "./bank-details-form"
import { WithdrawalSummary } from "./withdrawal-summary"
import type { WalletBalance, Transaction } from "@/types/wallet"
import { useToast } from "@/hooks/use-toast"
import { Wallet } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BankDetails {
  bankName: string
  accountNumber: string
  ifscCode: string
}

interface WithdrawalFormProps {
  balance: WalletBalance
  onWithdraw: (transaction: Transaction, newBalance: WalletBalance) => void
}

export const WithdrawalForm = ({ balance, onWithdraw }: WithdrawalFormProps) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<keyof WalletBalance>("INR")
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const validateBankDetails = () => {

    if (!bankDetails.bankName.trim()) {
      toast({
        title: "Bank Name Required",
        description: "Please enter your bank name",
        variant: "destructive",
      })
      return false
    }

    if (!bankDetails.accountNumber.trim()) {
      toast({
        title: "Account Number Required",
        description: "Please enter your account number",
        variant: "destructive",
      })
      return false
    }

    if (!bankDetails.ifscCode.trim()) {
      toast({
        title: "IFSC Code Required",
        description: "Please enter your IFSC code",
        variant: "destructive",
      })
      return false
    }
    return true
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
    if (balance[currency] < numAmount) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${currency} balance`,
        variant: "destructive",
      })
      return
    }

    if (!validateBankDetails()) {
      return
    }
    setIsLoading(true)

    // Update balance immediately
    const newBalance = { ...balance }
    newBalance[currency] -= numAmount

    // Create transaction
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: "withdraw",
      amount: numAmount,
      currency,
      status: "completed",
      date: new Date().toISOString(),
      description: `Withdrawal to ${bankDetails.bankName}`,
      bankDetails: { ...bankDetails },
    }
    onWithdraw(transaction, newBalance)

    toast({
      title: "Withdrawal Successful",
      description: `${numAmount} ${currency} has been withdrawn from your account.`,
    })
    setAmount("")
    setBankDetails({
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    })
    setIsLoading(false)
  }

  const handleButtonClick = () => {
    console.log("  Withdraw button clicked!")
    console.log("  Current form state - Amount:", amount, "Currency:", currency)
    console.log("  Bank details:", bankDetails)
  }

  const numAmount = Number.parseFloat(amount) || 0

  const getButtonDisabledState = () => {
    if (isLoading) return { disabled: true, tooltip: "Processing withdrawal..." }
    if (!amount || numAmount <= 0) return { disabled: true, tooltip: "Please enter a valid amount greater than 0" }
    if (!bankDetails.bankName.trim()) return { disabled: true, tooltip: "Please enter your bank name" }
    if (!bankDetails.accountNumber.trim()) return { disabled: true, tooltip: "Please enter your account number" }
    if (!bankDetails.ifscCode.trim()) return { disabled: true, tooltip: "Please enter your IFSC code" }
    if (balance[currency] < numAmount)
      return { disabled: true, tooltip: `Insufficient balance. Available: ${balance[currency].toFixed(2)} ${currency}` }
    return { disabled: false, tooltip: "" }
  }

  const buttonState = getButtonDisabledState()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Withdraw Funds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form id="withdrawal-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Amount and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Withdrawal Amount</Label>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={(value) => setCurrency(value as keyof WalletBalance)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹) - Available: {balance.INR.toFixed(2)}</SelectItem>
                    <SelectItem value="USD">USD ($) - Available: {balance.USD.toFixed(2)}</SelectItem>
                    <SelectItem value="EUR">EUR (€) - Available: {balance.EUR.toFixed(2)}</SelectItem>
                    <SelectItem value="GBP">GBP (£) - Available: {balance.GBP.toFixed(2)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Bank Details Form */}
      <BankDetailsForm bankDetails={bankDetails} onBankDetailsChange={setBankDetails} />

      {/* Withdrawal Summary */}
      {numAmount > 0 && bankDetails.bankName && (
        <WithdrawalSummary
          amount={numAmount}
          currency={currency}
          bankDetails={bankDetails}
          availableBalance={balance[currency]}
        />
      )}

      {/* Submit Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button
                type="submit"
                form="withdrawal-form"
                disabled={buttonState.disabled}
                className="w-full"
                size="lg"
                onClick={handleButtonClick}
              >
                {isLoading ? "Processing..." : "Withdraw Funds"}
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
    </div>
  )
}
