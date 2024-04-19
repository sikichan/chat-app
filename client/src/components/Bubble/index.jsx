import './index.scss'
export default function Bubble({
  isMe = false,
  children
}) {
  return (
    <div className={isMe ? 'isMe': 'Bubble'}>
    {children}
    </div>
  )
}
