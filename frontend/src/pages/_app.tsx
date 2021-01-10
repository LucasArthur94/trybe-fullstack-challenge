import React, { FC } from 'react'
import App, { AppContext } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { Gatekeeper } from '../components/common/gatekeeper'
import { ContextProvider } from '../components/common/context.hook'

class CryptoApp extends App {
  static async getInitialProps({ ctx, Component }: AppContext) {
    const pageProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx))

    return {
      pageProps,
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <GlobalStyle />
          <Gatekeeper {...pageProps} />
          <Component {...pageProps} />
        </ContextProvider>
      </ThemeProvider>
    )
  }
}

export default CryptoApp
