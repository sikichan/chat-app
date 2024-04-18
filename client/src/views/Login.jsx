import { Link, useActionData, Form } from 'react-router-dom'
import { useState } from 'react'
import UserForm from '../components/Container'
import Logo from '../assets/react.svg'
import Input from '../components/Input'
export default function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const actionData = useActionData()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <UserForm>
        <Form method='post'>
          <div className='brand'>
            <img src={Logo} alt=''/>
            <p>CHATROOM</p>
          </div>
          <Input type='text' maxLength={8} value={user.username} placeholder='Username' name='username' onChange={handleChange}/>
          <Input type='password' maxLength={8} value={user.password} placeholder='Password' name='password' onChange={handleChange}/>
          <span className='error'>{actionData && `※ ${actionData.msg}`}</span>
          <button type='submit'>Login Account</button>
          <span className='footer'>Don't have an account ?
            <Link to={`/register`} state={user}>Register</Link>
          </span>
        </Form>
      </UserForm>
    </>
  )
}
