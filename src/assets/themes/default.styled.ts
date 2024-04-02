const appTheme = {
  palette: {
    primary: {
      500: '#50E3C2',
    },
  },
  fontWeight: {
    lighter: 100,
    normal: 400,
    bolder: 700,
  },
  zIndex: {
    navBar: 100,
  },
}

export type CustomTheme = typeof appTheme
export { appTheme }
