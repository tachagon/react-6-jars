import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"

import { authState } from "../store/auth"

export function Home() {
  // Set page title
  document.title = "Home | 6 Jars"

  const navigate = useNavigate()
  // const setAuth = useSetRecoilState(authState)
  const [auth, setAuth] = useRecoilState(authState)
  const token = localStorage.getItem("token")

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      // If token and user exist, set them in Recoil state
      setAuth({
        user: JSON.parse(storedUser),
        token: storedToken,
      })
    } else {
      // If not, reset Recoil state
      setAuth({ user: null, token: null })
    }
  }, [setAuth])

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

  const renderLoginBtn = (
    <Button
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      onClick={() => navigate("/login")}
    >
      เข้าสู่ระบบ
    </Button>
  )

  const renderRegisterBtn = (
    <Button
      variant="gradient"
      gradient={{ from: 'cyan', to: 'yellow', deg: 140 }}
      onClick={() => navigate("/register")}
    >
      สมัครสมาชิก
    </Button>
  )

  return (
    <>
      <h1 className='text-4xl font-bold'>Kol Here</h1>
      {auth.user && (
        <div className='mt-4'>
          <p className='text-lg'>Welcome, {auth.user.username}!</p>
          <p className='text-sm text-gray-500'>Email: {auth.user.email}</p>
        </div>
      )}

      {token ?
        renderLogoutBtn :
        <Button.Group>
          {renderLoginBtn}
          {renderRegisterBtn}
        </Button.Group>
      }
    </>
  )
}
