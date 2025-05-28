import { useSetRecoilState } from "recoil"
import { Button } from "@mantine/core"

import { authState } from "../store/auth"

export function Home() {
  const setAuth = useSetRecoilState(authState)
  const token = localStorage.getItem("token")

  const renderLogoutBtn = (
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

  const renderRegisterBtn = (
    <Button
      variant="outline"
      color="blue"
      onClick={() => window.location.href = "/register"}
    >
      Register
    </Button>
  )

  return (
    <>
      <h1 className='text-4xl font-bold'>Kol Here</h1>
      {token ? renderLogoutBtn : renderRegisterBtn}
    </>
  )
}
