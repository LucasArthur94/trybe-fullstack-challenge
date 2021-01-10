import React, { FC } from 'react'
import styled from 'styled-components'
import { testId } from '../../helpers/testId'
import { CurrencyFormProps } from './currency-form.types'
import { Currency } from './currency.ui'

const CurrencyFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const MonetaryBox = styled.button`
  width: 740px;
  height: 99px;
  background-color: ${({ theme }) => theme.colors.grayBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 124px;
  border: 0;
`

const BTCForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 46px;
`

const BTCInput = styled.input`
  width: 157px;
  height: 98px;
  border: 0px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.grayBackground};
`

const CurrencyGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CurrencyFormUI: FC<CurrencyFormProps> = ({
  usd,
  brl,
  eur,
  cad,
  getCurrencies,
  updateCurrency,
}) => (
  <CurrencyFormDiv>
    <MonetaryBox onClick={updateCurrency}>
      Atualizar valor monetário
    </MonetaryBox>
    <BTCForm {...testId('currency-form')}>
      <label htmlFor="btc-value">BTC</label>
      <BTCInput
        name="btc-value"
        type="number"
        min={0}
        defaultValue={0}
        step={0.01}
        onChange={(event) => getCurrencies(Number(event.target.value))}
      ></BTCInput>
    </BTCForm>
    <CurrencyGroup>
      <Currency label="USD" value={usd} />
      <Currency label="BRL" value={brl} />
      <Currency label="EUR" value={eur} />
      <Currency label="CAD" value={cad} />
    </CurrencyGroup>
  </CurrencyFormDiv>
)
