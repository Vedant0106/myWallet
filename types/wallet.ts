export interface User {
  id: string
  mobile: string
  isVerified: boolean
  createdAt: string
}

export interface WalletBalance {
  INR: number
  USD: number
  EUR: number
  GBP: number
}

export interface Transaction {
  id: string
  type: "add" | "withdraw" | "exchange"
  amount: number
  currency: keyof WalletBalance
  toCurrency?: keyof WalletBalance
  status: "completed" | "pending" | "failed"
  date: string
  description: string
  bankDetails?: {
    bankName: string
    accountNumber: string
    ifscCode: string
  }
}

export interface ExchangeRates {
  INR: number
  USD: number
  EUR: number
  GBP: number
}
