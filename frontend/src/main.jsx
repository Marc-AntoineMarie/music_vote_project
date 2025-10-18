import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme 
      appearance="dark" 
      accentColor="brown" 
      grayColor="sand"
      radius="medium"
      scaling="100%"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Theme>
  </StrictMode>
)
