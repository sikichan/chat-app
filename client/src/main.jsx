import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import Chat from './views/Chat.jsx'
import Register from './views/Register.jsx'
import Login from './views/Login.jsx'
import SetAvatar from './views/SetAvatar.jsx'
import ChatRoom from './views/ChatRoom.jsx'
import Default from './views/Default.jsx'
const baseURL = `http://localhost:1000/api/auth`
const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat/>,
    loader: async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
        const {data} = await axios.get(`${baseURL}/contact-list/${currentUser._id}`)
        return {contactList: data.contactList, currentUser}
      } catch(err) {
        return redirect('/login')
      }
    },
    children: [
      // {
      //   index: true,
      //   element: <Default/>
      // },
      {
        path: 'chat',
        element: <ChatRoom/>
      }
    ]
  },
  {
    path: '/set-avatar',
    element: <SetAvatar/>
  },
  {
    path: '/register',
    element: <Register/>,
    action: async ({request}) => {
      const formData = Object.fromEntries(await request.formData())
      const results = validateUser(formData)
      if (results) return results
      const {data} = await axios.post(`${baseURL}/register`, formData)
      if (!data.status) {
        return data
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        return redirect('/login')
      }
    }
  },
  {
    path: '/login',
    element: <Login/>,
    action: async ({request}) => {
      const formData = Object.fromEntries(await request.formData())
      const results = validateUser(formData)
      if (results) return results
      const {data} = await axios.post(`${baseURL}/login`, formData)
      if (!data.status) {
        return data
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
        if (currentUser.avatar) {
          return redirect('/')
        } else {
          return redirect(`/set-avatar`)
        }
      }
    }
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)

function validateUser(user) {
  if (!user.username.trim()) {
    return {msg: 'Username is required'}
  }
  if (!user.password.trim()) {
    return {msg: 'Password is required'}
  }
}