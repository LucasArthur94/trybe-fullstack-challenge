export type CurrencyFormProps = {
  usd: number
  brl: number
  eur: number
  cad: number
  getCurrencies: (baseValue: number) => Promise<void>
  updateCururency: () => void
}
