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

   /* fix formatselect layout for tinymce editor */
  .tox .tox-collection__item-label {
    line-height: 1 !important;
  }
`
