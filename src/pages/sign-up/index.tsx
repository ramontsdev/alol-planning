import { FormEvent, useState } from "react";

import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";

import Loader from "@/components/loader";
import { request } from "@/utils/user-service";
import Router from "next/router";
import { setCookie } from "nookies";
import { Container, Form } from "./styles";

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const signUpData = {
      name,
      username,
      email,
      password,
      confirmPassword
    }

    const { error, data } = await request('post', '/users/sign-up', signUpData)

    setIsLoading(false)

    if (error) {
      return alert(error)
    }

    setCookie(undefined, 'alolPlanning.token', data.token, {
      maxAge: 60 * 60 * 48 // 48 horas
    })

    Router.replace('/home')
  }
  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          placeholder="Seu nome"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          placeholder="Nome de usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          placeholder="Confirme a Senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  )
}
