import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TagManager from 'react-gtm-module'
import { Analytics } from "@vercel/analytics/next"

TagManager.initialize({
  gtmId: "GTM-PL8MLMRK"
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
