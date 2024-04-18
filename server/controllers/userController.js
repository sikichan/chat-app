const {User} = require('../models/User')
const register = async (req, res) => {
  console.log(req.body)
  const {username, password} = req.body
  const one = await User.findOne({ username })
  if (one) {
    res.send({status: false, msg: 'The username is exist'})
  } else {
    const user = await User.create({
      username,
      password
    })
    res.send({status: true, user: {
      avatar: user.avatar,
      username: user.username,
      id: user._id
    }})
  }
  
}

const login = async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({ username })
  if (!user) {
    res.send({status: false, msg: 'The account is not exist, please go to register'})
  } else if (user.password !== password) {
    res.send({status: false, msg: 'The password is wrong'})
  } else {
    res.send({status: true, user: {
      id: user._id,
      username: user.username,
      avatar: user.avatar
    }})
  }
}

const setAvatar = async (req, res) => {
  const { id, avatar } = req.body
  console.log(id)
  const user = await User.findOneAndUpdate({_id: id}, {avatar})
  res.send({status: true, user: {
    id: user._id,
    username: user.username,
    avatar: user.avatar
  }})
}

module.exports = {
  register,
  login,
  setAvatar
}