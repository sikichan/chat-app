import { Link, useActionData, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserForm from '../components/UserForm'

export default function Register() {
  const location = useLocation()
  const [user, setUser] = useState(() => {
    return location.state || {
      username: '',
      password: ''
    }
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
        <button type='submit'>Create Account</button>
        <span className='footer'>Already have an account ?
          <Link to={`/login`}>Login</Link>
        </span>
        <span className='error'>{actionData && actionData.msg}</span>
      </UserForm>
    </>
  )
}
