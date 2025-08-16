"use client"

import { useState, useEffect } from "react"
import type { WalletBalance, Transaction } from "@/types/wallet"
import { storage } from "@/lib/storage"
import { formatCurrency } from "@/lib/exchange-rates"

export const useWallet = () => {
  const [balance, setBalance] = useState<WalletBalance>({ INR: 1000, USD: 0, EUR: 0, GBP: 0 })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedBalance = storage.getBalance()
    const storedTransactions = storage.getTransactions()
    setBalance(storedBalance)
    setTransactions(storedTransactions)
    setIsLoading(false)
  }, [])

  const updateBalance = (newBalance: WalletBalance) => {
    console.log("  useWallet - Updating balance", { oldBalance: balance, newBalance })
    setBalance(newBalance)
    storage.setBalance(newBalance)
    console.log("  useWallet - Balance updated in state and storage")
  }

  const addTransaction = (transaction: Transaction) => {
    console.log("  useWallet - Adding transaction", transaction)
    storage.addTransaction(transaction)
    setTransactions((prev) => {
      const newTransactions = [transaction, ...prev]
      console.log("  useWallet - Updated transactions list", newTransactions.length)
      return newTransactions
    })
  }

  const getRecentTransactions = (limit = 5) => {
    return transactions.slice(0, limit)
  }

  const getFormattedBalance = (currency: keyof WalletBalance) => {
    return formatCurrency(balance[currency], currency)
  }

  return {
    balance,
    transactions,
    isLoading,
    updateBalance,
    addTransaction,
    getRecentTransactions,
    getFormattedBalance,
  }
}
