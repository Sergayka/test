import React from 'react'
import ReactDOM from 'react-dom/client';
import AppRouter from './router/router.jsx';
import './assets/style/style.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
