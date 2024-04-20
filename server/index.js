const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const socketIO = require('socket.io')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', routes)

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('MongoDB Connection Successful')
}).catch(err => {
  console.log(`MongoDB ==> ${err.message}`)
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on PORT: ${process.env.PORT}`)
})

const io = socketIO(server, {
  cors: {
    origin: `http://localhost:5173`,
    credentials: true
  }
})
global.onlineUser = new Map()
io.on('connection', (socket) => {
  global.chatSocket = socket
  socket.on('add-user', (userId) => {
    onlineUser.set(userId, socket.id)
    console.log(onlineUser)
  })

  socket.on('send-msg', (data) => {
    const toId = onlineUser.get(data.receiver)
    if (toId) {
      console.log('send-msg: ', data)
      socket.to(toId).emit('msg-receive', data)
    }
  })
})