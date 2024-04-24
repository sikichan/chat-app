const {Users} = require('../models')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({id}, 'siki super secret key', {
    expiresIn: maxAge
  })
}
const handleErrors = (err) =>  {
  let errors = { username: '', password: ''}
  if (err.code === 11000) {
    errors.username = 'Username already exist'
    return errors
  }
  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message
    })
    return errors
  }
}
const register = async (req, res) => {
  const {username, password} = req.body
  try {
    const user = await Users.create({ username, password })
    const token = createToken(user._id)
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000, httpOnly: true, path: '/'
    })
    console.log(token)
    res.status(201).json({user: {
      avatar: user.avatar,
      username: user.username,
      _id: user._id
    }, created: true})
  } catch (err) {
    console.log('ERROR:: ', err)
    res.status(201).json({
      errors: handleErrors(err),
      created: false
    })
  }
  
}


const login = async (req, res) => {
  try {
    const {username, password} = req.body
    const user = await Users.login(username, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {
      withCredentials: true, maxAge: maxAge * 1000, httpOnly: true
    })
    return res.status(201).json({user: {
      avatar: user.avatar,
      username: user.username,
      _id: user._id
    } })
  } catch (error) {
    return res.status(201).json({ errors: {msg: error.message}})
  }
}

const setAvatar = async (req, res) => {
  const { id, avatar } = req.body
  console.log(id)
  const user = await Users.findOneAndUpdate({_id: id}, {avatar})
  res.send({status: true, user: {
    _id: user._id,
    username: user.username,
    avatar
  }})
}

const getContactList = async (req, res) => {
  const currentUserId = req.params.id
  const contactList = await Users.find({_id: {$ne: currentUserId}},  ).select(['username', 'avatar'])
  res.status(201).json({contactList})
}
module.exports = {
  register,
  login,
  setAvatar,
  getContactList
}