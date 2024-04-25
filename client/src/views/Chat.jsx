import { useEffect, useRef, useState } from "react"
import { useLoaderData} from 'react-router-dom'
import ContactList from "../components/ContactList"
import styled from 'styled-components'
import ChatRoom from "./ChatRoom"
import axios from "axios"
import SocketIo from 'socket.io-client'
const socket = SocketIo.connect(`http://localhost:1000`)
console.log(socket, 'SOCKET')
const baseURL = `http://localhost:1000/api`

export default function Chat() {
  const {currentUser} = useLoaderData()
  const [contacts, setContacts] = useState([])
  const [chatUser, setChatUser] = useState(null)
  const onSelect = (chatTo) => {
    setChatUser(chatTo)
  }

  useEffect(() => {
    socket.on('refresh-contacts', async (userIds) => {
      const {data} = await axios.get(`${baseURL}/contact-list/${currentUser._id}`)
      console.log('!!!!!', data, userIds)
      if (data) {
        const list = data.contactList.map(c => {
          c.online = userIds.includes(c._id)
          return c
        })
        list.sort((a, b) => {
          if (a.online && !b.online) {
            return -1
          }
          if (!a.online && b.online) {
            return 1
          }
          return 0
        })
        setContacts(list)
      }
    })
    socket.emit('add-user', currentUser._id)
    return () => {
      console.log('leave')
      socket.off('refresh-contacts')
    }
  }, [])
  return (
    <Container>
      <ContactList datas={contacts} socket={socket} chatUser={chatUser} currentUser={currentUser} onSelect={onSelect} />
      <ChatRoom chatUser={chatUser} socket={socket} currentUser={currentUser}/>
    </Container>)
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`