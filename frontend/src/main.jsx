import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './slices/index.js'
import './styles/style.css'
import App from './App.jsx'
import initApp from './init'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {initApp(App, store)}
  </StrictMode>,
)
