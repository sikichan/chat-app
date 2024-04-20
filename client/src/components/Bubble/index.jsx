import './index.scss'
import { forwardRef } from 'react'
const Bubble = forwardRef(function Bubble({
  isMe = false,
  children
}, ref) {
  return (
    <div className={isMe ? 'isMe': 'Bubble'} ref={ref}>
    {children}
    </div>
  )
})
export default Bubble