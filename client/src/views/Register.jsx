import { Link, useLocation, Form, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserForm from '../components/Container'
import Logo from '../assets/react.svg'
import Input from '../components/Input'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
const baseURL = `http://localhost:1000/api`

export default function Register() {
  const location = useLocation()
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

  const handleRegister = async (e) => {
    e.preventDefault()
    const {data} = await axios.post(`${baseURL}/register`, user)
      if (data.errors) {
        genError(data.errors)
      } else {
        return navigate('/login')
      }
  }

  return (
    <>
      <UserForm>
        <Form method='post' onSubmit={handleRegister}>
          <div className='brand'>
            <img src={Logo} alt=''/>
            <p>CHATROOM</p>
          </div>
          <Input type='text' maxLength={8} value={user.username} placeholder='Username' name='username' onChange={handleInputChange}/>
          <Input type='password' maxLength={8} value={user.password} placeholder='Password' name='password' onChange={handleInputChange}/>
          <button type='submit'>Create Account</button>
          <span className='footer'>Already have an account ?
            <Link to={`/login`}>Login</Link>
          </span>
          
        </Form>
        <ToastContainer/>
      </UserForm>
    </>
  )
}
