import { useState } from 'react'
import styled from 'styled-components'
export default function Editor({onSend}) {
  const [value, setValue] = useState('')
  return (
    <EditorContainer>
      <textarea rows={6} value={value} onChange={e => setValue(e.target.value)}></textarea>
      <button onClick={() => {
        onSend(value)
        setValue('')
      }}>send</button>
    </EditorContainer>
  )
}

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
  textarea {
    border: 0;
    width: 100%;
    outline: none;
    padding: 0.8rem;
    border-radius: 0.3rem;
    padding-right: 120px;
    font-size: 1.2rem;
  }
  button {
    position: absolute;
    border-radius: 0.3rem;
    z-index: 1;
    right: 0;
    bottom: 1rem;
    right: 1rem;
    font-size: 14px;
  }
`