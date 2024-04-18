import { useParams } from 'react-router-dom'
export default function ChatRoom() {
  const { chatToId } = useParams()
  return (
    <>room, chat to {chatToId}</>
  )
}