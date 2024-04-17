const User = require('../models/User')
// const bcrypt = require('bcrypt')
const register = async (req, res, next) => {
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
      username, id: user._id
    }})
  }
  
}

const login = async (req, res, next) => {
  const {username, password} = req.body
  const user = await User.findOne({ username })
  if (!user) {
    res.send({status: false, msg: 'The account is not exist, please go to register'})
  } else if (user.password !== password) {
    res.send({status: false, msg: 'The password is wrong'})
  } else {
    res.send({status: true, user: {
      id: user.id,
      username: user.username
    }})
  }
}

module.exports = {
  register,
  login
}