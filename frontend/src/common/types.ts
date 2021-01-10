export const CURRENCIES = ['USD', 'BRL', 'EUR', 'CAD', 'BTC'] as const

export type User = {
  email: string
  password: string
  lastValidToken: string
}

export type Currency = typeof CURRENCIES[number]

export type Currencies = Record<Currency, string>

// https://app.quicktype.io/#l=TypeScript
export type Bpi = {
  code: Currency
  rate: string
  description: string
  // eslint-disable-next-line camelcase
  rate_float: number
}

export type Time = {
  updated: string
  updatedISO: Date
  updateduk: string
}

export type CryptoResult = {
  time: Time
  disclaimer: string
  bpi: Record<Currency, Bpi>
}
