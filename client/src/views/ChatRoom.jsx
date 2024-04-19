import styled from 'styled-components'
import Editor from '../components/Editor'
import Records from '../components/Records'
import Default from "./Default"
import defaultAvatar from '../assets/react.svg'
import { useEffect } from 'react'
export default function ChatRoom({chatUser, currentUser, socket}) {

  async function handleSend(value) {
    console.log(value, socket.current.connected)
    socket.current.emit('send-msg', {
      to: chatUser._id,
      from: currentUser._id,
      msg: value
    })
   
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        console.log(msg)
      })
    }
  }, [socket, chatUser])

  return (
    <ChatRoomContainer>
      {
      chatUser ? (
        <>
        <header>
          <img src={chatUser.avatar || defaultAvatar} alt='' />
          <span>{chatUser.username}</span>
        </header>
        <Records/>
        <Editor onSend={handleSend}/>
      </>
      ) : <Default/>
    }
    </ChatRoomContainer>
  )
}

const ChatRoomContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  header {
    position: fixed;
    width: 100%;
    color: #36167a;
    height: 60px;
    line-height: 60px;
    padding: 0 1rem;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 1rem;
      vertical-align: middle;
    }
  }
  
`