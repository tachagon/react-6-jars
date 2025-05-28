import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { useForm } from "@mantine/form"

import { authState } from "../store/auth"
import { api } from "../libs/axios"
import { handleStrapiFieldErrors } from "../libs/mantine"

import {
  Button,
  Container,
  Paper,
  type PaperProps,
  Stack,
  Text,
  TextInput,
 } from "@mantine/core"

export function Register(props: PaperProps) {
  // Set page title
  document.title = "Register | 6 Jars"

  const [formError, setFormError] = useState<string | null>(null)
  const setAuth = useSetRecoilState(authState)
  // })
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    api.post("/auth/local/register", values)
    .then(res => {
      const token = res.data.jwt
      const user = res.data.user

      setAuth({ user: user, token: token })

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect to home page after successful registration
      window.location.href = "/"
    })
    .catch(err => {
      console.error("Error registering user:", err)
      handleStrapiFieldErrors(err, form)

      const globalMessage = err.response?.data?.error?.message

      if (globalMessage) {
        setFormError(globalMessage)
      } else {
        setFormError("An unexpected error occurred. Please try again.")
      }
    })
  }

  return (
    <Container size="xs" mt="xl">
      <Paper radius={"md"} p="lg" withBorder {...props}>
        <Text size="xl">
          สมัครสมาชิก
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Username"
              radius={"md"}
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              type="email"
              radius={"md"}
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Password"
              placeholder="Password"
              type="password"
              radius={"md"}
              {...form.getInputProps('password')}
            />

            {formError && (
              <Text color="red" size="sm">
                {formError}
              </Text>
            )}

            <Button type="submit" fullWidth>
              สมัครสมาชิก
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}
