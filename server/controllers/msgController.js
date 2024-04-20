const {Message} = require('../models')

module.exports.addMsg = async (req, res) => {
  const {sender, receiver, message} = req.body
  try {
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      users: [sender, receiver]
    })
    res.send({ status: true, newMessage })
  } catch (error) {
    res.send({
      status: false,
      msg: error.message
    })
  }
}

module.exports.getMsgs = async (req, res) => {
  const {sender, receiver} = req.body
  if (!sender || !receiver) return res.send({
    status: false,
    msg: 'sender, receiver required'
  })
  const msgs = await Message.find({
    users:{$all: [sender, receiver]}})
    .sort({createdAt: 1})
  const messages = msgs.map(msg => {
    return {
      _id: msg._id,
      fromSelf: msg.sender.toString() === sender,
      message: msg.message
    }
  })
  res.send({
    status: true,
    messages: messages || []
  })
}