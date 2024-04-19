import styled from 'styled-components'
import Bubble from './Bubble'
export default function Records ({records}) {
  return (
    <RecordContainter>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
      <Bubble>dsjofiwejf </Bubble>
    </RecordContainter>
  )
}
const RecordContainter = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* min-width: 600px; */
  overflow-y: scroll;
  margin-top: 60px;
  padding: 1rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.2rem;
    background-color: #353563;
  }
`