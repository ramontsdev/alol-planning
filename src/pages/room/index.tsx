import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { useAuthContext } from "@/contexts/auth-context";
import {
  clearVotes, exitPokerRoom,
  showAllVotes, throwVote,
  useWebsocket
} from "@/contexts/websocket-context";
import {
  AdminWrapper, CircleVote, Container,
  Header, Main, VoteCard,
  VoteCardsArea, VoterUserCard, Wrapper
} from "./styles";

export const cleanVoteCards: VoteCardType[] = [
  { id: 1, value: 0, isSelected: false },
  { id: 2, value: 1, isSelected: false },
  { id: 3, value: 2, isSelected: false },
  { id: 4, value: 3, isSelected: false },
  { id: 5, value: 5, isSelected: false },
  { id: 6, value: 8, isSelected: false },
  { id: 7, value: 13, isSelected: false },
  { id: 8, value: 21, isSelected: false },
  { id: 9, value: 34, isSelected: false },
  { id: 10, value: 55, isSelected: false },
  { id: 11, value: 89, isSelected: false },
  { id: 12, value: '?', isSelected: false },
]
export type VoteCardType = {
  id: number;
  value: number | string;
  isSelected: boolean;
}

export default function RoomPage() {
  const [voteCards, setVoteCards] = useState<VoteCardType[]>(cleanVoteCards)

  const { currentUser } = useAuthContext()
  const {
    pokerRoom, showVotesSocket,
    resultArithmetic,
    mustClearVotes, setMustClearVotes
  } = useWebsocket()

  const routes = useRouter()

  useEffect(() => {
    if (!pokerRoom.roomId) {
      routes.replace('/home')
    }
  }, [pokerRoom, routes])

  useEffect(() => {
    if (mustClearVotes) {
      const resetedCards = voteCards.map(card => {
        card.isSelected = false
        return card
      })
      setVoteCards([...resetedCards])
      setMustClearVotes(false)
    }
  }, [mustClearVotes, setMustClearVotes, voteCards])

  function handleShowVotes() {
    !showVotesSocket
      ? showAllVotes(true, pokerRoom.roomId)
      : showAllVotes(false, pokerRoom.roomId)
  }

  function handleSelectVote(vote: { id: number; value: number | string; isSelected: boolean; }) {
    const resetedCards = voteCards.map(card => {
      if (card.id !== vote.id) {
        card.isSelected = false
        return card
      }
      card.isSelected = !card.isSelected
      return card
    })

    const noneSelected = resetedCards.every(card => !card.isSelected)

    if (noneSelected) {
      throwVote(null)
      return;
    }

    throwVote(vote.value)

    setVoteCards([...resetedCards])
  }

  if (!pokerRoom.roomId) {
    return null
  }

  return (
    <Container>
      <Header>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          {currentUser.name}

          <Button
            variant="secondary"
            onClick={() => {
              exitPokerRoom()
              routes.replace('/home')
            }}
          >
            Sair da sala
          </Button>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <strong>Código da sala:</strong>
          <span>{pokerRoom.roomCode}</span>
        </div>

        {currentUser.id === pokerRoom.adminUser.id && (
          <AdminWrapper>
            <Button onClick={handleShowVotes}>
              {!showVotesSocket && 'Mostrar resultado'}
              {showVotesSocket && 'Esconder votos'}
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                clearVotes(pokerRoom.roomId)
                showAllVotes(false, pokerRoom.roomId)
              }}
            >
              Limpar votos
            </Button>
          </AdminWrapper>
        )}
      </Header>

      <Main>
        <Wrapper>
          {pokerRoom.users.map((user) => (
            <VoterUserCard key={user.id}>
              <CircleVote showVote={showVotesSocket} hasVote={Boolean(user.pokerRoom.vote?.toString())}>
                {showVotesSocket && user.pokerRoom.vote}
                {!showVotesSocket && null}
              </CircleVote>
              {user.name.length > 14
                ? `${user.name.substring(0, 13)}...`
                : user.name}
            </VoterUserCard>
          ))}
        </Wrapper>
      </Main>

      <VoteCardsArea>
        {showVotesSocket
          ? resultArithmetic
          : (voteCards.map(vote => (
            <VoteCard
              key={Math.random()}
              isSelected={vote.isSelected}
              onClick={() => handleSelectVote(vote)}
            >
              {vote.value}
            </VoteCard>
          )))
        }
      </VoteCardsArea>
    </Container>
  )
}
