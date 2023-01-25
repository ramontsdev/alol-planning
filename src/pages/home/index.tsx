
import { GetServerSideProps } from "next";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { TextField } from "@/components/text-field";

import { useAuthContext } from "@/contexts/auth-context";
import { createRoom, joinRoom, User, useWebsocket } from "@/contexts/websocket-context";
import { api } from "@/utils/api";
import { Container, Header, Wrapper } from "./styles";


type HomePageProps = {
  userData: User
}
export default function HomePage(props: HomePageProps) {
  const [showModal, setShowModal] = useState(false)
  const [inputType, setInputType] = useState<'join' | 'create'>()
  const [roomName, setRoomName] = useState('')
  const [roomCode, setRoomCode] = useState('')

  const { currentUser, authenticateUser } = useAuthContext()
  const { pokerRoom } = useWebsocket()

  authenticateUser(props.userData)

  function handleShowModal(inputType: 'join' | 'create') {
    setInputType(inputType)
    setShowModal(true)
  }

  function handleChangeNameCodeRoom(text: string) {
    inputType === 'create'
      ? setRoomName(text)
      : setRoomCode(text)
  }

  function handleSubmit() {
    inputType === 'create'
      ? createRoom(roomName, currentUser)
      : joinRoom(roomCode, currentUser)
  }

  if (pokerRoom.roomId) {
    Router.push('/room')
  }

  return (
    <Container>
      <Modal
        visible={showModal}
        title={inputType === 'create' ? 'Criar uma sala' : 'Entrar numa sala'}
        onCancel={() => setShowModal(false)}
        onConfirm={handleSubmit}
      >
        <TextField
          placeholder={inputType === 'create' ? 'Nome da sala' : 'Código da sala'}
          onChange={(e) => handleChangeNameCodeRoom(e.target.value)}
        />
      </Modal>

      <Header>
        {currentUser.name}
      </Header>

      <Wrapper>
        <Button onClick={() => handleShowModal('create')}>
          Criar uma sala
        </Button>
        <Button onClick={() => handleShowModal('join')}>
          Entrar numa sala
        </Button>
      </Wrapper>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'alolPlanning.token': token } = ctx.req.cookies

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  try {
    const { data } = await api.get('/users/sign-in', {
      headers: {
        authorization: token
      }
    })

    return {
      props: {
        userData: data.userData
      }
    }
  } catch (error) {
    destroyCookie(ctx, 'alolPlanning.token')

    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }
}
