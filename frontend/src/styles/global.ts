import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    font-family: ${(props) => props.theme.fonts.body};
    font-style: ${(props) => props.theme.fontStyles.body};
    font-weight: ${(props) => props.theme.fontWeight.body};
    font-size: ${(props) => props.theme.fontSizes.body};
    line-height: ${(props) => props.theme.lineHeights.body};
  }
  
  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  button {
    background-color: ${(props) => props.theme.colors.primary};
  }
`
