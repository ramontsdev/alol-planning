import Router from "next/router";
import { FormEvent, useState } from "react";

import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";
import { useAuthContext } from "@/contexts/auth-context";
import { userService } from "@/utils/user-service";

import { emitSignIn } from "@/contexts/websocket-context";
import { GetServerSideProps } from "next";
import { setCookie } from "nookies";
import { Container, Form, Link } from "./styles";

export default function SignInPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { authenticateUser } = useAuthContext()

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

    setCookie(undefined, 'alolPlanning.token', data.token, {
      maxAge: 60 * 60 * 48 // 48 horas
    })

    authenticateUser(data.userData)

    emitSignIn(data)

    Router.replace('/home')
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'alolPlanning.token': token } = ctx.req.cookies

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
