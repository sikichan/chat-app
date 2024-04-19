import react from '../assets/react.svg'
import { Link, useParams } from 'react-router-dom'
export const Item = ({contact}) => {
  const {chatToId} = useParams()
  
  return (
    
      <li className={chatToId === contact._id ? 'selected': ''}>
      
      {
        !contact.avatar ? <img src={react} alt=""/> :
        <img src={contact.avatar} alt=""/>
      }
      {contact.username}
     
      </li>
  )
}

export default function ContactList({datas, currentUser}) {
  // const [chatToId, setChatToId] = useState(null)
  // const onSelect = async (id) => {
  //   setChatToId(id)
  // }
  return (
    <>
      <ul>
        {
          datas.map(contact => <Link
            key={contact._id}
            to={`/chat/${contact._id}`}>
            <Item 
              contact={contact}
            />
            </Link>)
        }
      </ul>
      <ul className='current-user'>
        <Item contact={currentUser} />
      </ul>
    </>
  )
}