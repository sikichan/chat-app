import { createContext, useEffect, useRef, useState } from "react"
import { useLoaderData} from 'react-router-dom'
import ContactList from "../components/ContactList"
import { io } from 'socket.io-client'
import styled from 'styled-components'
import ChatRoom from "./ChatRoom"

export const SocketContext = createContext()

export default function Chat() {
  const {contactList, currentUser} = useLoaderData()
  const [chatUser, setChatUser] = useState(null)
  const socket = useRef()
  const onSelect = (chatTo) => {
    console.log(chatTo)
    setChatUser(chatTo)
  }

  useEffect(() => {
   
    if (!socket.current) {
      socket.current = io(`http://localhost:1000`)
      console.log('currentUser=====')
      socket.current.emit('add-user', currentUser._id)
    }
    return () => {
      socket.current.disconnect()
      socket.current = null
    }
  }, [])
  return (
    <Container>
      <ContactList datas={contactList} chatUser={chatUser} currentUser={currentUser} onSelect={onSelect} />
      <ChatRoom chatUser={chatUser} socket={socket} currentUser={currentUser}/>
    </Container>)
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`