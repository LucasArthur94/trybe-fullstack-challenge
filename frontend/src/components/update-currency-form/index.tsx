import React, { FC } from 'react'
import { UpdateCurrencyFormUI } from './update-currency-form.ui'
import { useUpdateCurrencyForm } from './update-currency-form.hook'
import { UpdateCurrencyFormData } from './update-currency-form.types'
import Router from 'next/router'

export const UpdateCurrencyForm: FC = () => {
  const {
    customError,
    setCustomError,
    currentValue,
    getCurrentValue,
    updateCurrency,
    updateCurrencies,
  } = useUpdateCurrencyForm()

  const backToIndex = () => {
    Router.back()
  }

  const onSubmit = async (formData: UpdateCurrencyFormData) => {
    const { message } = await updateCurrency(formData)

    if (!message) {
      return
    }

    await updateCurrencies()

    Router.push('/')
  }

  return (
    <UpdateCurrencyFormUI
      customError={customError}
      setCustomError={setCustomError}
      currentValue={currentValue}
      getCurrentValue={getCurrentValue}
      onSubmit={onSubmit}
      backToIndex={backToIndex}
    />
  )
}
