const mongoose= require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserScheme = new Schema({
  id: ObjectId,
  username: String,
  password: String,
  // email: String
})

module.exports = mongoose.model('Users', UserScheme)