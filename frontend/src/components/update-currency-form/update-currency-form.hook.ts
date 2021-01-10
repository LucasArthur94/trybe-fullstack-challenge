import Router from 'next/router'
import { useState } from 'react'
import { cryptoGet, cryptoPost } from '../../common/api'
import { useCryptoContext } from '../common/context.hook'
import {
  UpdateCurrencyFormData,
  UpdateCurrencyFormProps,
} from './update-currency-form.types'

const calculateValue = (coinValue: number, usdValue: number) =>
  (coinValue / usdValue).toFixed(2)

export const useUpdateCurrencyForm = (): UpdateCurrencyFormProps => {
  const [currentValue, setCurrentValue] = useState('')
  const [customError, setCustomError] = useState('')

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

  const getCurrentValue = async (currency: string) => {
    if (!usdRate || !brlRate || !eurRate || !cadRate) {
      const savedCurrencies = await updateCurrencies()

      const currenciesTable = {
        BRL: `R$ ${calculateValue(
          savedCurrencies.savedBrl,
          savedCurrencies.savedUsd
        )}`,
        EUR: `€$ ${calculateValue(
          savedCurrencies.savedEur,
          savedCurrencies.savedUsd
        )}`,
        CAD: `C$ ${calculateValue(
          savedCurrencies.savedCad,
          savedCurrencies.savedUsd
        )}`,
      }

      setCurrentValue(currenciesTable[currency])

      return
    }

    const currenciesTable = {
      BRL: `R$ ${calculateValue(brlRate, usdRate)}`,
      EUR: `€$ ${calculateValue(eurRate, usdRate)}`,
      CAD: `C$ ${calculateValue(cadRate, usdRate)}`,
    }

    setCurrentValue(currenciesTable[currency])
  }

  const updateCurrency = async (formData: UpdateCurrencyFormData) => {
    try {
      const data = await cryptoPost({
        ...formData,
        value: parseFloat(formData.value),
      })

      if (!data.message) {
        throw new Error('Error at update single currency')
      }
      return data
    } catch (error) {
      console.error(error)
      setCustomError('Erro ao atualizar cotação')
      return {
        message: '',
      }
    }
  }

  return {
    currentValue,
    getCurrentValue,
    customError,
    setCustomError,
    updateCurrency,
    updateCurrencies,
  }
}
