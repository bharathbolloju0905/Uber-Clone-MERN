import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/userContext.jsx';
import { CaptainProvider } from './context/captainContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <UserProvider>
        <CaptainProvider>
        <App />
        </CaptainProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
