import '@/assets/styles/reset.css'

import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { AppGlobalStyle } from '@/App.styled'
import { appTheme } from '@/assets/themes/default.styled'
import routes from '@/routes'

const App: React.FC = () => {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <AppGlobalStyle />
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
