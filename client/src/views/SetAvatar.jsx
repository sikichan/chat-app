import styled from 'styled-components'
import Container from '../components/Container'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSvg from '../assets/loading.svg'
const baseURL = `http://localhost:1000/api/auth`
export default function SetAvatar() {
  const baseUrl = `https://api.multiavatar.com/413587653`
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(undefined)
  const timerRef = useRef(null)
  const avatar = selected !== undefined ? list[selected] : null
  console.log('choose: ', avatar)
  const [warning, setWarning] = useState(false)
  const navigate = useNavigate()
  async function getDataUrl (blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
    })
  }
  const fetchAvatars = async (randomStr = String(Math.random()).slice(-3)) => {
    setLoading(true)
    try {
      const array = [];
      for (let i = 0; i < 4; i++) {
        const url = `${baseUrl}${i}${randomStr}`
        console.log(url)
        const image = await axios.get(url, {
            responseType: 'blob'
        })

        const blob = new Blob([image.data], { type: 'image/svg+xml' })
        const base64 = await getDataUrl(blob)
        array.push(base64)
      }
      setLoading(false)
      setWarning(false)
      setList(array)
    } catch (error) {
        console.log('******error******* ', error)
        setWarning(true)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            fetchAvatars(String(Math.random()).slice(-5))
        }, 5000)
    }
  }
  const handleSetAvatar = async () => {
    console.log(avatar)
    if (!avatar) return
    const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
    try {
      const {data} = await axios.post(`${baseURL}/set-avatar`, { id: currentUser._id, avatar })
      localStorage.setItem('chat-app-user', JSON.stringify(data.user))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAvatars()
    return () => {
      console.log('CLEAN THE TIMER')
      clearTimeout(timerRef.current)
      setLoading(true)
      setWarning(false)
      setList([])
    }
  }, [])
  return (
    <Container>
      <h1 style={{color: 'white'}}>Please pick an avatar as your avatar</h1>
      {
        loading ? <img src={LoadingSvg}/> : <AvatarList>
        {
          list.map((avatar, i) => <img className={selected === i ? 'selected': ''} key={i} src={avatar} alt='' onClick={() => setSelected(i)}/>)
        }
        <button className='fetch' onClick={() => fetchAvatars(String(Math.random()).slice(-5))} disabled={loading}>Fetch another batch of avatars</button>
      </AvatarList>
      }
      { warning && <Warning>Fetch too frequent, please wait !</Warning> }
      
      { avatar && !loading && <button onClick={handleSetAvatar}>Set Avatar</button> } 
    </Container>
  )
}

const AvatarList = styled.div`
  padding: 2rem;
  background-color: #341e7f;
  border-radius: 0.5rem;
  display: flex;
  gap: 3rem;
  max-width: 30rem;
  flex-wrap: wrap;
  span {
    color: #f8e4e4;
    cursor: pointer;
    text-decoration: underline;
  }
  button.fetch {
    border: 0;
    font-weight: 400;
    font-size: 14px;
    padding: 0;
    background-color: transparent;
    text-decoration: underline;
  }
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .selected {
    outline: 0.5rem solid #ffffff;
  }
`
const Warning = styled.p`
  color: #f8e4e4;
`