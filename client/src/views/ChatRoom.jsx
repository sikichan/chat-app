import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {Item} from '../components/ContactList'
import Bubble from '../components/Bubble'
import Editor from '../components/Editor'
import { useEffect } from 'react'
export default function ChatRoom() {
  const { chatToId } = useParams()
  async function handleSend(value) {
    console.log(value)
  }
  return (
    <ChatRoomContainer>
      <header>
        {/* <Item contact={} /> */}
      </header>
      <div className='records'>
        <Bubble isMe={true}>sdfafasf</Bubble>
      </div>
      <Editor onSend={handleSend}/>
    </ChatRoomContainer>
  )
}

const ChatRoomContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 1rem;
  header {
    background-color: #fff;
    position: fixed;
    width: 100%;
    color: #36167a;
  }
  .records {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
  }
`