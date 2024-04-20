import styled from 'styled-components'
import Bubble from './Bubble'
import { useEffect, useRef } from 'react'
export default function Records ({messages}) {
  const lastMsg = useRef()
  function getMap() {
    if (!lastMsg.current) {
      lastMsg.current = new Map()
    }
    return lastMsg.current
  }
  // function scrollTo(msgId) {
  //   const map = getMap()
  //   const node = map.get(msgId)
  //   node.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center'
  //   })
  // }
  useEffect(() => {
    function scrollTo(msgId) {
      const map = getMap()
      const node = map.get(msgId)
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
    const lastMessage = messages[messages.length -1]
    if (lastMessage) scrollTo(lastMessage._id)
    
  }, [messages])
  return (
    <RecordContainter>
      {
        messages &&
        messages.map(msg => <Bubble key={msg._id} isMe={msg.fromSelf}
          ref={(node) => {
            const map = getMap()
              if (node) {
                map.set(msg._id, node)
              } else {
                map.delete(msg._id)
              }
          }}
        >{msg.message}</Bubble>)
      }
    </RecordContainter>
  )
}
const RecordContainter = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* min-width: 600px; */
  overflow-y: scroll;
  margin-top: 60px;
  padding: 1rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.2rem;
    background-color: #353563;
  }
`