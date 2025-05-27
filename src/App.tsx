import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useSetRecoilState } from "recoil"
import { authState } from "./store/auth"

import { Button } from "@mantine/core"
import { Register } from "./pages/Register"

function App() {
  const [count, setCount] = useState(0)
  const setAuth = useSetRecoilState(authState)
  const token = localStorage.getItem("token")

  const renderLogout = (
    <Button
      variant="outline"
      color="red"
      onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setAuth({ user: null, token: null })
        window.location.reload()
      }}
    >
      Logout
    </Button>
  )

  return (
    <>
      <h1 className='text-4xl font-bold'>Kol Here</h1>
      {token ? renderLogout : <Register />}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
