import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SmilyDesignSystem from './SmilyDesignSystem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmilyDesignSystem />
  </StrictMode>,
)
