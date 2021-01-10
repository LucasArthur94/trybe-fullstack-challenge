import React, { FC } from 'react'
import styled from 'styled-components'

const CurrencyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px;
`

const CurrencyValue = styled.div`
  width: 242px;
  height: 98px;
  background-color: ${({ theme }) => theme.colors.grayBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Currency: FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <CurrencyBox>
    <span>{label}</span>
    <CurrencyValue>{value.toFixed(2)}</CurrencyValue>
  </CurrencyBox>
)
