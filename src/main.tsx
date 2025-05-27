import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RecoilRoot } from "recoil"

import { MantineProvider, createTheme } from "@mantine/core"
import '@mantine/core/styles.css'

import './index.css'
import App from './App.tsx'

const theme = createTheme({})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </RecoilRoot>
  </StrictMode>,
)
