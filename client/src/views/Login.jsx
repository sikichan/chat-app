import { Link, useActionData, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserForm from '../components/UserForm'
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
      <UserForm user={user} handleChange={handleChange}>
        <button type='submit'>Login Account</button>
        <span className='footer'>Don't have an account ?
          <Link to={`/register`} state={user}>Register</Link>
        </span>
        <span className='error'>{actionData && actionData.msg}</span>
      </UserForm>
    </>
  )
}
