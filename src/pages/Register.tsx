import { useState } from "react"
import { useSetRecoilState } from "recoil"

import { authState } from "../store/auth"
import { api } from "../libs/axios"

export function Register() {
  const setAuth = useSetRecoilState(authState)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    api.post("/auth/local/register", form)
      .then(res => {
        const token = res.data.jwt
        const user = res.data.user

        setAuth({ user: user, token: token })

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        window.location.reload()
      })
      .catch(err => {
        console.error("Error registering user:", err)
      })
    }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
      />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
      />
      <button type="submit">Register</button>
    </form>
  )
}
