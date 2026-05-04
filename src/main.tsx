import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MovieProvider } from "./context/MovieContext"
import { AuthProvider } from "./context/AuthContext"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MovieProvider>
  </StrictMode>,
)
