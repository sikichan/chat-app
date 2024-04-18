import { useEffect } from "react"
import Container from "../components/Container"
import { useLoaderData, Outlet} from 'react-router-dom'
import './Chat.scss'
import ContactList from "../components/ContactList"

export default function Chat() {
  const {contactList, currentUser} = useLoaderData()
  useEffect(() => {

  })
  return (<Container>
    <div className="Chat">
      <div className="left">
        <ContactList datas={contactList} currentUser={currentUser}/>
      </div>
      <div className="right">
        <Outlet/>
      </div>
    </div>
    
  </Container>)
}