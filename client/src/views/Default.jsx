import styled from 'styled-components'

export default function Default() {
  return (
    <DefaultContainer>WELCOME TO CHATROOM</DefaultContainer>
  )
}
const DefaultContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  text-align: center;
  line-height: 100vh;
  font-size: 3rem;
`