import { createRoot } from 'react-dom/client'

import App from './App'
;(function () {
  const container = document.getElementById('app')
  if (!container) return
  const root = createRoot(container)
  root.render(<App />)
})()
