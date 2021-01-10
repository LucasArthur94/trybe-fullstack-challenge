export type UpdateCurrencyResProps = {
  message: string
}

export type UpdateCurrencyFormData = {
  currency: string
  value: string
}

export type UpdateCurrencyFormProps = {
  currentValue: string
  getCurrentValue: (currency: string) => Promise<void>
  customError: string
  setCustomError: (customError: string) => void
  updateCurrency: (
    formData: UpdateCurrencyFormData
  ) => Promise<UpdateCurrencyResProps>
  updateCurrencies: () => Promise<{
    savedUsd: number
    savedBrl: number
    savedEur: number
    savedCad: number
  }>
}
