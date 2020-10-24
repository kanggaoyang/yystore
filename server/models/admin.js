
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  username: String,
  password: String,
},{versionKey: false})

module.exports = mongoose.model('managers', adminSchema)