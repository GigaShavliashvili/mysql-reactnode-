import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import MainRouter from './Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainRouter/>
  </React.StrictMode>,
)
