import React, { FC } from 'react'
import { useCurrencyForm } from './currency-form.hook'
import { CurrencyFormUI } from './currency-form.ui'

export const CurrencyForm: FC = () => {
  const {
    usd,
    brl,
    eur,
    cad,
    getCurrencies,
    updateCurrency,
  } = useCurrencyForm()

  return (
    <CurrencyFormUI
      usd={usd}
      brl={brl}
      eur={eur}
      cad={cad}
      getCurrencies={getCurrencies}
      updateCurrency={updateCurrency}
    />
  )
}
