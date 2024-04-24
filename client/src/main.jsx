import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import Chat from './views/Chat.jsx'
import Register from './views/Register.jsx'
import Login from './views/Login.jsx'
import SetAvatar from './views/SetAvatar.jsx'
import ChatRoom from './views/ChatRoom.jsx'
const baseURL = `http://localhost:1000/api`
const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat/>,
    loader: async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
        // const {data} = await axios.get(`${baseURL}/contact-list/${currentUser._id}`)
        return {currentUser}
      } catch(err) {
        return redirect('/login')
      }
    },
    children: [
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
    element: <Register/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
