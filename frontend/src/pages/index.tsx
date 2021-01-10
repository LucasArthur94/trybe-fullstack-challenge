import React, { FC } from 'react'
import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const MonetaryBox = styled.div`
  width: 740px;
  height: 99px;
  background-color: #c4c4c4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MonetaryText = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  line-height: 59px;
`

const Home: FC = () => (
  <Page>
    <MonetaryBox>
      <MonetaryText>Atualizar valor monetário</MonetaryText>
    </MonetaryBox>
    <MonetaryText>BTC</MonetaryText>
  </Page>
)

export default Home
