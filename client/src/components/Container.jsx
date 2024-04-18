import styled from 'styled-components'
export default function Container({children}) {
  return (
    <>
      <FormContainer>
        {
          children
        }
      </FormContainer>
    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  button {
    font-weight: 800;
    background-color: #997af0;
    color: #ffffff;
    padding: 1rem;
    text-transform: uppercase;
    border: 0;
    transition: 0.5s ease-in-out;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background-color: #4e0eff;
    }
  }
  form {
    width: 28rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 6rem 5rem;
    border-radius: 0.5rem;
    background-color: #ffffff;
    
    .footer {
      font-size: 14px;
      text-align: center;
      color: #666666;
      a {
        margin-left: 0.5rem;
      }
    }
    .error {
      color: #e23403;
    }
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      width: 2rem;
    }
  }
`