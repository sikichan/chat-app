import { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Input'

export default function Editor({onSend}) {
  const [value, setValue] = useState('')
  return (
    <EditorContainer>
      <Input type='text' value={value} onChange={e => setValue(e.target.value)}/>
      <button onClick={() => {
        onSend(value)
        setValue('')
      }}>SEND</button>
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 2rem;
  input {
    border: 0;
    width: 100%;
    outline: none;
    padding: 0.8rem;
    padding-right: 120px;
    font-size: 1.2rem;
    outline: 2px solid #2f2842;
  }
  button {
    position: absolute;
    z-index: 1;
    right: 2rem;
    bottom: 1rem;
    font-size: 14px;
    width: 120px;
    height: 3.3rem;
    background-color: #2f2842;
    color: #ffffff;
    border: 0;
    font-size: 1.2rem;
  }
`