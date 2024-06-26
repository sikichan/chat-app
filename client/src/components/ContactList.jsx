import { useEffect } from 'react'
import defaultAvatar from '../assets/react.svg'
import styled from 'styled-components'
export const Item = ({contact, chatUser, onSelect}) => {
  
  return (

      <li onClick={() => onSelect(contact)} className={[chatUser?._id === contact._id ? 'selected': '', contact.online ? 'online': ''].join(' ')}
        >   
      {
        !contact.avatar ? <img src={defaultAvatar} alt=""/> :
        <img src={contact.avatar} alt=""/>
      }
      {contact.username}
     
      </li>
  )
}

export default function ContactList({datas, chatUser, currentUser, onSelect}) {

  return (
    <>
    <Contacts>
      <h3>contacts</h3>
      <ul>
        {
          datas.map(contact => 
            <Item 
              key={contact._id}
              chatUser={chatUser}
              onSelect={onSelect}
              contact={contact}
            />
          )
        }
        <p> - End - </p>
      </ul>
     
      <div className='current-user'>
        <span>{currentUser.username} </span>
        <img src={currentUser.avatar} alt=''/>
      </div>
    </Contacts>
    </>
  )
}

const Contacts = styled.div`
  background-color: #292152;
  width: 25%;
  min-width: 240px;
  position: relative;
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
    text-transform: uppercase;
    background-color: #626291;
    height: 60px;
    line-height: 60px;
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem;
    gap: 0.7rem;
    flex: 1;
    overflow-y: auto;
    p {
      color: #3e2f64;
      text-align: center;
    }
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 0.2rem;
      background-color: #636392;
    }

    
    a {
      text-decoration: none;
      color: #c7c7c7;
    }
    li {
      padding: 0.6rem 1.2rem;
      border-radius: 0.3rem;
      background-color: #343468;
      transition: 0.4s ease-in-out;
      display: flex;
      align-items: center;
      img {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
      }
      &:hover {
        cursor: pointer;
        background-color: #513d5c;
        color: #ffffff;
      }
    }
    .selected {
      background: #551dee;
      color: #ffffff;
      font-weight: 800;
    }
    .online {
      color: #70ef62;
    }
  }
  .current-user {
    background-color: #303066;
    color: #70ef62;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
    span {
      margin-right: 1rem;
    }
  }
`