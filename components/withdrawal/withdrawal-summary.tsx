"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WalletBalance } from "@/types/wallet"
import { formatCurrency } from "@/lib/exchange-rates"

interface BankDetails {
  bankName: string
  accountNumber: string
  ifscCode: string
}

interface WithdrawalSummaryProps {
  amount: number
  currency: keyof WalletBalance
  bankDetails: BankDetails
  availableBalance: number
}

export const WithdrawalSummary = ({ amount, currency, bankDetails, availableBalance }: WithdrawalSummaryProps) => {
  const remainingBalance = availableBalance - amount

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Withdrawal Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Withdrawal amount:</span>
            <span className="font-semibold text-lg">{formatCurrency(amount, currency)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Available balance:</span>
            <span className="font-medium">{formatCurrency(availableBalance, currency)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Remaining balance:</span>
            <span className={`font-medium ${remainingBalance < 0 ? "text-red-600" : "text-green-600"}`}>
              {formatCurrency(remainingBalance, currency)}
            </span>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-medium">Bank Details</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-muted-foreground">Bank:</span> {bankDetails.bankName}
            </p>
            <p>
              <span className="text-muted-foreground">Account:</span> ****{bankDetails.accountNumber.slice(-4)}
            </p>
            <p>
              <span className="text-muted-foreground">IFSC:</span> {bankDetails.ifscCode}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <Badge variant={remainingBalance >= 0 ? "default" : "destructive"}>
            {remainingBalance >= 0 ? "Sufficient Balance" : "Insufficient Balance"}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground">Processing time: 1 business days</div>
      </CardContent>
    </Card>
  )
}
