import Router from 'next/router'
import { useState } from 'react'
import { cryptoGet } from '../../common/api'
import { useCryptoContext } from '../common/context.hook'
import { CurrencyFormProps } from './currency-form.types'

export const useCurrencyForm = (): CurrencyFormProps => {
  const [usd, setUsd] = useState(0)
  const [brl, setBrl] = useState(0)
  const [eur, setEur] = useState(0)
  const [cad, setCad] = useState(0)

  const {
    usdRate,
    brlRate,
    eurRate,
    cadRate,
    setUsdRate,
    setBrlRate,
    setEurRate,
    setCadRate,
  } = useCryptoContext()

  const updateCurrencies = async () => {
    try {
      const data = await cryptoGet()

      if (!data) {
        throw new Error('Error at fetch currencies')
      }

      const currencies = data.bpi

      setUsdRate(currencies.USD.rate_float)
      setBrlRate(currencies.BRL.rate_float)
      setEurRate(currencies.EUR.rate_float)
      setCadRate(currencies.CAD.rate_float)

      return {
        savedUsd: currencies.USD.rate_float,
        savedBrl: currencies.BRL.rate_float,
        savedEur: currencies.EUR.rate_float,
        savedCad: currencies.CAD.rate_float,
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCurrencies = async (baseValue: number) => {
    if (!usdRate || !brlRate || !eurRate || !cadRate) {
      const savedCurrencies = await updateCurrencies()

      setUsd(savedCurrencies.savedUsd * baseValue)
      setBrl(savedCurrencies.savedBrl * baseValue)
      setEur(savedCurrencies.savedEur * baseValue)
      setCad(savedCurrencies.savedCad * baseValue)

      return
    }

    setUsd(usdRate * baseValue)
    setBrl(brlRate * baseValue)
    setEur(eurRate * baseValue)
    setCad(cadRate * baseValue)
  }

  const updateCurrency = () => {
    Router.push('/update-currency')
  }

  return { usd, brl, eur, cad, getCurrencies, updateCurrency }
}
