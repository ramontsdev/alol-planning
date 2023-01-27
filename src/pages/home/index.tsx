
import { GetServerSideProps } from "next";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { TextField } from "@/components/text-field";

import Loader from "@/components/loader";
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
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser, authenticateUser } = useAuthContext()
  const { pokerRoom } = useWebsocket()

  useEffect(() => {
    authenticateUser(props.userData)
  }, [authenticateUser, props.userData])

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
    setIsLoading(true)

    inputType === 'create'
      ? createRoom(roomName, currentUser)
      : joinRoom(roomCode, currentUser)
  }

  if (pokerRoom.roomId) {
    Router.replace('/room')
  }

  function logout() {
    Router.replace('/sign-in')
    destroyCookie(undefined, 'alolPlanning.token')
  }


  return (
    <Container>
      <Loader isLoading={isLoading} />

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
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {currentUser.name}

          <Button
            variant="secondary"
            onClick={logout}
          >
            Sair
          </Button>
        </div>
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
