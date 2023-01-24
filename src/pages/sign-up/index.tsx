import { FormEvent } from "react";

import { Button } from "@/components/button";
import { TextField } from "@/components/text-field";

import { Container, Form } from "./styles";

export default function SignUpPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log("Texto")
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <TextField placeholder="Seu nome" />
        <TextField placeholder="Nome de usuário" />
        <TextField placeholder="E-mail" />
        <TextField placeholder="Senha" />
        <TextField placeholder="Confirme a Senha" />

        <Button type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  )
}
