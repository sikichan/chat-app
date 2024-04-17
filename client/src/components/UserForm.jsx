import { Form, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/react.svg'
import Input from '../components/Input'
import localforage from 'localforage'
export default function UserForm({user, children, handleChange}) {
  const navigate = useNavigate()
  useEffect(() => {
    const checkUser = async () => {
      const user = await localforage.getItem('chat-app-user')
      if (user) navigate('/')
    }
    checkUser()
  },[])
  return (
    <>
      <FormContainer>
        <Form method='post'>
          <div className='brand'>
            <img src={Logo} alt=''/>
            <p>CHATROOM</p>
          </div>
          <Input type='text' value={user.username} placeholder='Username' name='username' onChange={handleChange}/>
          {/* <Input type='text' value={user.email} placeholder='Email' name='email' onChange={handleChange}/> */}
          <Input type='password' value={user.password} placeholder='Password' name='password' onChange={handleChange}/>
          {/* <button type='submit'>Create Account</button> */}
          {
            children
          }
          
        </Form>
      </FormContainer>
    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  form {
    width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem 5rem;
    border-radius: 0.2rem;
    background-color: #ffffff;
    button[type='submit'] {
      background-color: #997af0;
      color: #ffffff;
      padding: 1rem;
      border: 0;
      border: 1px solid #dddddd;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      font-size: 1rem;
      cursor: pointer;
      &:hover {
        background-color: #4e0eff;
      }
    }
    .footer {
      font-size: 14px;
      text-align: center;
      color: #666666;
      a {
        margin-left: 0.5rem;
      }
    }
    .error {
      color: #d13a10;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      width: 2rem;
    }
  }
`