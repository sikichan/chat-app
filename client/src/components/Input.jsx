import { useState } from 'react'
import styled from 'styled-components'
export default function Input(props) {
  const {onClear, ...restProps} = props
  return (
    <InputDiv>
      <input {...restProps}/>
      {/* <span>×</span> */}
    </InputDiv>
  )
}
const InputDiv = styled.div`
  position: relative;
  input {
    background-color: transparent;
    padding: 1rem 2rem 1rem 1rem;
    border: 0.1rem solid #efefef;
    width: 100%;
  }
  span {
    width: 1rem;
    height: 1rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 100;
    cursor: pointer;
    color: #aaaaaa;
  }
`