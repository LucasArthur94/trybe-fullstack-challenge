import React, { FC } from 'react'
import Router from 'next/router'
import { LoginFormUI } from './login-form.ui'
import { useLoginForm } from './login-form.hook'
import { LoginFormData } from './login-form.types'
import { setAuthToken } from '../../helpers/auth'

export const LoginForm: FC = () => {
  const { login, customError, setCustomError } = useLoginForm()

  const onSubmit = async (formData: LoginFormData) => {
    const { token } = await login(formData)

    setAuthToken(token)

    if (token) {
      Router.push('/')
    }
  }

  return (
    <LoginFormUI
      onSubmit={onSubmit}
      customError={customError}
      setCustomError={setCustomError}
    />
  )
}
