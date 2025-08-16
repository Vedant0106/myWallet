"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

interface BankDetails {
  bankName: string
  accountNumber: string
  ifscCode: string
}

interface BankDetailsFormProps {
  bankDetails: BankDetails
  onBankDetailsChange: (details: BankDetails) => void
}

export const BankDetailsForm = ({ bankDetails, onBankDetailsChange }: BankDetailsFormProps) => {
  const handleChange = (field: keyof BankDetails, value: string) => {
    onBankDetailsChange({
      ...bankDetails,
      [field]: value,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Bank Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            placeholder="Enter bank name (e.g., State Bank of India)"
            value={bankDetails.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            placeholder="Enter account number"
            value={bankDetails.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            placeholder="Enter IFSC code (e.g., SBIN0001234)"
            value={bankDetails.ifscCode}
            onChange={(e) => handleChange("ifscCode", e.target.value.toUpperCase())}
            maxLength={11}
            required
          />
          <p className="text-xs text-muted-foreground">11-character IFSC code for your bank branch</p>
        </div>
      </CardContent>
    </Card>
  )
}
