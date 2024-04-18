import localforage from 'localforage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Chat() {
  // const navigate = useNavigate()
  // useEffect(()=> {
  //   const checkUserAvatar = async () => {
  //     const user = await localforage.getItem('chat-app-user')
  //     if (!user.avatar) {
  //       navigate('/set-avatar')
  //     }
  //   }
  //   checkUserAvatar()
  // }, [])
  return (<>
    <p>chat</p>
  </>)
}