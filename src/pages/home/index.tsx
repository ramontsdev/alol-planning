
import { useRouter } from "next/router";
import { useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { TextField } from "@/components/text-field";

import { useAuthContext } from "@/contexts/auth-context";
import { createRoom, joinRoom, useWebsocket } from "@/contexts/websocket-context";
import { Container, Header, Wrapper } from "./styles";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const [inputType, setInputType] = useState<'join' | 'create'>()
  const [roomName, setRoomName] = useState('')
  const [roomCode, setRoomCode] = useState('')

  const { currentUser } = useAuthContext()
  const { pokerRoom } = useWebsocket()

  const routes = useRouter()

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
    routes.push('/room')
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
