import React, { FC } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { FormData } from './login-form.types'
import { testId } from '../../helpers/testId'
import { emailValidator } from '../../helpers/emailValidator'

type LoginFormUIProps = {
  onSubmit: (data: FormData) => void
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
  border: 1px solid black;
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

export const LoginFormUI: FC<LoginFormUIProps> = ({ onSubmit }) => {
  const { errors, register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onSubmit',
    shouldFocusError: true,
  })

  return (
    <FormDiv onSubmit={handleSubmit(onSubmit)} {...testId('login-form')}>
      <InputBlock>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          autoComplete="email"
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
        <Label for="password">Senha</Label>
        <Input
          type="password"
          name="password"
          autoComplete="password"
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 6,
          })}
        />
      </InputBlock>
      <Button>{formState.isSubmitting ? 'LOGANDO...' : 'ENTRAR'}</Button>
      {errors.email && <ErrorInfo>Email inválido</ErrorInfo>}
      {/* Essa linha abaixo é nada segura, mas ok... */}
      {errors.password && <ErrorInfo>Senha precisa conter 6 números</ErrorInfo>}
    </FormDiv>
  )
}
