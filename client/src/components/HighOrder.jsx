import { Link, useLocation, Form, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserForm from './Container'
import Logo from '../assets/react.svg'
import Input from './Input'
import { ToastContainer, toast } from 'react-toastify'
import sha256 from 'crypto-js/sha256'
import axios from 'axios'
const baseURL = `http://localhost:1000/api`
export default function HighOrder(title, request) {
  const isLoginPage = title === 'Login'
  const footer = isLoginPage ? `Don't have an account ?` : `Already have an account ?`
  const linkTo = isLoginPage ? `register`: `login`
  const submitTitle = isLoginPage ? 'Login Account': 'Create Account'
  return function HOC() {
    const [user, setUser] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const genError = (errors) => {
      Object.values(errors).map(msg => {
        if (msg) toast(msg)
      })
    }

    const handleInputChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }

    
    const handleSubmit = async (e) => {
      e.preventDefault()
      const {data} = await axios.post(`${baseURL}/${request}`, {
        username: user.username,
        password: sha256(user.password).toString()
      })
      if (data.errors) {
        genError(data.errors)
      } else if (isLoginPage) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
          if (!currentUser.avatar) return navigate('/set-avatar')
          return navigate('/')
      } else {
          return navigate('/login')
      }
    }

    

    return (
      <>
        <UserForm>
          <Form method='post' onSubmit={handleSubmit}>
            <div className='brand'>
              <img src={Logo} alt=''/>
              <p>{title}</p>
            </div>
            <Input type='text' maxLength={8} value={user.username} placeholder='Username' name='username' onChange={handleInputChange}/>
            <Input type='password' maxLength={8} value={user.password} placeholder='Password' name='password' onChange={handleInputChange}/>
            <button type='submit'>{submitTitle}</button>
            <span className='footer'>{footer}
              <Link to={`/${linkTo}`}>{linkTo}</Link>
            </span>
            
          </Form>
          <ToastContainer/>
        </UserForm>
      </>
    )

  }
}