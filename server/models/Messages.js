const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'video', 'audio', 'file'],
    default: 'text'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  users: {
    type: Array,
    required: true
  }
})
module.exports = mongoose.model('Messages', MessageSchema)
