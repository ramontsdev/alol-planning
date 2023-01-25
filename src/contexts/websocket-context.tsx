import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import socketIo, { Socket } from 'socket.io-client';

import { env } from "@/utils/environment";
import { useAuthContext, UserAttributes } from "./auth-context";

type WebsocketContextProps = {
  pokerRoom: PlanningPokerRoom
  showVotesSocket: boolean
  resultArithmetic: number
  setMustClearVotes: Dispatch<SetStateAction<boolean>>
  mustClearVotes: boolean
}

const WebsocketContext = createContext({} as WebsocketContextProps)

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
}
export type OnlineUser = User & {
  socketId: string;
  pokerRoom: {
    roomId: string
    vote: number | null
  }
}

type PlanningPokerRoom = {
  roomId: string;
  roomCode: string;
  roomName: string;
  adminUser: {
    socketId: string
    id: string
    name: string;
    username: string;
    email: string;
  },
  users: Array<OnlineUser>
}

type Props = {
  children: ReactNode;
}
export let socket: Socket
export function WebsocketProvider({ children }: Props) {
  const { currentUser } = useAuthContext()
  const [pokerRoom, setPokerRoom] = useState<PlanningPokerRoom>({} as PlanningPokerRoom)
  const [showVotesSocket, setShowVotesSocket] = useState(false)
  const [resultArithmetic, setResultArithmetic] = useState(0)
  const [mustClearVotes, setMustClearVotes] = useState(false)

  useEffect(() => {
    socket = socketIo(env.apiUrl, {
      transports: ['websocket']
    })

    socket.on('connect', () => {
      socket.emit('connected', currentUser)
    })

    socket.on('planning_poker_room', (planningPokerRoom) => {
      setPokerRoom(planningPokerRoom)

      if (!planningPokerRoom.roomName) {
        setShowVotesSocket(false)
        setMustClearVotes(true)
        return;
      }

      setMustClearVotes(false)
    })

    socket.on('show_all_votes', ({ showVotes, arithmeticAverage }) => {
      setShowVotesSocket(showVotes)
      setResultArithmetic(arithmeticAverage)
    })

    socket.on('clean_votes', () => {
      setMustClearVotes(true)
    })

    return () => {
      socket.disconnect()
    }
  }, [currentUser])

  return (
    <WebsocketContext.Provider value={{
      pokerRoom,
      showVotesSocket,
      resultArithmetic,
      mustClearVotes,
      setMustClearVotes
    }}>
      {children}
    </WebsocketContext.Provider>
  )
}

export const useWebsocket = () => useContext(WebsocketContext);

export function emitSignIn(currentUser: UserAttributes) {
  socket.emit('connected', currentUser)
}
export function createRoom(roomName: string, currentUser: UserAttributes) {
  socket.emit('create_room', { roomName, adminUser: currentUser })
}
export function joinRoom(roomCode: string, currentUser: UserAttributes) {
  socket.emit('join_room', { roomCode, currentUser })
}
export function throwVote(vote: number | string | null) {
  socket.emit('throw_vote', vote)
}
export function showAllVotes(showVotes: boolean, roomId: string) {
  socket.emit('show_all_votes', { showVotes, roomId })
}
export function exitPokerRoom() {
  socket.emit('exit_poker_room')
}
export function clearVotes(roomId: string) {
  socket.emit('clear_all_votes', roomId)
}
