
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <div className="dark:bg-slat-900 dark:text-white m">
    <App />
    </div>
  </BrowserRouter>
)
