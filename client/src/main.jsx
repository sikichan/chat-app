import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import './index.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import Chat from './views/Chat.jsx'
import Register from './views/Register.jsx'
import Login from './views/Login.jsx'
import localforage from 'localforage'
const baseURL = `http://localhost:1000/api/auth`
const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat/>
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
        await localforage.setItem('chat-app-user', data.user)
        return redirect('/login')
      }
    }
  },
  {
    path: '/login',
    element: <Login/>,
    action: async ({request}) => {
      const formData = Object.fromEntries(await request.formData())
      console.log(formData)
      const results = validateUser(formData)
      console.log(results)
      if (results) return results
      const {data} = await axios.post(`${baseURL}/login`, formData)
      if (!data.status) {
        return data
      } else {
        return redirect('/')
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