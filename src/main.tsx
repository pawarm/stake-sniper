import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AppStateProvider } from './contexts/AppStateProvider.tsx'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStateProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </AppStateProvider>
  </React.StrictMode>,
)
