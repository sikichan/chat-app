const mongoose= require('mongoose')
const Schema = mongoose.Schema

const UserScheme = new Schema({
  username: String,
  password: String,
  avatar: String
})

module.exports = {
  User: mongoose.model('Users', UserScheme)
}