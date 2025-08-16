import type { User, WalletBalance, Transaction } from "@/types/wallet"

const STORAGE_KEYS = {
  USER: "wallet_user",
  BALANCE: "wallet_balance",
  TRANSACTIONS: "wallet_transactions",
} as const

export const storage = {
  // User management
  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  clearUser: (): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  // Balance management
  getBalance: (): WalletBalance => {
    if (typeof window === "undefined") {
      return { INR: 1000, USD: 0, EUR: 0, GBP: 0 }
    }
    const balance = localStorage.getItem(STORAGE_KEYS.BALANCE)
    return balance ? JSON.parse(balance) : { INR: 1000, USD: 0, EUR: 0, GBP: 0 }
  },

  setBalance: (balance: WalletBalance): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.BALANCE, JSON.stringify(balance))
  },

  // Transaction management
  getTransactions: (): Transaction[] => {
    if (typeof window === "undefined") return []
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
    return transactions ? JSON.parse(transactions) : []
  },

  addTransaction: (transaction: Transaction): void => {
    if (typeof window === "undefined") return
    const transactions = storage.getTransactions()
    transactions.unshift(transaction)
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
  },

  setTransactions: (transactions: Transaction[]): void => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
  },
}
