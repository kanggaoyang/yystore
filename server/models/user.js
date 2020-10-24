
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  sex: String,
  password: String,
  pic: String,
  all_pic: String,
  create_time: {
    type: Date,
    default: Date.now()
  },
  // articleId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'article'
  // }
},{versionKey: false})

module.exports = mongoose.model('users', userSchema)