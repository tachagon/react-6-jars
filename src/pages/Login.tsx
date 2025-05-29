import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "@mantine/form"
import { useSetRecoilState } from "recoil"

import { api } from "../libs/axios"
import { authState } from "../store/auth"
import { handleStrapiFieldErrors } from "../libs/mantine"

import {
  Anchor,
  Button,
  Container,
  Paper,
  Stack,
  Text,
  TextInput,
 } from "@mantine/core"

export const Login = () => {
  // Set page title
  document.title = "เข้าสู่ระบบ | 6 Jars";

  const navigator = useNavigate()
  const setAuth = useSetRecoilState(authState)
  const [formError, setFormError] = useState<string | null>(null)

  const form = useForm({
    initialValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    api.post("/auth/local", values)
    .then(response => {
      const token = response.data.jwt;
      const user = response.data.user;

      // Save token and user to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update Recoil state
      setAuth({ user: user, token: token });

      // Redirect to home page after successful login
      navigator("/", { replace: true });
    })
    .catch(error => {
      handleStrapiFieldErrors(error, form)
      const globalMessage = error.response?.data?.error?.message;

      if (globalMessage) {
        setFormError(globalMessage)
      } else {
        setFormError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง")
      }
    });
  }

  return (
    <Container size="xs" mt="xl">
      <Paper withBorder p="md" radius="md" shadow="sm">
        <Stack>
          <Text size="lg" fw={700}>
            เข้าสู่ระบบ
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="อีเมลหรือชื่อผู้ใช้"
              name="identifier"
              placeholder="กรุณากรอกอีเมลหรือชื่อผู้ใช้"
              type="text"
              required
              {...form.getInputProps("identifier")}
            />

            <TextInput
              label="รหัสผ่าน"
              name="password"
              placeholder="กรุณากรอกรหัสผ่าน"
              type="password"
              required
              {...form.getInputProps("password")}
            />

            {formError && (
              <Text color="red" size="sm" mt="xs">
                {formError}
              </Text>
            )}

            <Button type="submit" fullWidth mt="md" color="blue">
              เข้าสู่ระบบ
            </Button>
          </form>

          <Text size="sm" color="dimmed">
            หากคุณยังไม่มีบัญชีผู้ใช้ สามารถ{" "}
            <Anchor onClick={() => navigator("/register")}>สมัครสมาชิก</Anchor> ได้ที่นี่
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
}
