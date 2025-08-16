import type { ExchangeRates } from "@/types/wallet"

// Fixed exchange rates as per requirements
export const EXCHANGE_RATES: ExchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.009,
}

export const convertCurrency = (
  amount: number,
  fromCurrency: keyof ExchangeRates,
  toCurrency: keyof ExchangeRates,
): number => {
  // Convert to INR first, then to target currency
  const inrAmount = amount / EXCHANGE_RATES[fromCurrency]
  return inrAmount * EXCHANGE_RATES[toCurrency]
}

export const formatCurrency = (amount: number, currency: keyof ExchangeRates): string => {
  const symbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  }

  return `${symbols[currency]}${amount.toFixed(2)}`
}
