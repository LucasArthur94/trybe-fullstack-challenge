import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { testId } from '../../helpers/testId'
import { UpdateCurrencyFormData } from './update-currency-form.types'

type UpdateCurrencyUIProps = {
  customError: string
  setCustomError: (customError: string) => void
  onSubmit: (formData: UpdateCurrencyFormData) => void
  currentValue: string
  getCurrentValue: (currency: string) => Promise<void>
  backToIndex: () => void
}

const BackButton = styled.button`
  width: 258px;
  height: 79px;
  top: 45px;
  left: 45px;
  background-color: ${({ theme }) => theme.colors.grayBackground};
  border: 0;
`

const UpdateCurrencyFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const BTCForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 46px;
`

const Input = styled.input`
  width: 698px;
  height: 107px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`

const Select = styled.select`
  width: 698px;
  height: 107px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  margin: 25px 0;
`

const CurrentValue = styled.span`
  width: 698px;
`

const Bold = styled.span`
  width: 698px;
  font-weight: ${({ theme }) => theme.fontWeight.special};
`

const Button = styled.button`
  width: 698px;
  height: 107px;
  margin: 76px 0 0;
`

const ErrorInfo = styled.p`
  color: ${({ theme }) => theme.colors.error};
`

export const UpdateCurrencyFormUI: FC<UpdateCurrencyUIProps> = ({
  customError,
  setCustomError,
  currentValue,
  onSubmit,
  backToIndex,
  getCurrentValue,
}) => {
  const {
    errors,
    register,
    handleSubmit,
    formState,
  } = useForm<UpdateCurrencyFormData>({
    mode: 'onSubmit',
    shouldFocusError: true,
  })

  return (
    <>
      <BackButton onClick={backToIndex}>Voltar</BackButton>
      <UpdateCurrencyFormDiv>
        <BTCForm
          onSubmit={handleSubmit(onSubmit)}
          {...testId('update-currency-form')}
        >
          <InputBlock>
            <label htmlFor="currency">Moeda</label>
            <Select
              name="currency"
              ref={register({
                required: true,
              })}
              onChange={(event) => {
                setCustomError('')
                getCurrentValue(event.target.value)
              }}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Escolha
              </option>
              <option value="BRL">BRL</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
            </Select>
          </InputBlock>
          <InputBlock>
            <CurrentValue>
              <Bold>Valor atual:</Bold> {currentValue}
            </CurrentValue>
          </InputBlock>
          <InputBlock>
            <label htmlFor="value">Novo valor</label>
            <Input
              type="number"
              name="value"
              min={0}
              step={0.01}
              onChange={(_event) => setCustomError('')}
              ref={register({
                required: true,
              })}
            />
          </InputBlock>
          <Button>
            {formState.isSubmitting ? 'ATUALIZANDO...' : 'ATUALIZAR'}
          </Button>
          {errors.currency && <ErrorInfo>Moeda inválida</ErrorInfo>}
          {errors.value && <ErrorInfo>Valor inválido</ErrorInfo>}
          {customError && <ErrorInfo>{customError}</ErrorInfo>}
        </BTCForm>
      </UpdateCurrencyFormDiv>
    </>
  )
}
