import React, { FC } from 'react'
import App, { AppContext } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import { getEntryPointRedirect } from '../helpers/gatekeeper'

class CryptoApp extends App {
  static async getInitialProps({ ctx, Component }: AppContext) {
    if (ctx.res) {
      const redirectPath = getEntryPointRedirect(ctx)

      if (redirectPath) {
        ctx.res.writeHead(302, {
          Location: redirectPath,
        })
        ctx.res.end()
      }
    }

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
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    )
  }
}

export default CryptoApp
