import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import RecoilizeDebugger from "recoilize"

import { MantineProvider, createTheme } from "@mantine/core"
import '@mantine/core/styles.css'

import './index.css'
import App from './App.tsx'

const theme = createTheme({})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <RecoilizeDebugger />
        <MantineProvider theme={theme}>
          <App />
        </MantineProvider>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
)
