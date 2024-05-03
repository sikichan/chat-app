// import { Link, useActionData, Form, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import UserForm from '../components/Container'
// import Logo from '../assets/react.svg'
// import Input from '../components/Input'
// import { ToastContainer, toast } from 'react-toastify'
// import sha256 from 'crypto-js/sha256'
// import axios from 'axios'
// const baseURL = `http://localhost:1000/api`
// export default function Login() {
//   const [user, setUser] = useState({ username: '', password: '' })
//   const navigate = useNavigate()
//   const genError = (errors) => {
//     Object.values(errors).map(msg => {
//       if (msg) toast(msg, {
//         position: 'top-center'
//       })
//     })
//   }
//   const actionData = useActionData()

//   const handleInputChange = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value
//     })
//   }
//   const handleLogin = async (e) => {
//     e.preventDefault()
//     const {data} = await axios.post(`${baseURL}/login`, {
//       username: user.username,
//       password: sha256(user.password).toString()
//     }, {
//       withCredentials: true
//     })
//     if (data.errors) {
//       genError(data.errors)
//     } else {
//       localStorage.setItem('chat-app-user', JSON.stringify(data.user))
//       const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
//       if (!currentUser.avatar) return navigate('/set-avatar')
//       return navigate('/')
//     }
//   }

//   return (
//     <>
//       <UserForm>
//         <Form method='post' onSubmit={handleLogin}>
//           <div className='brand'>
//             <img src={Logo} alt=''/>
//             <p>CHATROOM</p>
//           </div>
//           <Input type='text' maxLength={8} value={user.username} placeholder='Username' name='username' onChange={handleInputChange}/>
//           <Input type='password' maxLength={8} value={user.password} placeholder='Password' name='password' onChange={handleInputChange}/>
//           <span className='error'>{actionData && `※ ${actionData.msg}`}</span>
//           <button type='submit'>Login Account</button>
//           <span className='footer'>Don't have an account ?
//             <Link to={`/register`} state={user}>Register</Link>
//           </span>
//         </Form>
//         <ToastContainer/>
//       </UserForm>
//     </>
//   )
// }

import HighOrder from "../components/HighOrder.jsx"

const Login = HighOrder('Login', 'login')
export default Login