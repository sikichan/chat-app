const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  avatar: {
    type: String,
    required: false
  }
})

UserScheme.pre('save', async function () {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
}) 

UserScheme.statics.login = async function (username, password) {
  const user = await this.findOne({ username })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw new Error('incorrect password')
  }
  throw new Error('username not exist')
}

module.exports = mongoose.model('Users', UserScheme)