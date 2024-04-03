import { createGlobalStyle } from 'styled-components'

export const AppGlobalStyle = createGlobalStyle`
  body {
    font-family: Noto Sans TC, Roboto, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input:focus,
  button:focus {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }
`
