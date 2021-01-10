import React, { FC } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { LoginFormData } from './login-form.types'
import { testId } from '../../helpers/testId'
import { emailValidator } from '../../helpers/emailValidator'

type LoginFormUIProps = {
  customError: string
  setCustomError: (customError: string) => void
  onSubmit: (formData: LoginFormData) => void
}

const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`

const Input = styled.input`
  width: 698px;
  height: 107px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`

const Label = styled.label`
  text-align: left;
  margin: 11px 0;
`

const Button = styled.button`
  width: 698px;
  height: 107px;
  margin: 100px 0 0;
`

const ErrorInfo = styled.p`
  color: ${({ theme }) => theme.colors.error};
`

export const LoginFormUI: FC<LoginFormUIProps> = ({
  customError,
  setCustomError,
  onSubmit,
}) => {
  const { errors, register, handleSubmit, formState } = useForm<LoginFormData>({
    mode: 'onSubmit',
    shouldFocusError: true,
  })

  return (
    <FormDiv onSubmit={handleSubmit(onSubmit)} {...testId('login-form')}>
      <InputBlock>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          onChange={(_event) => setCustomError('')}
          ref={register({
            required: true,
            maxLength: 60,
            validate: {
              email: (value) => emailValidator(value),
            },
          })}
        />
      </InputBlock>
      <InputBlock>
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          name="password"
          autoComplete="password"
          onChange={(_event) => setCustomError('')}
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 6,
          })}
        />
      </InputBlock>
      <Button>{formState.isSubmitting ? 'LOGANDO...' : 'ENTRAR'}</Button>
      {customError && <ErrorInfo>{customError}</ErrorInfo>}
      {errors.email && <ErrorInfo>Email inválido</ErrorInfo>}
      {/* Essa linha abaixo é nada segura, mas ok... */}
      {errors.password && <ErrorInfo>Senha precisa conter 6 números</ErrorInfo>}
    </FormDiv>
  )
}
