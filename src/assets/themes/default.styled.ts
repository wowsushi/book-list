const appTheme = {
  palette: {
    primary: {
      500: '#50E3C2',
    },
    gray: {
      100: '#ffffff',
      900: '#000000',
    },
  },
  layout: {
    navbarHeight_mobile: 40,
    navbarHeight_desktop: 70,
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
