# Digital Wallet Application

A modern, responsive digital wallet application built with Next.js, TypeScript, and Tailwind CSS. This application provides a complete financial management solution with multi-currency support, transaction tracking, and secure authentication.

-------------
[Deployment](https://my-wallet-theta-neon.vercel.app)
## 🚀 Features

### Authentication
- **Mobile OTP Verification**: Secure login using mobile number and OTP (dummy implementation)
- **Session Management**: Persistent authentication using localStorage
- **Auto-redirect**: Seamless navigation between authenticated and non-authenticated states

### Wallet Management
- **Multi-Currency Support**: INR, USD, EUR, GBP with real-time balance display
- **Add Funds**: Instant fund addition with transaction recording
- **Balance Overview**: Clean, card-based balance display with gradient styling
- **Currency Switching**: Easy currency selection for all operations

### Transaction System
- **Complete Transaction History**: View all wallet activities with detailed information
- **Advanced Filtering**: Filter by date range, transaction type, and status
- **Search Functionality**: Quick search through transaction descriptions
- **Export Options**: Export transaction data to CSV, PDF, and Excel formats
- **Real-time Updates**: Instant transaction recording and balance updates

### Currency Exchange
- **Multi-Currency Exchange**: Convert between supported currencies
- **Fixed Exchange Rates**: Reliable conversion rates for all currency pairs
- **Balance Validation**: Prevents overdrafts with insufficient balance checks
- **Instant Processing**: Real-time currency conversion and balance updates

### Withdrawal System
- **Bank Integration**: Dummy bank details form (bank name, account number, IFSC)
- **Balance Deduction**: Automatic balance reduction upon withdrawal
- **Transaction Recording**: Complete audit trail for all withdrawals
- **Validation**: Form validation with helpful error messages

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **State Management**: React hooks with localStorage persistence
- **Form Handling**: React Hook Form with validation
- **Notifications**: Toast notifications for user feedback

## 🎯 Usage Guide

### Getting Started
1. **Login**: Enter any mobile number and use OTP `1234` to authenticate
2. **Dashboard**: View your multi-currency balances and recent transactions
3. **Add Funds**: Click "Add Funds" to deposit money into any currency
4. **Exchange**: Convert between currencies using the exchange feature
5. **Withdraw**: Transfer funds to bank accounts using the withdrawal system
6. **Transactions**: View complete transaction history with filtering options

### Default Test Data
- **Mobile Number**: Any 10-digit number
- **OTP**: `1234` (dummy verification)
- **Initial Balances**: 
  - INR: ₹1,500
  - USD: $100
  - EUR: €75
  - GBP: £50

### Exchange Rates (Fixed)
- **USD to INR**: 83.0
- **EUR to INR**: 91.0
- **GBP to INR**: 105.0
- **USD to EUR**: 0.91
- **USD to GBP**: 0.79
- **EUR to GBP**: 0.87

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard page
│   ├── exchange/                # Currency exchange page
│   ├── transactions/            # Transaction history page
│   ├── withdraw/                # Withdrawal page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage/Login
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard-specific components
│   ├── exchange/                # Exchange functionality
│   ├── transactions/            # Transaction management
│   ├── withdrawal/              # Withdrawal components
│   ├── ui/                      # shadcn/ui components
│   └── client-only.tsx          # Hydration helper
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts              # Authentication hook
│   ├── use-wallet.ts            # Wallet management hook
│   └── use-toast.ts             # Toast notifications
├── lib/                         # Utility libraries
│   ├── storage.ts               # localStorage utilities
│   ├── exchange-rates.ts        # Currency conversion
│   ├── export-utils.ts          # Data export functionality
│   └── utils.ts                 # General utilities
└── types/                       # TypeScript type definitions
    └── wallet.ts                # Wallet-related types
```

## 💾 Data Structure

### User Data
```typescript
interface User {
  id: string
  mobile: string
  isVerified: boolean
}
```

### Wallet Balance
```typescript
interface WalletBalance {
  INR: number
  USD: number
  EUR: number
  GBP: number
}
```

### Transaction
```typescript
interface Transaction {
  id: string
  type: 'add_funds' | 'withdraw' | 'exchange'
  amount: number
  currency: Currency
  description: string
  status: 'completed' | 'pending' | 'failed'
  timestamp: string
  metadata?: {
    fromCurrency?: Currency
    toCurrency?: Currency
    exchangeRate?: number
    bankDetails?: BankDetails
  }
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep charcoal (#333333) for trust and professionalism
- **Secondary**: Vibrant blue (#4F46E5) for interactive elements
- **Accent**: Warm orange (#F59E0B) for highlights and success states
- **Neutrals**: Clean grays and whites for backgrounds and text

### Typography
- **Headings**: Geist Sans (400, 600, 700 weights)
- **Body Text**: Geist Sans (400, 500 weights)
- **Code**: Geist Mono for technical elements

### Layout Principles
- **Mobile-first**: Responsive design starting from mobile screens
- **Flexbox**: Primary layout method for most components
- **Generous Spacing**: Minimum 16px between sections
- **Consistent Alignment**: Left-aligned content with centered actions

## 🔧 Configuration

### Environment Variables
This application uses localStorage for data persistence and doesn't require external APIs or environment variables for basic functionality.

### Customization
- **Exchange Rates**: Modify `lib/exchange-rates.ts` to update currency conversion rates
- **Supported Currencies**: Update `types/wallet.ts` to add or remove currencies
- **Styling**: Customize colors in `app/globals.css` using CSS custom properties

