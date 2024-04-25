import styled from 'styled-components'
import Editor from '../components/Editor'
import Records from '../components/Records'
import Default from "./Default"
import defaultAvatar from '../assets/react.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
const baseURL = `http://localhost:1000/api`
export default function ChatRoom({chatUser, currentUser, socket}) {

  const [messages, setMessages] = useState([])
  
  async function handleSend(value) {
    console.log(value, socket.connected)
    const msgData = {
      receiver: chatUser._id,
      sender: currentUser._id,
      message: value
    }
    const {data} = await axios.post(`${baseURL}/add-msg`, msgData)
    const {newMessage} = data
    socket.emit('send-msg', newMessage)
    setMessages([
      ...messages,
      {
        ...newMessage,
        key: newMessage._id,
        fromSelf: newMessage.sender === currentUser._id
      }
    ])
  }

  useEffect(() => {
    if (chatUser && currentUser) {
      console.log('chatUser:', chatUser)
      const fetchMsgs = async () => {
        const { data } = await axios.post(`${baseURL}/get-msgs`, {
          receiver: chatUser._id,
          sender: currentUser._id
        })
        setMessages(data.messages)
      }
      fetchMsgs()
    }
    return () => setMessages([])
  }, [chatUser, currentUser])

  useEffect(() => {
    socket.on('msg-receive', (msg) => {
      console.log('msg:;;;', msg)
      setMessages([
        ...messages,
        {
          ...msg,
          key: msg._id,
          fromSelf: msg.sender === currentUser._id
        }
      ])
    })
    return () => {
      socket.off('msg-receive')
    }
  }, [socket, chatUser, messages, currentUser._id])

  return (
    <ChatRoomContainer>
      {
      chatUser ? (
        <>
        <header>
          <img src={chatUser.avatar || defaultAvatar} alt='' />
          <span className='username'>{chatUser.username}</span>
          <span className={['status', chatUser.online ? 'online': 'offline'].join(' ')}>{chatUser.online ? 'online': 'offline'}</span>
        </header>
        <Records messages={messages}/>
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
    .online {
      color: #36e933;
    }
    .offline {
      color: grey;
    }
    .status {
      font-size: 12px;
      text-decoration: underline;
    }
    .username {
      margin-right: 0.5rem;
    }
  }
  
`