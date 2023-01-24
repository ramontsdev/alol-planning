import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";
import { useAuthContext } from "@/contexts/auth-context";
import { emitSignIn } from "@/contexts/websocket-context";
import { userService } from "@/utils/user-service";

import { Container, Form, Link } from "./styles";

export default function SignInPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { handleAuthenticate } = useAuthContext()

  const routes = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const login = {
      username,
      password
    }

    const { error, data } = await userService.signIn(login)
    if (error) {
      alert(error)
      return;
    }

    handleAuthenticate(data)

    emitSignIn(data)

    routes.replace('/home')
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextField
          value={username}
          placeholder="Nome de usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          value={password}
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">
          Entrar
        </Button>

        <Button variant="secondary" type="button">
          Sem conta
        </Button>

        <Link style={{ textDecoration: 'none', color: 'inherit' }} href={'/sign-up'}>
          Ainda não tem conta? Faça agora.
        </Link>
      </Form>
    </Container>
  )
}
