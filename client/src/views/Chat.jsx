import localforage from 'localforage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Chat() {
  const navigate = useNavigate()
  useEffect(async ()=> {
    const user = await localforage.getItem('chat-app-user')
    if (user) {
      navigate('/login')
    }
  }, [])
  return (<>
    <p>chat</p>
  </>)
}